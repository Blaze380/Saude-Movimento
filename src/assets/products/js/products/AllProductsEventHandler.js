import { products, categories } from "./products.js";

function setProductCategories() {
  const categoryBox = document.getElementsByClassName("widget-check-box")[0];
  for (let i = 0; i < categories.length; i++) {
    let label = document.createElement("label");
    let nrProducts = document.createElement("p");
    let checkBox = document.createElement("input");
    let checkBtn = document.createElement("span");
    checkBtn.classList.add("checkmark");
    checkBox.type = "checkbox";
    label.classList.add("widget-check");
    label.innerText = categories[i].name;
    label.id = categories[i].id;
    nrProducts.innerText = "(30)";
    label.appendChild(nrProducts);
    label.appendChild(checkBox);
    label.appendChild(checkBtn);
    categoryBox.appendChild(label);
  }
}
setProductCategories();

function setAllProducts() {}
