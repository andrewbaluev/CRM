import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";
import Observable from "./core/Observable.js";
import EventEmitter from "./core/EventEmitter.js";
import Navigator from "./core/Navigator.js";
import FilterBar from "./core/Filterbar.js";

const store = new Store();
store.download();

// console.log(store);

const filterBar = new FilterBar({
  orderTypes: "Сковорода Ручка Тетрадка Веревка Мыло Кресло Шина".split(" "),
});

const observable = new Observable();

const eventEmitter = new EventEmitter();

const ordersTable = new OrdersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  store.orders.slice(0, 5)
);

// ordersTable.on("edit", (orderId) => console.log({ orderId }));

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

// экземпляр класса навигатор
const navigator = new Navigator((navigator) => {
  // console.log(navigator);
  const page = parseInt(navigator.get("page", 1), 10);

  let orders = store.orders;

  // console.log("orders", orders);

  // фильтр по имени
  if (navigator.has("fName")) {
    const fName = navigator.get("fName");

    orders = orders.filter(
      (order) =>
        order.user.name.toLowerCase().includes(fName.toLowerCase()) ||
        order.user.surname.toLowerCase().includes(fName.toLowerCase())
    );

    filterBar.$nameInput.value = fName;
  }

  // фильтр по статусу заказа
  if (navigator.has("fStatus")) {
    const fStatus = navigator.get("fStatus");
    orders = orders.filter((order) => order.status === fStatus);
    filterBar.$statusSelect.value = fStatus;
  }

  // фильтр по заказу
  if (navigator.has("fOrderType")) {
    const fOrderType = navigator.get("fOrderType");
    orders = orders.filter((order) => order.orderType === fOrderType);
    filterBar.$orderTypeSelect.value = fOrderType;
  }

  // фильтр по цене
  if (navigator.has("fSumMin")) {
    const fSumMin = navigator.get("fSumMin");
    orders = orders.filter((order) => order.price >= fSumMin);
    filterBar.$sumMin.value = fSumMin;
  }

  if (navigator.has("fSumMax")) {
    const fSumMax = navigator.get("fSumMax");
    orders = orders.filter((order) => order.price <= fSumMax);
    filterBar.$sumMax.value = fSumMax;
  }

  // фильтр по дате
  if (navigator.has("fDateMin")) {
    const fDateMin = navigator.get("fDateMin");
    orders = orders.filter((order) => {
      return order.createdAt >= fDateMin;
    });
    filterBar.$dateMin.value = fDateMin;
  }

  // Todo сделать, чтобы при выборе было включительно dateMax
  if (navigator.has("fDateMax")) {
    const fDateMax = navigator.get("fDateMax");
    orders = orders.filter((order) => {
      return order.createdAt <= fDateMax;
    });
    filterBar.$dateMax.value = fDateMax;
  }

  // изменение количества страниц после фильтра
  paginator.pages = Math.ceil(orders.length / 5);

  paginator.page = Math.min(page, paginator.pages);
  ordersTable.orders = orders.slice(
    (paginator.page - 1) * 5,
    paginator.page * 5
  );
});

// подписка на обновления FilterBar
filterBar.subscribe((filterData) => {
  // console.log(filterData);
  for (const [key, value] of Object.entries(filterData)) {
    if (value) {
      navigator.set(key, value);
    } else {
      navigator.remove(key);
    }
  }
});

// console.log(filterBar);
