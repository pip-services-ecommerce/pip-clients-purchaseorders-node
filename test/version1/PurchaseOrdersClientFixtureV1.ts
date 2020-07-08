let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { IPurchaseOrdersClientV1 } from '../../src/version1/IPurchaseOrdersClientV1';
import { TestModel } from '../data/TestModel';
import { PagingParams } from 'pip-services3-commons-node';
import { PurchaseOrderStateV1 } from 'pip-services-purchaseorders-node';
import { PurchaseOrderV1 } from 'pip-services-purchaseorders-node';

let PURCHASE_ORDER1: PurchaseOrderV1 = TestModel.createPurchaseOrder1();
let PURCHASE_ORDER2: PurchaseOrderV1 = TestModel.createPurchaseOrder2();

export class PurchaseOrdersClientFixtureV1 {
    private _client: IPurchaseOrdersClientV1;

    constructor(client: IPurchaseOrdersClientV1) {
        this._client = client;
    }

    testCrudOperations(done) {
        let purchaseOrder1, purchaseOrder2: PurchaseOrderV1;

        async.series([
            // Create one payment method
            (callback) => {
                this._client.createOrder(
                    null,
                    PURCHASE_ORDER1,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        TestModel.assertEqualPurchaseOrder(purchaseOrder, PURCHASE_ORDER1);

                        purchaseOrder1 = purchaseOrder;

                        callback();
                    }
                );
            },
            // Create another credit_card
            (callback) => {
                this._client.createOrder(
                    null,
                    PURCHASE_ORDER2,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        TestModel.assertEqualPurchaseOrder(purchaseOrder, PURCHASE_ORDER2);

                        purchaseOrder2 = purchaseOrder;

                        callback();
                    }
                );
            },
            // Get all purchase orders
            (callback) => {
                this._client.getOrders(
                    null,
                    null,
                    new PagingParams(0, 5, false),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.isTrue(page.data.length >= 2);

                        callback();
                    }
                );
            },
            // Update the purchase order
            (callback) => {
                purchaseOrder1.state = PurchaseOrderStateV1.Paid;

                this._client.updateOrder(
                    null,
                    purchaseOrder1,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isObject(purchaseOrder);
                        assert.equal(purchaseOrder.state, PurchaseOrderStateV1.Paid);
                        assert.equal(purchaseOrder.id, PURCHASE_ORDER1.id);

                        purchaseOrder1 = purchaseOrder;

                        callback();
                    }
                );
            },
            // Delete purchase order
            (callback) => {
                this._client.deleteOrderById(
                    null,
                    purchaseOrder1.id,
                    purchaseOrder1.customer_id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get deleted payment method
            (callback) => {
                this._client.getOrderById(
                    null,
                    purchaseOrder1.id,
                    purchaseOrder1.customer_id,
                    (err, purchaseOrder) => {
                        assert.isNull(err);

                        assert.isNull(purchaseOrder || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
