"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class PurchaseOrdersHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/purchase_orders');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getOrders(correlationId, filter, paging, callback) {
        this.callCommand('get_orders', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getOrderById(correlationId, order_id, customer_id, callback) {
        this.callCommand('get_order_by_id', correlationId, {
            order_id: order_id,
            customer_id: customer_id
        }, callback);
    }
    createOrder(correlationId, order, callback) {
        this.callCommand('create_order', correlationId, {
            order: order
        }, callback);
    }
    updateOrder(correlationId, order, callback) {
        this.callCommand('update_order', correlationId, {
            order: order
        }, callback);
    }
    deleteOrderById(correlationId, order_id, customer_id, callback) {
        this.callCommand('delete_order_by_id', correlationId, {
            order_id: order_id,
            customer_id: customer_id
        }, callback);
    }
}
exports.PurchaseOrdersHttpClientV1 = PurchaseOrdersHttpClientV1;
//# sourceMappingURL=PurchaseOrdersHttpClientV1.js.map