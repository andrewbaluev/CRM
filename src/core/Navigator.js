import Observable from "./Observable.js";

class Navigator extends Observable {
  $data = {};

  constructor(handler = () => {}) {
    super();

    const params = new URLSearchParams(location.search);

    for (const [key, value] of params) {
      this.$data[key] = value;
    }

    this.subscribe(handler);
    this.dispatch(this);
  }

  has(key) {
    return this.$data.hasOwnProperty(key);
  }

  // добовляем либо обновляем данные в $data
  set(key, value) {
    this.$data = {
      ...this.$data,
      [key]: value,
    };

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(this.$data)) {
      params.append(key, value);
    }

    history.pushState(null, null, `?${params.toString()}`);
    this.dispatch(this);
  }

  get(key, defaultValue) {
    if (this.$data.hasOwnProperty(key)) {
      return this.$data[key];
    }

    return defaultValue;
  }

  remove(key) {
    if (this.$data.hasOwnProperty(key)) {
      return;
    }

    delete this.$data[key]; 

    this.$data = {
      ...this.$data,
      [key]: value,
    };

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(this.$data)) {
      params.append(key, value);
    }

    history.pushState(null, null, `?${params.toString()}`);
    this.dispatch(this);
  }
}

export default Navigator;
