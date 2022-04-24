import Store from "../core/Store.js";
import OrdersTable from "../core/OrdersTable.js";
import Paginator from "../core/Paginator.js";
import Observable from "../core/Observable.js";
import EventEmitter from "../core/EventEmitter.js";
import Navigator from "../core/Navigator.js";
import FilterBar from "../core/Filterbar.js";

class Application {
  $store = new Store();

  $filterBar = new FilterBar({
    orderTypes: "Сковорода Ручка Тетрадка Веревка Мыло Кресло Шина".split(" "),
  });

  $ordersTable = new OrdersTable(
    document.querySelector('[data-mount="ordersTable"]'),
    this.$store.orders.slice(0, 5)
  );

  $paginator = new Paginator(
    document.querySelector('[data-mount="pagination"]'),
    Math.ceil(this.$store.orders.length / 5),
    1
  );

  $eventEmitter = new EventEmitter();
  $observable = new Observable();
  $navigator = new Navigator();

  constructor() {
    this.$store.download();
    this.$ordersTable.on("edit", (orderId) => {
      location = `/editor.html?orderId=${orderId}`;
    });

    this.$paginator.on("move", (nextPage) =>
      this.$navigator.set("page", nextPage)
    );
    this.$navigator.subscribe(this.navigatorHandler);
    this.$navigator.dispatch(this.$navigator);
    // подписка на обновления FilterBar
    this.$filterBar.subscribe(this.filterBarHandler);

    // проблемно-ориентированный подход
    const actionElements = document.querySelectorAll("[data-action]");
    for (const actionElement of actionElements) {
      actionElement.addEventListener("click", (event) => {
        event.preventDefault();

        let { action, field, value } = actionElement.dataset;

        if (action === "filter") {
          field = `f${field[0].toUpperCase()}${field.slice(1)}`;

          this.$navigator.set(field, value);
        } else if (action === "search") {
        }
      });
    }
  }

  filterBarHandler = (filterData) => {
    for (const [key, value] of Object.entries(filterData)) {
      if (value) {
        this.$navigator.set(key, value);
      } else {
        this.$navigator.remove(key);
      }
    }
  };

  navigatorHandler = (navigator) => {
    const page = parseInt(navigator.get("page", 1), 10);

    let orders = this.$store.orders;

    // фильтр по имени
    if (navigator.has("fName")) {
      const fName = navigator.get("fName");

      orders = orders.filter(
        (order) =>
          order.user.name.toLowerCase().includes(fName.toLowerCase()) ||
          order.user.surname.toLowerCase().includes(fName.toLowerCase())
      );

      this.$filterBar.$nameInput.value = fName;
    }

    // фильтр по статусу заказа
    if (navigator.has("fStatus")) {
      const fStatus = navigator.get("fStatus");
      orders = orders.filter((order) => order.status === fStatus);
      this.$filterBar.$statusSelect.value = fStatus;
    }

    // фильтр по заказу
    if (navigator.has("fOrderType")) {
      const fOrderType = navigator.get("fOrderType");
      orders = orders.filter((order) => order.orderType === fOrderType);
      this.$filterBar.$orderTypeSelect.value = fOrderType;
    }

    // фильтр по цене
    if (navigator.has("fSumMin")) {
      const fSumMin = navigator.get("fSumMin");
      orders = orders.filter((order) => order.price >= fSumMin);
      this.$filterBar.$sumMin.value = fSumMin;
    }

    if (navigator.has("fSumMax")) {
      const fSumMax = navigator.get("fSumMax");
      orders = orders.filter((order) => order.price <= fSumMax);
      this.$filterBar.$sumMax.value = fSumMax;
    }

    // фильтр по дате
    if (navigator.has("fDateMin")) {
      const fDateMin = navigator.get("fDateMin");
      orders = orders.filter((order) => {
        return order.createdAt >= fDateMin;
      });
      this.$filterBar.$dateMin.value = fDateMin;
    }

    // Todo сделать, чтобы при выборе было включительно dateMax
    if (navigator.has("fDateMax")) {
      const fDateMax = navigator.get("fDateMax");
      orders = orders.filter((order) => {
        return order.createdAt <= fDateMax;
      });
      this.$filterBar.$dateMax.value = fDateMax;
    }

    // изменение количества страниц после фильтра
    this.$paginator.pages = Math.ceil(orders.length / 5);
    this.$paginator.page = Math.min(page, this.$paginator.pages);
    this.$ordersTable.orders = orders.slice(
      (this.$paginator.page - 1) * 5,
      this.$paginator.page * 5
    );
  };
}

export default Application;
