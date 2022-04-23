import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Observable from "./core/Observable.js";
import EventEmitter from "./core/EventEmitter.js";

const store = new Store();
store.download();

const ob = new Observable();

const ee = new EventEmitter();

const ot = new OrdersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  store.orders.slice(0, 5)
);

ot.on("edit", (orderId) => console.log({ orderId }));
