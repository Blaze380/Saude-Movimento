import { products, categories } from "./products.js";

/**
 * DEPRECATED!!!!!
 */
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
//setProductCategories();
setAllProducts();

function setAllProducts() {
  for (let i = 0; i < products.length; i++) {
    if (products[i].isDiscount) {
      setProductWithDiscount(products[i]);
    } else {
      setProductWithoutDiscount(products[i]);
    }
  }
}
function setProductWithDiscount(product) {
  const productSection = document.getElementsByClassName(
    "products-section-blz"
  )[0];
  //   const product = products[5];
  const productContainer = document.createElement("div");
  const productBox = document.createElement("div");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");
  const productDiscountPercentageContainer = document.createElement("div");
  const productDiscountPercentage = document.createElement("span");
  const productContent = document.createElement("div");
  const productTitleContainer = document.createElement("div");
  const productTitle = document.createElement("h2");
  const productTextContainer = document.createElement("div");
  const productText = document.createElement("p");
  const addToCartBtn = document.createElement("a");

  //Adding classes to the product container
  productContainer.classList.add("col-lg-4");
  productContainer.classList.add("product-item");
  productContainer.classList.add("col-md-6");
  //Adding classes to product box
  productBox.classList.add("carvally-single-products-box");

  //Image container, image and discount
  image.src = product.image;
  image.alt = "Imagem de um produto";
  image.id = product.id;
  imgContainer.classList.add("carvally-prosucts-thumb2");
  imgContainer.appendChild(image);
  productDiscountPercentage.innerText = `-${product.discountPercentage}%`;
  productDiscountPercentageContainer.classList.add("product-sale");
  productDiscountPercentageContainer.appendChild(productDiscountPercentage);
  imgContainer.appendChild(productDiscountPercentageContainer);

  //Product Content, title and text
  productTitle.innerText = product.name;
  productTitleContainer.classList.add("product-title");
  productTitleContainer.appendChild(productTitle);

  productText.innerHTML = `<span>${product.discountPrice} MZN</span> ${product.price} MZN`;
  productTextContainer.classList.add("product-text");
  productTextContainer.appendChild(productText);

  productContent.classList.add("product-content");
  productContent.appendChild(productTitleContainer);
  productContent.appendChild(productTextContainer);

  //Add to cart button
  addToCartBtn.id = product.id;
  addToCartBtn.classList.add("btn");
  addToCartBtn.classList.add("btn-primary");
  addToCartBtn.classList.add("link-cart");
  addToCartBtn.classList.add("add-to-cart");
  addToCartBtn.innerHTML = `<i class="fa fa-shopping-cart" aria-hidden="true"></i> Adicionar ao Carrinho`;
  productContent.appendChild(addToCartBtn);
  addToCartBtn.addEventListener("click", () => {
    addProductToCart(addToCartBtn.id, product.price, 1);
  });

  /**
   * APPENDING TO HTML
   */
  productBox.appendChild(imgContainer);
  productBox.appendChild(productContent);
  productContainer.appendChild(productBox);
  productSection.appendChild(productContainer);
}

/**
 * I'm So sorry, But it's  a big mass, happy E-Commerce :)
 */
function setProductWithoutDiscount(product) {
  const productSection = document.getElementsByClassName(
    "products-section-blz"
  )[0];
  //   const product = products[0];
  const productContainer = document.createElement("div");
  const productBox = document.createElement("div");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");
  const productContent = document.createElement("div");
  const productTitleContainer = document.createElement("div");
  const productTitle = document.createElement("h2");
  const productTextContainer = document.createElement("div");
  const productText = document.createElement("p");
  const addToCartBtn = document.createElement("a");

  //Adding classes to the product container
  productContainer.classList.add("col-lg-4");
  productContainer.classList.add("product-item");
  productContainer.classList.add("col-md-6");
  //Adding classes to product box
  productBox.classList.add("carvally-single-products-box");

  //Image container and image
  image.src = product.image;
  image.alt = "Imagem de um produto";
  imgContainer.classList.add("carvally-prosucts-thumb2");
  imgContainer.id = product.id;
  imgContainer.appendChild(image);

  imgContainer.addEventListener("click", () => {
    localStorage.setItem("productPreviewId", product.id);
    location.href = "products-details.html";
  });

  //Product Content, title and text
  productTitle.innerText = product.name;
  productTitleContainer.classList.add("product-title");
  productTitleContainer.appendChild(productTitle);

  productText.innerText = `${product.price} MZN`;
  productTextContainer.classList.add("product-text");
  productTextContainer.appendChild(productText);

  productContent.classList.add("product-content");
  productContent.appendChild(productTitleContainer);
  productContent.appendChild(productTextContainer);

  //Add to cart button
  addToCartBtn.classList.add("btn");
  addToCartBtn.id = product.id;
  addToCartBtn.classList.add("btn-primary");
  addToCartBtn.classList.add("link-cart");
  addToCartBtn.classList.add("add-to-cart");
  addToCartBtn.innerHTML = `<i class="fa fa-shopping-cart" aria-hidden="true"></i> Adicionar ao Carrinho`;
  productContent.appendChild(addToCartBtn);
  addToCartBtn.addEventListener("click", () => {
    addProductToCart(addToCartBtn.id, product.price, 1);
  });

  /**
   * APPENDING TO HTML
   */
  productBox.appendChild(imgContainer);
  productBox.appendChild(productContent);
  productContainer.appendChild(productBox);
  productSection.appendChild(productContainer);
}

/**
 * Adds a product to the localStorage
 * @param {*} productId id of the product
 * @param {*} productPrice price of the product
 * @param {*} quantity product quantity
 */
function addProductToCart(productId, productPrice, quantity) {
  const cart = localStorage.getItem("cart");
  if (cart === null) {
    const productItem = JSON.stringify([
      {
        id: productId,
        quantity: quantity,
        totalPrice: productPrice,
      },
    ]);
    localStorage.setItem("cart", productItem);
  } else {
    let isProductExists = false;
    let cartProducts = JSON.parse(cart);

    for (let i = 0; i < cartProducts.length; i++) {
      //Verifies if the current product to be added, already exists in the localStorage to incremment it
      if (cartProducts[i].id == productId) {
        cartProducts[i].quantity += quantity;
        cartProducts[i].totalPrice += productPrice;
        isProductExists = true;
        break;
      }
    }
    //Verifies if the product DOES NOT exist in the localStorage, to add this product as new
    if (!isProductExists) {
      cartProducts[cartProducts.length] = {
        id: productId,
        quantity: quantity,
        totalPrice: productPrice,
      };
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }
}
