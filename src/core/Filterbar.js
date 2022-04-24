import Observable from "./Observable.js";

class FilterBar extends Observable {
  $nameInput = null;
  $orderTypeSelect = null;
  $statusSelect = null;
  $sumMin = null;
  $sumMax = null;
  $dateMin = null;
  $dateMax = null;

  constructor(data) {
    super();

    // поля фильтрации
    this.$nameInput = document.querySelector('input[data-field="name"]');
    // prettier-ignore
    this.$orderTypeSelect = document.querySelector('select[data-field="orderType"]');
    this.$statusSelect = document.querySelector('select[data-field="status"]');
    this.$sumMin = document.querySelector('input[data-field="sumMin"]');
    this.$sumMax = document.querySelector('input[data-field="sumMax"]');
    this.$dateMin = document.querySelector('input[data-field="dateMin"]');
    this.$dateMax = document.querySelector('input[data-field="dateMax"]');

    this.$nameInput.addEventListener("input", this.apply);
    this.$orderTypeSelect.addEventListener("change", this.apply);
    this.$statusSelect.addEventListener("change", this.apply);
    this.$sumMin.addEventListener("input", this.apply);
    this.$sumMax.addEventListener("input", this.apply);
    this.$dateMin.addEventListener("input", this.apply);
    this.$dateMax.addEventListener("input", this.apply);

    if (data.orderTypes) {
      // очищаем select с заказами
      this.$orderTypeSelect.textContent = null;

      // пустой первый option в select
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "";
      this.$orderTypeSelect.append(option);

      // создаем для каждого элемента orderTypes свой option
      // (элементы, которые передали в экземпляр класса)
      for (const orderType of data.orderTypes) {
        const option = document.createElement("option");
        option.value = orderType;
        option.textContent = orderType;
        this.$orderTypeSelect.append(option);
      }
    }
  }

  // применить изменения фильтрации
  apply = () =>
    this.dispatch({
      fName: this.$nameInput.value,
      fOrderType: this.$orderTypeSelect.value,
      fStatus: this.$statusSelect.value,
      fSumMin: this.$sumMin.value,
      fSumMax: this.$sumMax.value,
      fDateMin: this.$dateMin.value,
      fDateMax: this.$dateMax.value,
    });
}

export default FilterBar;
