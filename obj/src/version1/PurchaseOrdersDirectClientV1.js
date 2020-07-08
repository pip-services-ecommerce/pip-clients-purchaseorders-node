"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class PurchaseOrdersDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor('pip-services-purchaseorders', 'controller', '*', '*', '*'));
        if (config)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getOrders(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'purchaseorders.get_orders');
        this._controller.getOrders(correlationId, filter, paging, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }
    getOrderById(correlationId, order_id, customer_id, callback) {
        let timing = this.instrument(correlationId, 'purchaseorders.get_order_by_id');
        this._controller.getOrderById(correlationId, order_id, customer_id, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }
    createOrder(correlationId, order, callback) {
        let timing = this.instrument(correlationId, 'purchaseorders.create_order');
        this._controller.createOrder(correlationId, order, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }
    updateOrder(correlationId, order, callback) {
        let timing = this.instrument(correlationId, 'purchaseorders.update_order');
        this._controller.updateOrder(correlationId, order, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }
    deleteOrderById(correlationId, order_id, customer_id, callback) {
        let timing = this.instrument(correlationId, 'purchaseorders.delete_order_by_id');
        this._controller.deleteOrderById(correlationId, order_id, customer_id, (err, order) => {
            timing.endTiming();
            callback(err, order);
        });
    }
}
exports.PurchaseOrdersDirectClientV1 = PurchaseOrdersDirectClientV1;
//# sourceMappingURL=PurchaseOrdersDirectClientV1.js.map