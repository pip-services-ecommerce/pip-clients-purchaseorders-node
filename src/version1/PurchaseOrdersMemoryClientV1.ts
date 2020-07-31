let _ = require('lodash');

import { IPurchaseOrdersClientV1 } from './IPurchaseOrdersClientV1';

import { IdGenerator } from "pip-services3-commons-node";
import { BadRequestException } from "pip-services3-commons-node";

import { FilterParams } from "pip-services3-commons-node";
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { PurchaseOrderV1 } from "pip-services-purchaseorders-node";

export class PurchaseOrdersMemoryClientV1  implements IPurchaseOrdersClientV1 {
    private _maxPageSize: number = 100;
    private _orders: PurchaseOrderV1[] = [];

    public constructor(...orders: PurchaseOrderV1[]) {
        this._orders = orders;
    }

    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void {
        let filterCurl = this.composeFilter(filter);
        let orders = _.filter(this._orders, filterCurl);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = orders.length;
        
        if (skip > 0)
            orders = _.slice(orders, skip);
        orders = _.take(orders, take);
        
        let page = new DataPage<PurchaseOrderV1>(orders, total);
        if (callback) callback(null, page);
    }

    getOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void {
        let orders = this._orders.filter(x => x.id == order_id && customer_id == customer_id);
        let order = orders.length > 0 ? orders[0] : null;

        if (callback) callback(null, order);
    }

    createOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void {
        if (order == null) {
            if (callback) callback(null, null);
            return;
        }

        let oldOrders = this._orders.filter(x => x.id == order.id);
        if (oldOrders.length) {
            let err = new BadRequestException(correlationId, "ORDER_ALREADY_EXIST", "order " + order.id + " already exists");
            callback(err, null);
            return;
        }

        order = _.clone(order);
        order.id = order.id || IdGenerator.nextLong();

        this._orders.push(order);

        if (callback) callback(null, order)
    }

    updateOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void {
        let index = this._orders.map(x => x.id).indexOf(order.id);

        if (index < 0) {
            callback(null, null);
            return;
        }

        order = _.clone(order);
        this._orders[index] = order;

        if (callback) callback(null, order)
    }

    deleteOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void {
        var index = this._orders.map(x => x.id).indexOf(order_id);
        var item = this._orders[index];
        
        if (index < 0) {
            callback(null, null);
            return;
        }

        this._orders.splice(index, 1);

        if (callback) callback(null, item);
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let state = filter.getAsNullableString('state');
        let customerId = filter.getAsNullableString('customer_id');
        let ids = filter.getAsObject('ids');
        let createdFrom = filter.getAsNullableDateTime('created_from');
        let createdTo = filter.getAsNullableDateTime('created_to');
        let productId = filter.getAsNullableString('product_id');

        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;

        return (item: PurchaseOrderV1) => {
            if (id && item.id != id)
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (state && item.state != state)
                return false;
            if (customerId && item.customer_id != customerId)
                return false;
            if (createdFrom && item.create_time && item.create_time < createdFrom)
                return false;
            if (createdTo && item.create_time && item.create_time > createdTo)
                return false;
            if (productId && item.items && item.items.filter(x => x.product_id == productId).length == 0)
                return false;

            return true;
        };
    }
}