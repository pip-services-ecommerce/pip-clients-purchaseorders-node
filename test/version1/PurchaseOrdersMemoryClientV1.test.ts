import { Descriptor, ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PurchaseOrdersMemoryPersistence } from 'pip-services-purchaseorders-node';
import { PurchaseOrdersController } from 'pip-services-purchaseorders-node';
import { PurchaseOrdersDirectClientV1 } from '../../src/version1/PurchaseOrdersDirectClientV1';
import { PurchaseOrdersClientFixtureV1 } from './PurchaseOrdersClientFixtureV1';
import { PurchaseOrdersMemoryClientV1 } from '../../src/version1/PurchaseOrdersMemoryClientV1';

suite('PurchaseOrdersMemoryClientV1', () => {
    let client: PurchaseOrdersMemoryClientV1;
    let fixture: PurchaseOrdersClientFixtureV1;

    suiteSetup(() => {
        client = new PurchaseOrdersMemoryClientV1();

        fixture = new PurchaseOrdersClientFixtureV1(client);

    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
