function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const dataAvailable = row.cells[3].getAttribute("data-available");
    if (dataAvailable === "true") {
      row.classList.add("available");
    } else if (dataAvailable === "false") {
      row.classList.add("unavailable");
    } else if (dataAvailable === null) {
      row.hidden = true;
    }
    const gender = row.cells[2].innerHTML;
    row.classList.add(gender === "m" ? "male" : "female");
    const age = row.cells[1].innerHTML;
    if (age < 18) {
      row.style = "text-decoration: line-through";
    }
  }
}
