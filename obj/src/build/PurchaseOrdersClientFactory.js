"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const PurchaseOrdersNullClientV1_1 = require("../version1/PurchaseOrdersNullClientV1");
const PurchaseOrdersMemoryClientV1_1 = require("../version1/PurchaseOrdersMemoryClientV1");
const PurchaseOrdersDirectClientV1_1 = require("../version1/PurchaseOrdersDirectClientV1");
const PurchaseOrdersHttpClientV1_1 = require("../version1/PurchaseOrdersHttpClientV1");
class PurchaseOrdersClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(PurchaseOrdersClientFactory.NullClientV1Descriptor, PurchaseOrdersNullClientV1_1.PurchaseOrdersNullClientV1);
        this.registerAsType(PurchaseOrdersClientFactory.MemoryClientV1Descriptor, PurchaseOrdersMemoryClientV1_1.PurchaseOrdersMemoryClientV1);
        this.registerAsType(PurchaseOrdersClientFactory.DirectClientV1Descriptor, PurchaseOrdersDirectClientV1_1.PurchaseOrdersDirectClientV1);
        this.registerAsType(PurchaseOrdersClientFactory.HttpClientV1Descriptor, PurchaseOrdersHttpClientV1_1.PurchaseOrdersHttpClientV1);
    }
}
exports.PurchaseOrdersClientFactory = PurchaseOrdersClientFactory;
PurchaseOrdersClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-purchaseorders', 'factory', 'default', 'default', '1.0');
PurchaseOrdersClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-purchaseorders', 'client', 'null', 'default', '1.0');
PurchaseOrdersClientFactory.MemoryClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-purchaseorders', 'client', 'memory', 'default', '1.0');
PurchaseOrdersClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-purchaseorders', 'client', 'direct', 'default', '1.0');
PurchaseOrdersClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-purchaseorders', 'client', 'http', 'default', '1.0');
//# sourceMappingURL=PurchaseOrdersClientFactory.js.map