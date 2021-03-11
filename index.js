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
      <td class="titleValue">${product.title}</td>
      <td class="authorValue">${product.author}</td>
      <td class="idnumberValue">${product.idnumber}</td>
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
    const alertBox = document.querySelector("#alert-box");
    alertBox.className = `alert alert-${className}`;
    document.querySelector(
      "#alert-box"
    ).innerHTML = `<div id="cajaa">${message}</div>`;

    // alert desaparece despues de 2 segundos
    setTimeout(() => document.querySelector("#cajaa").remove(), 2000);
  }

  static clearAll() {
    document.querySelector("#product-form").reset();
  }
}

document.querySelector("#product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const idnumber = document.querySelector("#idnumber").value;

  if (title === "" || author === "" || idnumber === "") {
    UI.showAlert("Rellena todos los campos", "danger");
  } else {
    // crear producto

    const product = new Product(title, author, idnumber);

    let createdTitles = document.querySelectorAll(".titleValue");
    let createdAuthors = document.querySelectorAll(".authorValue");
    let createdProductId = document.querySelectorAll(".idnumberValue");

    if (createdTitles.length > 0) {
      for (let i = 0; i < createdTitles.length; i++) {
        if (createdTitles[i].innerText.includes(product.title)) {
          UI.showAlert("Este producto ya existe", "danger");
          return;
        }
      }

      for (let i = 0; i < createdAuthors.length; i++) {
        if (createdAuthors[i].innerText.includes(product.author)) {
          UI.showAlert("Este autor ya existe", "danger");
          return;
        }
      }

      for (let i = 0; i < createdProductId.length; i++) {
        if (createdProductId[i].innerText.includes(product.idnumber)) {
          UI.showAlert("Este id ya existe", "danger");
          return;
        }
      }
    }

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
