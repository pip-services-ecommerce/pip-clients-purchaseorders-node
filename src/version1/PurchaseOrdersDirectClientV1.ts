import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { IPurchaseOrdersClientV1 } from './IPurchaseOrdersClientV1';
import { PurchaseOrderV1 } from 'pip-services-purchaseorders-node';

export class PurchaseOrdersDirectClientV1 extends DirectClient<any> implements IPurchaseOrdersClientV1 {

    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-purchaseorders', 'controller', '*', '*', '*'));

        if (config)
            this.configure(ConfigParams.fromValue(config));
    }

    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void {
        let timing = this.instrument(correlationId, 'purchaseorders.get_orders');
        this._controller.getOrders(correlationId, filter, paging, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }

    getOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        let timing = this.instrument(correlationId, 'purchaseorders.get_order_by_id');
        this._controller.getOrderById(correlationId, order_id, customer_id, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }

    createOrder(correlationId: string, order: PurchaseOrderV1,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        let timing = this.instrument(correlationId, 'purchaseorders.create_order');
        this._controller.createOrder(correlationId, order, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }

    updateOrder(correlationId: string, order: PurchaseOrderV1,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        let timing = this.instrument(correlationId, 'purchaseorders.update_order');
        this._controller.updateOrder(correlationId, order, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }

    deleteOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        let timing = this.instrument(correlationId, 'purchaseorders.delete_order_by_id');
        this._controller.deleteOrderById(correlationId, order_id, customer_id, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }
}