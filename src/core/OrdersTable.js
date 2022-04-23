import EventEmitter from "./EventEmitter.js";

// точка монтирования таблицы
const ordersTableTemplate = document.querySelector(
  "[data-template='ordersTable']"
);

// точка монтрования строки
const orderRowTemplate = document.querySelector("[data-template='orderRow']");

// форматтер для валюты
const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

// форматтер для даты
const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  hour12: false,
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

class OrdersTable extends EventEmitter {
  $orders = [];
  $root = null;

  constructor(root, orders) {
    super();

    this.$root = root;
    this.$orders = orders;

    this.update();
  }

  update() {
    this.$root.textcontent = "";
    // манипуляции с template
    // создаем копию
    const ordersTable = ordersTableTemplate.content.cloneNode(true);
    const tbody = ordersTable.querySelector("tbody");

    for (const order of this.$orders) {
      const { id, user, orderType, price, status, createdAt } = order;
      const { name, surname } = user;

      // копия шаблона tr
      const orderRow = orderRowTemplate.content.cloneNode(true);

      orderRow.querySelector("[data-field='id']").textContent = id;

      orderRow.querySelector(
        "[data-field='name']"
      ).textContent = `${name} ${surname}`;

      orderRow.querySelector("[data-field='orderType']").textContent =
        orderType;

      orderRow.querySelector("[data-field='price']").textContent =
        priceFormatter.format(price);

      orderRow
        .querySelector(`[data-badge="${status}"]`)
        .classList.remove("hidden");

      orderRow.querySelector("[data-field='createdAt']").textContent =
        dateFormatter.format(new Date(createdAt));

      orderRow
        .querySelector("button")
        .addEventListener("click", () => this.emit("edit", id));

      tbody.append(orderRow);
    }
    // монтаж в DOM
    this.$root.append(ordersTable);
  }
}

export default OrdersTable;
