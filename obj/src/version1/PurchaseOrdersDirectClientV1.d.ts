import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';
import { IPurchaseOrdersClientV1 } from './IPurchaseOrdersClientV1';
import { PurchaseOrderV1 } from 'pip-services-purchaseorders-node';
export declare class PurchaseOrdersDirectClientV1 extends DirectClient<any> implements IPurchaseOrdersClientV1 {
    constructor(config?: any);
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;
    getOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
    createOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    updateOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    deleteOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
}
