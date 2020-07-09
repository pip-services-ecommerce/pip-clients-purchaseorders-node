# Client API (version 1) <br/> PurchaseOrders Microservices Client SDK for Node.js

Node.js client API for PurchaseOrders microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [IPurchaseOrdersClientV1 interface](#interface)
    - [getOrders()](#operation1)
    - [getOrderById()](#operation2)
    - [createOrder()](#operation3)
    - [updateOrder()](#operation4)
    - [deleteOrderById()](#operation5)
* [PurchaseOrdersHttpClientV1 class](#client_http)
* [PurchaseOrdersDirectClientV1 class](#client_direct)
* [PurchaseOrdersNullClientV1 class](#client_null)

## <a name="interface"></a> IPurchaseOrdersClientV1 interface

If you are using Typescript, you can use IPurchaseOrdersClientV1 as a common interface across all client implementations. 
If you are using plain typescript, you shall not worry about IPurchaseOrdersClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```typescript
interface IPurchaseOrdersClientV1 {
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;

    getOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void;

    createOrder(correlationId: string, order: PurchaseOrderV1, 
        callback: (err: any, order: PurchaseOrderV1) => void): void;

    updateOrder(correlationId: string, order: PurchaseOrderV1, 
        callback: (err: any, order: PurchaseOrderV1) => void): void;

    deleteOrderById(correlationId: string, order_id: string, customer_id: string,
        callback: (err: any, order: PurchaseOrderV1) => void): void;
}
```

### <a name="operation1"></a> getOrders(correlationId, filter, paging, callback)

Get purchase orders by filter

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: Object
    - id: string - (optional) unique order id
    - ids: string - (optional) list of unique order ids
    - customer_id: string - (optional) order reference customer id
    - state: string - (optional) order state (PurchaseOrderStateV1)
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Page with retrieved orders

### <a name="operation2"></a> getOrderById(correlationId, order_id, customer_id, callback)

Get order by id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- order_id: string - order id
- customer_id: string - order reference customer id

**Response body:**
- order: PurchaseOrderV1 - finded order 

### <a name="operation3"></a> createOrder(correlationId, order, callback)

Add new order

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- order: PurchaseOrderV1 - params for creates new order

**Response body:**
- order: PurchaseOrderV1 - generated new order

### <a name="operation4"></a> updateOrder(correlationId, order, callback)

Update existed order

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- order: PurchaseOrderV1 - params for update existed order

**Returns:**
- err: Error - occured error or null for success
- order: PurchaseOrderV1 - updated order 

### <a name="operation5"></a> deleteOrderById(correlationId, order_id, customer_id, callback)

Delete order by id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- order_id: string - order id for delete
- customer_id: string - customer id in the order to be deleted

**Returns:**
- err: Error - occured error or null for success
- order: PurchaseOrderV1 - deleted order 


## <a name="client_http"></a> PurchaseOrdersHttpClientV1 class

PurchaseOrdersHttpClientV1 is a client that implements HTTP protocol

```typescript
class PurchaseOrdersHttpClientV1 extends CommandableHttpClient implements IPurchaseOrdersClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;
    getOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
    createOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    updateOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    deleteOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_direct"></a> PurchaseOrdersDirectClientV1 class

PurchaseOrdersDirectClientV1 is a dummy client calls controller from the same container. 
It can be used in monolytic deployments.

```typescript
class PurchaseOrdersDirectClientV1 extends DirectClient<any> implements IPurchaseOrdersClientV1 {
    constructor();
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;
    getOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
    createOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    updateOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    deleteOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
}
```

## <a name="client_null"></a> PurchaseOrdersNullClientV1 class

PurchaseOrdersNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```typescript
class PurchaseOrdersNullClientV1 implements IPurchaseOrdersClientV1 {
    constructor();
    getOrders(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PurchaseOrderV1>) => void): void;
    getOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
    createOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    updateOrder(correlationId: string, order: PurchaseOrderV1, callback: (err: any, order: PurchaseOrderV1) => void): void;
    deleteOrderById(correlationId: string, order_id: string, customer_id: string, callback: (err: any, order: PurchaseOrderV1) => void): void;
}
```