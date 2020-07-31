"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
class PurchaseOrdersMemoryClientV1 {
    constructor(...orders) {
        this._maxPageSize = 100;
        this._orders = [];
        this._orders = orders;
    }
    getOrders(correlationId, filter, paging, callback) {
        let filterCurl = this.composeFilter(filter);
        let orders = _.filter(this._orders, filterCurl);
        // Extract a page
        paging = paging != null ? paging : new pip_services3_commons_node_2.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = orders.length;
        if (skip > 0)
            orders = _.slice(orders, skip);
        orders = _.take(orders, take);
        let page = new pip_services3_commons_node_3.DataPage(orders, total);
        if (callback)
            callback(null, page);
    }
    getOrderById(correlationId, order_id, customer_id, callback) {
        let orders = this._orders.filter(x => x.id == order_id && customer_id == customer_id);
        let order = orders.length > 0 ? orders[0] : null;
        if (callback)
            callback(null, order);
    }
    createOrder(correlationId, order, callback) {
        if (order == null) {
            if (callback)
                callback(null, null);
            return;
        }
        let oldOrders = this._orders.filter(x => x.id == order.id);
        if (oldOrders.length) {
            let err = new pip_services3_commons_node_1.BadRequestException(correlationId, "ORDER_ALREADY_EXIST", "order " + order.id + " already exists");
            callback(err, null);
            return;
        }
        order = _.clone(order);
        order.id = order.id || pip_services3_commons_node_1.IdGenerator.nextLong();
        this._orders.push(order);
        if (callback)
            callback(null, order);
    }
    updateOrder(correlationId, order, callback) {
        let index = this._orders.map(x => x.id).indexOf(order.id);
        if (index < 0) {
            callback(null, null);
            return;
        }
        order = _.clone(order);
        this._orders[index] = order;
        if (callback)
            callback(null, order);
    }
    deleteOrderById(correlationId, order_id, customer_id, callback) {
        var index = this._orders.map(x => x.id).indexOf(order_id);
        var item = this._orders[index];
        if (index < 0) {
            callback(null, null);
            return;
        }
        this._orders.splice(index, 1);
        if (callback)
            callback(null, item);
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
        return (item) => {
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
exports.PurchaseOrdersMemoryClientV1 = PurchaseOrdersMemoryClientV1;
//# sourceMappingURL=PurchaseOrdersMemoryClientV1.js.map