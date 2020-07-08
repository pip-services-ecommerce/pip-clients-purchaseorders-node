import { Descriptor, ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PurchaseOrdersMemoryPersistence } from 'pip-services-purchaseorders-node';
import { PurchaseOrdersController } from 'pip-services-purchaseorders-node';
import { PurchaseOrdersDirectClientV1 } from '../../src/version1/PurchaseOrdersDirectClientV1';
import { PurchaseOrdersClientFixtureV1 } from './PurchaseOrdersClientFixtureV1';

suite('PurchaseOrdersDirectClientV1', () => {
    let client: PurchaseOrdersDirectClientV1;
    let fixture: PurchaseOrdersClientFixtureV1;

    suiteSetup((done) => {
        
        let logger = new ConsoleLogger();
        let paymentmethodsPersistence = new PurchaseOrdersMemoryPersistence();

        let controller = new PurchaseOrdersController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-purchaseorders', 'persistence', 'memory', 'default', '1.0'), paymentmethodsPersistence,
            new Descriptor('pip-services-purchaseorders', 'controller', 'default', 'default', '1.0'), controller,
        );

        paymentmethodsPersistence.setReferences(references);
        controller.setReferences(references);

        client = new PurchaseOrdersDirectClientV1();
        client.setReferences(references);

        fixture = new PurchaseOrdersClientFixtureV1(client);

        client.open(null, done);
    });

    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
