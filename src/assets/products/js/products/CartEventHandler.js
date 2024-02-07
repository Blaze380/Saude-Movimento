import { products } from "./products.js";

getCartProducts();
function getCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  const totalCost = document.getElementById("cart-total-cost");
  const totalItems = document.getElementById("cart-total-items");
  let nrTotalCost = 0;
  let nrTotalItems = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    for (let j = 0; j < products.length; j++) {
      if (cartProducts[i].id == products[j].id) {
        addProductIntoCart(cartProducts[i], products[i]);
      }
    }
    nrTotalCost += parseInt(cartProducts[i].totalPrice);
    nrTotalItems += parseInt(cartProducts[i].quantity);
  }

  totalCost.innerHTML = `${nrTotalCost} MZN`;
  totalItems.innerText = nrTotalItems;
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
  const productTitle = document.createElement("h5");
  const productTrashBtn = document.createElement("a");
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
  productTrashBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
  productTitle.innerText = product.name;
  productTitleContainer.classList.add("cart-title");
  productTitleContainer.appendChild(productTitle);
  productTitleContainer.appendChild(productTrashBtn);
  productDescription.classList.add("cart-item-description");
  productDescription.appendChild(productTitleContainer);

  productQuantity.innerText = `Quant: ${cartProduct.quantity}`;
  productPrice.innerText = `${cartProduct.totalPrice} MZN`;
  productDescription.appendChild(productQuantity);
  productDescription.appendChild(productPrice);
  cartProductItem.appendChild(productDescription);

  /**
   * Appends
   */
  productContainer.appendChild(rulerBreaker);
  productContainer.appendChild(cartProductItem);
  productContainer.appendChild(rulerBreaker);
  cartProductSection.appendChild(productContainer);

  //add hr
}
