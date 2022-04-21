class Observable {
  subscribers = new Map();

  // подписка на изменения
  subscribe(subscriber) { 
    const key = Symbol("key");
    this.subscribers.set(key, subscriber);
    // возвращает отписку от обновлений
    return () => {
      if (this.subscribers.has(key)) {
        this.subscribers.delete(key);
        return true;
      } else {
        return false;
      }
    };
  }

  // сообщать об изменениях
  dispatch(...data) {
    for (const subscriber of this.subscribers.values()) {
      subscriber(...data);
    }
  }
}

export default Observable;
