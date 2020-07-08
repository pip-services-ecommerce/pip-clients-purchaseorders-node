let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PurchaseOrdersMemoryPersistence } from 'pip-services-purchaseorders-node';
import { PurchaseOrdersController } from 'pip-services-purchaseorders-node';
import { PurchaseOrdersHttpServiceV1 } from 'pip-services-purchaseorders-node';
import { IPurchaseOrdersClientV1 } from '../../src/version1/IPurchaseOrdersClientV1';
import { PurchaseOrdersHttpClientV1 } from '../../src/version1/PurchaseOrdersHttpClientV1';
import { PurchaseOrdersClientFixtureV1 } from './PurchaseOrdersClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('PurchaseOrdersHttpClientV1', () => {
    let service: PurchaseOrdersHttpServiceV1;
    let client: PurchaseOrdersHttpClientV1;
    let fixture: PurchaseOrdersClientFixtureV1;

    suiteSetup((done) => {

        let logger = new ConsoleLogger();
        let persistence = new PurchaseOrdersMemoryPersistence();
        let controller = new PurchaseOrdersController();

        service = new PurchaseOrdersHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-purchaseorders', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-purchaseorders', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-purchaseorders', 'service', 'http', 'default', '1.0'), service
        );

        persistence.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new PurchaseOrdersHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new PurchaseOrdersClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
