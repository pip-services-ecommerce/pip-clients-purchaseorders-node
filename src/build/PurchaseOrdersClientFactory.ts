import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { PurchaseOrdersNullClientV1 } from '../version1/PurchaseOrdersNullClientV1';
import { PurchaseOrdersDirectClientV1 } from '../version1/PurchaseOrdersDirectClientV1';
import { PurchaseOrdersHttpClientV1 } from '../version1/PurchaseOrdersHttpClientV1';

export class PurchaseOrdersClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-purchaseorders', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-purchaseorders', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-purchaseorders', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-purchaseorders', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(PurchaseOrdersClientFactory.NullClientV1Descriptor, PurchaseOrdersNullClientV1);
		this.registerAsType(PurchaseOrdersClientFactory.DirectClientV1Descriptor, PurchaseOrdersDirectClientV1);
		this.registerAsType(PurchaseOrdersClientFactory.HttpClientV1Descriptor, PurchaseOrdersHttpClientV1);
	}
	
}
