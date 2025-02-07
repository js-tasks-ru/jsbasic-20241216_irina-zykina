/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.render(rows);
  }
  render(rows) {
    this.elem = document.createElement("table");
    this.elem.insertAdjacentHTML(
      "afterbegin",
      "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>"
    );
    let rowsHtml = rows
      .map(
        (row) =>
          `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`
      )
      .join("");

    this.elem.insertAdjacentHTML("beforeend", `<tbody>${rowsHtml}</tbody>`);
    this.elem.addEventListener("click", this.onclick);
  }
  onclick(ev) {
    if (ev.target.tagName === "BUTTON") {
      let body = ev.target.parentElement.parentElement.parentElement;
      let tr = ev.target.parentElement.parentElement;
      body.removeChild(tr);
    }
  }
}
