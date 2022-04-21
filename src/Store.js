const APPLICATION_KEY = "__crm_app__";

class Store {
  $orders = [];

  // получить заказы
  get orders() {
    return JSON.parse(JSON.stringify(this.$orders));
  }

  // сохраняет данные в localStorage
  upload() {
    const json = JSON.stringify(this.$orders);
    localStorage.setItem(APPLICATION_KEY, json);
  }

  // достает из localStorage данные и запоняет ими orders
  download() {
    // очистить orders
    this.$orders.splice(0);
    // json - актуальное состояние
    const json = localStorage.getItem(APPLICATION_KEY);

    if (json) {
      const nextOrders = JSON.stringify(json);
      this.$orders.push(...nextOrders);
    } else {
      this.reinit();
    }
  }

  //переинициализирует стор (данные по умолчанию)
  reinit() {
    // очистить orders
    this.$orders.splice(0);
    this.$orders.push(
      ...[
        {
          id: 1,
          user: { name: "Алексей", surname: "Попов" },
          orderType: "Сковорода",
          price: 4095,
          status: "new",
          createdAt: "2022-04-15T00:07:11.570Z",
        },
        {
          id: 2,
          user: { name: "Иван", surname: "Иванов" },
          orderType: "Кресло",
          price: 2896,
          status: "archived",
          createdAt: "2022-04-15T00:51:03.409Z",
        },
        {
          id: 3,
          user: { name: "Алексей", surname: "Попов" },
          orderType: "Тетрадка",
          price: 1680,
          status: "archived",
          createdAt: "2022-04-15T01:19:37.400Z",
        },
        {
          id: 4,
          user: { name: "Андрей", surname: "Петров" },
          orderType: "Кресло",
          price: 3277,
          status: "back",
          createdAt: "2022-04-15T02:45:00.557Z",
        },
        {
          id: 5,
          user: { name: "Дмитрий", surname: "Петров" },
          orderType: "Ручка",
          price: 2126,
          status: "new",
          createdAt: "2022-04-15T08:38:19.846Z",
        },
        {
          id: 6,
          user: { name: "Андрей", surname: "Петров" },
          orderType: "Сковорода",
          price: 3474,
          status: "archived",
          createdAt: "2022-04-15T12:00:08.226Z",
        },
        {
          id: 7,
          user: { name: "Андрей", surname: "Иванов" },
          orderType: "Шина",
          price: 4131,
          status: "new",
          createdAt: "2022-04-15T20:03:05.872Z",
        },
        {
          id: 8,
          user: { name: "Андрей", surname: "Попов" },
          orderType: "Шина",
          price: 1202,
          status: "archived",
          createdAt: "2022-04-15T21:40:04.953Z",
        },
        {
          id: 9,
          user: { name: "Иван", surname: "Петров" },
          orderType: "Кресло",
          price: 1408,
          status: "back",
          createdAt: "2022-04-15T23:52:24.139Z",
        },
        {
          id: 10,
          user: { name: "Сергей", surname: "Попов" },
          orderType: "Ручка",
          price: 1136,
          status: "back",
          createdAt: "2022-04-16T13:23:13.836Z",
        },
        {
          id: 11,
          user: { name: "Сергей", surname: "Петров" },
          orderType: "Кресло",
          price: 1479,
          status: "back",
          createdAt: "2022-04-16T18:06:59.247Z",
        },
        {
          id: 12,
          user: { name: "Алексей", surname: "Попов" },
          orderType: "Шина",
          price: 1364,
          status: "back",
          createdAt: "2022-04-17T06:26:14.079Z",
        },
        {
          id: 13,
          user: { name: "Дмитрий", surname: "Попов" },
          orderType: "Ручка",
          price: 4044,
          status: "process",
          createdAt: "2022-04-17T08:57:16.566Z",
        },
        {
          id: 14,
          user: { name: "Сергей", surname: "Петров" },
          orderType: "Мыло",
          price: 2365,
          status: "back",
          createdAt: "2022-04-17T09:44:05.898Z",
        },
        {
          id: 15,
          user: { name: "Сергей", surname: "Попов" },
          orderType: "Мыло",
          price: 1678,
          status: "process",
          createdAt: "2022-04-17T20:24:28.869Z",
        },
        {
          id: 16,
          user: { name: "Алексей", surname: "Иванов" },
          orderType: "Веревка",
          price: 4742,
          status: "process",
          createdAt: "2022-04-17T20:46:02.996Z",
        },
        {
          id: 17,
          user: { name: "Иван", surname: "Попов" },
          orderType: "Кресло",
          price: 2006,
          status: "back",
          createdAt: "2022-04-18T11:57:59.635Z",
        },
        {
          id: 18,
          user: { name: "Иван", surname: "Попов" },
          orderType: "Кресло",
          price: 1088,
          status: "new",
          createdAt: "2022-04-18T18:52:43.179Z",
        },
        {
          id: 19,
          user: { name: "Дмитрий", surname: "Иванов" },
          orderType: "Сковорода",
          price: 4657,
          status: "back",
          createdAt: "2022-04-18T20:52:09.574Z",
        },
        {
          id: 20,
          user: { name: "Дмитрий", surname: "Иванов" },
          orderType: "Сковорода",
          price: 2725,
          status: "back",
          createdAt: "2022-04-19T02:09:36.549Z",
        },
        {
          id: 21,
          user: { name: "Андрей", surname: "Иванов" },
          orderType: "Веревка",
          price: 4871,
          status: "process",
          createdAt: "2022-04-19T12:41:17.243Z",
        },
        {
          id: 22,
          user: { name: "Андрей", surname: "Петров" },
          orderType: "Веревка",
          price: 2162,
          status: "back",
          createdAt: "2022-04-19T14:11:53.002Z",
        },
        {
          id: 23,
          user: { name: "Алексей", surname: "Иванов" },
          orderType: "Веревка",
          price: 1295,
          status: "archived",
          createdAt: "2022-04-19T15:00:30.166Z",
        },
        {
          id: 24,
          user: { name: "Дмитрий", surname: "Попов" },
          orderType: "Мыло",
          price: 1650,
          status: "archived",
          createdAt: "2022-04-19T22:22:08.765Z",
        },
        {
          id: 25,
          user: { name: "Дмитрий", surname: "Попов" },
          orderType: "Шина",
          price: 1911,
          status: "new",
          createdAt: "2022-04-19T22:23:05.021Z",
        },
        {
          id: 26,
          user: { name: "Иван", surname: "Попов" },
          orderType: "Кресло",
          price: 1810,
          status: "process",
          createdAt: "2022-04-19T22:24:34.936Z",
        },
        {
          id: 27,
          user: { name: "Дмитрий", surname: "Петров" },
          orderType: "Сковорода",
          price: 3274,
          status: "back",
          createdAt: "2022-04-20T17:26:30.967Z",
        },
        {
          id: 28,
          user: { name: "Алексей", surname: "Иванов" },
          orderType: "Ручка",
          price: 4256,
          status: "back",
          createdAt: "2022-04-20T23:25:15.309Z",
        },
        {
          id: 29,
          user: { name: "Дмитрий", surname: "Попов" },
          orderType: "Тетрадка",
          price: 1232,
          status: "process",
          createdAt: "2022-04-21T03:30:20.955Z",
        },
        {
          id: 30,
          user: { name: "Иван", surname: "Иванов" },
          orderType: "Кресло",
          price: 2069,
          status: "process",
          createdAt: "2022-04-21T16:04:59.093Z",
        },
      ]
    );
  }
}

export default Store;
