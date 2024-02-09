import { products } from "./products.js";

function getCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  const totalCost = document.getElementById("cart-total-cost");
  const totalItems = document.getElementById("cart-total-items");
  let nrTotalCost = 0;
  let nrTotalItems = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    for (let j = 0; j < products.length; j++) {
      if (cartProducts[i].id == products[j].id) {
        document.getElementById("template-product").style.display = "none";
        addProductIntoCart(cartProducts[i], products[j]);
      }
    }
    nrTotalCost += parseInt(cartProducts[i].totalPrice);
    nrTotalItems += parseInt(cartProducts[i].quantity);
  }

  totalCost.innerHTML = `${nrTotalCost} MZN`;
  totalItems.innerText = nrTotalItems;
}
function removeAllProducts() {
  const removeButton = document.getElementById("remove-all-products-btn");
  removeButton.addEventListener("click", () => {
    removeProducts();
  });
}

function removeProducts() {
  const cartProductSection =
    document.getElementsByClassName("cart-products")[0];
  const removeAllProductsSection = document.getElementsByClassName(
    "cart-remove-product"
  )[0];
  const templateProduct = document.getElementById("template-product");
  const totalItems = document.getElementById("cart-total-items");
  const totalCost = document.getElementById("cart-total-cost");
  while (cartProductSection.children.length > 0) {
    cartProductSection.removeChild(cartProductSection.children[0]);
  }
  templateProduct.style.display = "block";
  cartProductSection.appendChild(removeAllProductsSection);
  cartProductSection.appendChild(templateProduct);
  totalItems.innerText = "0";
  totalCost.innerText = "0 MZN";
  localStorage.removeItem("cart");
}

function addProductIntoCart(cartProduct, product) {
  const cartProductSection =
    document.getElementsByClassName("cart-products")[0];
  //const product = products[0];
  const productContainer = document.createElement("div");
  const rulerBreaker = document.createElement("hr");
  const cartProductItem = document.createElement("div");
  const productImg = document.createElement("img");
  const productDescription = document.createElement("div");
  const productTitleContainer = document.createElement("div");
  const productTitle = document.createElement("h6");
  const productTrashBtn = document.createElement("button");
  const productQuantity = document.createElement("p");
  const productPrice = document.createElement("p");

  //Product container,cart product and Ruler Breaker
  productContainer.classList.add("cart-product-item");
  rulerBreaker.classList.add("cart-breaker");
  cartProductItem.classList.add("cart-item");
  //Product Image
  productImg.classList.add("cart-item-image");
  productImg.src = product.image;
  cartProductItem.appendChild(productImg);
  //Product Description, title quantity and price
  productTrashBtn.classList.add("cart-trash-btn");
  productTrashBtn.classList.add("cart-trash-btn-item");
  productTrashBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
  productTitle.innerText = product.name;
  productTitleContainer.classList.add("cart-title");
  productTitleContainer.appendChild(productTitle);
  productTitleContainer.appendChild(productTrashBtn);
  productDescription.classList.add("cart-item-description");
  productDescription.appendChild(productTitleContainer);

  productQuantity.innerText = `Quantidade: ${cartProduct.quantity}`;
  productPrice.innerText = `${cartProduct.totalPrice} MZN`;
  productDescription.appendChild(productQuantity);
  productDescription.appendChild(productPrice);
  cartProductItem.appendChild(productDescription);

  productTrashBtn.addEventListener("click", () => {
    const totalItems = document.getElementById("cart-total-items");
    const totalCost = document.getElementById("cart-total-cost");
    productContainer.style.animation = "zoomOutUp 1s";
    setTimeout(() => {
      cartProductSection.removeChild(productContainer);
    }, 1000);

    if (cartProductSection.children.length <= 3) {
      document.getElementById("template-product").style.display = "block";
    }
    totalItems.innerText =
      parseInt(totalItems.innerText) - cartProduct.quantity;
    totalCost.innerText =
      parseInt(totalCost.innerText) - cartProduct.totalPrice + " MZN";
    console.log(product.id);
    removeItemInTheCart(product.id);
    showRemovedFromCartPopUp();
  });

  /**
   * Appends
   */
  productContainer.appendChild(rulerBreaker);
  productContainer.appendChild(cartProductItem);
  productContainer.appendChild(rulerBreaker);
  cartProductSection.appendChild(productContainer);

  //add hr
}

function showRemovedFromCartPopUp() {
  const removedProductPopUpContainer = document.getElementsByClassName(
    "removed-product-popup"
  )[0];
  removedProductPopUpContainer.style.animation = "bounceInRight 1s";
  removedProductPopUpContainer.style.transform = "translateX(0)";
  closeRemovedFromCartPopUp();
}
function closeRemovedFromCartPopUp() {
  let isClosed = false;
  const removedProductPopUpContainer = document.getElementsByClassName(
    "removed-product-popup"
  )[0];
  const removedProductPopUpBtn = document.getElementById(
    "removed-product-popup-btn"
  );
  removedProductPopUpBtn.addEventListener("click", () => {
    removedProductPopUpContainer.style.transform = "translateX(50vw)";
    isClosed = true;
  });
  if (isClosed == false) {
    setTimeout(() => {
      removedProductPopUpContainer.style.animation = "bounceOutRight 1s";
      setTimeout(() => {
        removedProductPopUpContainer.style.transform = "translateX(50vw)";
      }, 1000);
    }, 2000);
  }
}

function removeItemInTheCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  let newCartProducts = [];
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id != productId) {
      newCartProducts[newCartProducts.length] = cartProducts[i];
    }
  }
  if (newCartProducts.length === 0) {
    localStorage.removeItem("cart");
  } else {
    localStorage.setItem("cart", JSON.stringify(newCartProducts));
  }
}

function activateAllFunctions() {
  removeAllProducts();
  getCartProducts();
  const removeAllProductsBtn = document.getElementById(
    "remove-all-products-btn"
  );
  removeAllProductsBtn.addEventListener("click", () => {
    showRemovedFromCartPopUp();
  });
}
activateAllFunctions();
