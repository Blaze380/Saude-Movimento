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

  imgContainer.addEventListener("click", () => {
    showProductDetails(product);
  });
  //Product Content, title and text
  productTitle.innerText = product.name;
  productTitleContainer.classList.add("product-title");
  productTitleContainer.appendChild(productTitle);

  productText.innerHTML = `<span>${product.discountPrice} MZN</span><br> ${product.price} MZN`;
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
  addToCartBtn.innerHTML = `<i class="fa fa-shopping-cart" aria-hidden="true"></i> Adicionar`;
  productContent.appendChild(addToCartBtn);
  addToCartBtn.addEventListener("click", () => {
    addProductToCart(addToCartBtn.id, product.price, 1);
    showAddToCartPopUp();
  });

  /**
   * APPENDING TO HTML
   */
  productBox.appendChild(imgContainer);
  productBox.appendChild(productContent);
  productContainer.appendChild(productBox);
  productSection.appendChild(productContainer);
}

function showAddToCartPopUp() {
  const removedProductPopUpContainer = document.getElementsByClassName(
    "removed-product-popup"
  )[0];
  removedProductPopUpContainer.style.animation = "bounceInRight 1s";
  removedProductPopUpContainer.style.transform = "translateX(0)";
  closeAddToCartPopUp();
}
function closeAddToCartPopUp() {
  let isClosed = false;
  const removedProductPopUpContainer = document.getElementsByClassName(
    "removed-product-popup"
  )[0];
  const removedProductPopUpBtn = document.getElementById(
    "removed-product-popup-btn"
  );
  removedProductPopUpBtn.addEventListener("click", () => {
    location.href = "cart.html";
    isClosed = true;
  });
  if (isClosed == false) {
    setTimeout(() => {
      removedProductPopUpContainer.style.animation = "bounceOutRight 1s";
      setTimeout(() => {
        removedProductPopUpContainer.style.transform = "translateX(100vw)";
      }, 1000);
    }, 2000);
  }
}

/**
 * I'm So sorry, But it's  a big mass, happy E-Commerce :)
 */
function setProductWithoutDiscount(product) {
  const productSection = document.getElementsByClassName(
    "products-section-blz"
  )[0];
  // const product1 = products[0];
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
    showProductDetails(product);
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
  addToCartBtn.innerHTML = `<i class="fa fa-shopping-cart" aria-hidden="true"></i> Adicionar`;
  productContent.appendChild(addToCartBtn);
  addToCartBtn.addEventListener("click", () => {
    addProductToCart(addToCartBtn.id, product.price, 1);
    showAddToCartPopUp();
  });

  /**
   * APPENDING TO HTML
   */
  productBox.appendChild(imgContainer);
  productBox.appendChild(productContent);
  productContainer.appendChild(productBox);
  productSection.appendChild(productContainer);
}
function showProductDetails(product) {
  // const product = products[0];
  const currentImg = document.getElementById("current-image");
  const previewImg1 = document.getElementById("img1");
  const previewImg2 = document.getElementById("img2");
  const previewImg3 = document.getElementById("img3");
  const productTitle = document.getElementById("product-details-title");
  const productPrice = document.getElementById("product-details-price");
  productTitle.innerText = product.name;
  currentImg.src = product.image;
  previewImg1.src = product.image;
  previewImg2.src = product.image1;
  previewImg3.src = product.image2;
  if (product.isDiscount) {
    productPrice.innerHTML = `${product.discountPrice} MZN <span>${product.price}MZN</span>`;
  } else {
    productPrice.innerText = `${product.price} MZN`;
  }
  showProductDetailsSection(product.id, product.price);
}
function showProductDetailsSection(productId, productPrice) {
  const closeBtn = document.getElementById("close-product-details-btn");
  const productDetailsContainer = document.getElementsByClassName(
    "product-details-container"
  )[0];
  productDetailsContainer.style.display = "block";
  const productDetails = document.getElementsByClassName("product-details")[0];
  productDetails.style.animation = "zoomIn 1s";

  closeBtn.addEventListener("click", () => {
    productDetails.style.animation = "zoomOut 1s";
    setTimeout(() => {
      productDetailsContainer.style.display = "none";
    }, 700);
  });
  setProductDetailsEvents(productId, productPrice);
}
function setProductDetailsEvents(productId, productPrice) {
  const productQuantity = document.getElementById("product-quantity");
  const addToCartBtn = document.getElementById("add-to-cart-details");
  addToCartBtn.addEventListener("click", () => {
    const quantity = parseInt(productQuantity.value);
    const price = productPrice * quantity;
    addProductToCart(productId, price, quantity);
    showAddToCartPopUp();
  });
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
