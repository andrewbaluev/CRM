const names = "Андрей Дмитрий Алексей Сергей Иван".split(" ");
const surname = "Иванов Петров Попов".split(" ");
// prettier-ignore
const orderTypes = "Сковорода Ручка Тетрадка Веревка Мыло Кресло Шина".split(" ");
const statuses = "new process back archived".split(" ");

const getRandom = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomFrom = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const getRandomDate = (fromDate, toDate) => {
  const fromTimestamp = new Date(fromDate).getTime();
  const toTimestamp = new Date(toDate).getTime();

  const timestamp = getRandom(fromTimestamp, toTimestamp);
  return new Date(timestamp);
};

const nowMoment = new Date();
const weekAgo = new Date(nowMoment.getTime() - 7 * 24 * 60 * 60 * 1000);

const generateUser = () => ({
  name: getRandomFrom(names),
  surname: getRandomFrom(surname),
});

const generateOrder = () => ({
  user: generateUser(),
  orderType: getRandomFrom(orderTypes),
  price: getRandom(1000, 5000),
  status: getRandomFrom(statuses),
  createdAt: getRandomDate(weekAgo, nowMoment),
});

const generate = (n) =>
  Array(n)
    .fill()
    .map(generateOrder)
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((order, index) => ({
      id: index + 1,
      ...order,
    }));

console.log(JSON.stringify(generate(30)));


