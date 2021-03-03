// Product class
class Product {
  constructor(title, author, idnumber) {
    (this.title = title), (this.author = author), (this.idnumber = idnumber);
  }
}

// UI class
class UI {
  // añadir el producto a la lista
  static addProductToList(product) {
    const list = document.querySelector("#product-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${product.title}</td>
    <td>${product.author}</td>
    <td>${product.idnumber}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  //borra el producto de la lista
  static deleteProduct(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#product-form");

    //dentro de container insert div antes de form
    container.insertBefore(div, form);

    // alert desaparece despues de 2 segundos
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearAll() {
    document.querySelector("#product-form").reset();
  }
}

document.querySelector("#product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // el valor de cada campo
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const idnumber = document.querySelector("#idnumber").value;

  if (title === "" || author === "" || idnumber === "") {
    UI.showAlert("Rellena todos los campos", "danger");
  } else {
    // crear producto
    const product = new Product(title, author, idnumber);

    // añadir producto a la lista
    UI.addProductToList(product);

    //enseñar mensaje de exito por el producto introducido
    UI.showAlert("Producto añadido correctamente", "success");

    //limpiar los inputs despues introducir el producto
    UI.clearAll();
  }
});
//borra producto de la lista
document.querySelector("#product-list").addEventListener("click", (e) => {
  UI.deleteProduct(e.target);

  UI.showAlert("Producto borrado correctamente", "primary");
});
