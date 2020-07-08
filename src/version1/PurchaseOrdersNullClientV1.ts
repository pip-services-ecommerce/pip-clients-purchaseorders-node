import { IPurchaseOrdersClientV1 } from './IPurchaseOrdersClientV1';

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { PurchaseOrderV1 } from 'pip-services-purchaseorders-node';

export class PurchaseOrdersNullClientV1 implements IPurchaseOrdersClientV1 {
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void {
        callback(null, null);
    }

    getOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        callback(null, null);
    }

    createOrder(correlationId: string, order: PurchaseOrderV1,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        callback(null, null);
    }

    updateOrder(correlationId: string, order: PurchaseOrderV1,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        callback(null, null);
    }
    
    deleteOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void {
        callback(null, null);
    }
}
