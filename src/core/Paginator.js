import EventEmitter from "./EventEmitter.js";

class Paginator extends EventEmitter {
  $root = null;
  $pages = 1;
  $page = 1;

  constructor(root, pages, page) {
    super();

    this.$root = root;
    this.$pages = pages;
    this.$page = page;

    this.update();
  }

  update() {
    this.$root.textContent = "";

    const nav = document.createElement("nav");
    this.$root.append(nav);

    const ul = document.createElement("ul");
    nav.append(ul);
    ul.className = "pagination justify-content-center";

    const backLi = document.createElement("li");
    ul.append(backLi);
    backLi.classList.add("page-item");

    const backA = document.createElement("a");
    backLi.append(backA);
    backA.textContent = "Назад";
    backA.classList.add("page-link");
    backA.href = "#";

    backA.addEventListener("click", (e) => {
      e.preventDefault();
      this.emit("move", this.$page - 1);
    });

    if (this.$page === 1) {
      backLi.classList.add("disabled");
    }

    for (let i = 1; i <= this.$pages; i++) {
      const li = document.createElement("li");
      ul.append(li);
      li.classList.add("page-item");

      const a = document.createElement("a");
      li.append(a);
      a.textContent = i;
      a.classList.add("page-link");
      a.href = "#";

      a.addEventListener("click", (e) => {
        e.preventDefault();
        this.emit("move", i);
      });

      if (i === this.$page) {
        li.classList.add("active");
      }
    }

    const forwardLi = document.createElement("li");
    ul.append(forwardLi);
    forwardLi.classList.add("page-item");

    const forwardA = document.createElement("a");
    forwardLi.append(forwardA);
    forwardA.textContent = "Вперед";
    forwardA.classList.add("page-link");
    forwardA.href = "#";

    if (this.$page === this.$pages) {
      forwardLi.classList.add("disabled");
    }

    forwardA.addEventListener("click", (e) => {
        e.preventDefault();
        this.emit("move", this.$page + 1);
      });
  }
}

export default Paginator;
