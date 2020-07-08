import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { IPurchaseOrdersClientV1 } from './IPurchaseOrdersClientV1';
import { PurchaseOrderV1 } from 'pip-services-purchaseorders-node';

export class PurchaseOrdersHttpClientV1 extends CommandableHttpClient implements IPurchaseOrdersClientV1 {

    constructor(config?: any) {
        super('v1/purchase_orders');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void {
        this.callCommand(
            'get_orders',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    getOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        this.callCommand(
            'get_order_by_id',
            correlationId,
            {
                order_id: order_id,
                customer_id: customer_id
            },
            callback
        );
    }

    createOrder(correlationId: string, order: PurchaseOrderV1,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        this.callCommand(
            'create_order',
            correlationId,
            {
                order: order
            },
            callback
        );
    }

    updateOrder(correlationId: string, order: PurchaseOrderV1,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        this.callCommand(
            'update_order',
            correlationId,
            {
                order: order
            },
            callback
        );
    }

    deleteOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        this.callCommand(
            'delete_order_by_id',
            correlationId,
            {
                order_id: order_id,
                customer_id: customer_id
            },
            callback
        );
    }
}
