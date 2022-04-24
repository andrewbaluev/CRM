import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";
import Observable from "./core/Observable.js";
import EventEmitter from "./core/EventEmitter.js";
import Navigator from "./core/Navigator.js";

const store = new Store();
store.download();

const observable = new Observable();

const eventEmitter = new EventEmitter();

const ordersTable = new OrdersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  store.orders.slice(0, 5)
);

ordersTable.on("edit", (orderId) => console.log({ orderId }));

const paginator = new Paginator(
  document.querySelector('[data-mount="pagination"]'),
  Math.ceil(store.orders.length / 5),
  1
);

paginator.on("move", (nextPage) => {
  // paginator.page = nextPage;
  // ordersTable.orders = store.orders.slice((nextPage - 1) * 5, nextPage * 5);
  navigator.set("page", nextPage);
});

const navigator = new Navigator((navigator) => {
  console.log(navigator);
  const page = parseInt(navigator.get("page", 1), 10);
  paginator.page = page;
  ordersTable.orders = store.orders.slice((page - 1) * 5, page * 5);
});
