// bitGames v1.0.0-alpha (https://github.com/Ch3ssMaster/bitgames)
// Copyright 2021 Antonio Cebrián Mesa
// Licensed under MIT (https://github.com/Ch3ssMaster/bitgames/blob/main/LICENSE)

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  getYear();

  var addToCartButtons = document.getElementsByClassName(
    "btn btn-lg btn-block btn-danger"
  );
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
  var showPassword = document.querySelectorAll('[data-show="password"]');
  // console.log(showPassword);

  for (var i = 0; i < showPassword.length; i++) {
    var button = showPassword[i];
    button.addEventListener("click", togglePassword);
  }

  document.getElementById("empty-cart").addEventListener("click", emptyCart);
  document
    .getElementById("btn-purchase")
    .addEventListener("click", purchaseClicked);
  document.getElementById("toggleLogin").addEventListener("click", toggleLogin);
}
function getYear() {
  var year = new Date();
  document.getElementById("date").innerHTML += year.getFullYear();
}
function toggleLogin() {
  let buttonText = document.querySelector("#toggleLogin").innerText;
  if (buttonText == "Create Account") {
    // set name attribute for login form
    document.querySelector("#loginForm").setAttribute("name", "register");

    //disable login form
    document.querySelector("#newEmail").disabled = true;
    document.querySelector("#inputLoginPassword").disabled = true;
    //enable registry form
    document.querySelector("#username").disabled = false;
    document.querySelector("#lastname").disabled = false;
    document.querySelector("#email").disabled = false;
    document.querySelector("#inputPassword").disabled = false;
    document.querySelector("#inputPassword2").disabled = false;
    //change form data
    document.querySelector("#toggleLogin").innerText = "Login";
    document
      .querySelector("#toggleLogin")
      .classList.remove("btn-outline-primary");
    document.querySelector("#toggleLogin").classList.add("btn-primary");
    document.querySelector("#goLogin").innerText = "Register";
    document.querySelector("#loginModalLabel").innerText = "New User";
  } else {
    // set name attribute for login form
    document.querySelector("#loginForm").setAttribute("name", "login");

    //enable login form
    document.querySelector("#newEmail").disabled = false;
    document.querySelector("#inputLoginPassword").disabled = false;
    //disable registry form
    document.querySelector("#username").disabled = true;
    document.querySelector("#lastname").disabled = true;
    document.querySelector("#email").disabled = true;
    document.querySelector("#inputPassword").disabled = true;
    document.querySelector("#inputPassword2").disabled = true;
    //change form data
    document.querySelector("#loginModalLabel").innerText = "Login";
    document.querySelector("#toggleLogin").innerText = "Create Account";
    document.querySelector("#toggleLogin").classList.remove("btn-primary");
    document.querySelector("#toggleLogin").classList.add("btn-outline-primary");
    document.querySelector("#goLogin").innerText = "Login";
    document.querySelector("#goLogin").innerText = "Login";
  }
}
function togglePassword(event) {
  let element = event.target.closest("button");
  let elementTarget = element.getAttribute("data-target");
  // console.log(element.innerHTML);
  let newElement = document.getElementById(elementTarget);
  let type = newElement.getAttribute("type");
  if (type == "password") {
    newElement.setAttribute("type", "text");
    element.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    element.innerHTML = '<i class="fas fa-eye"></i>';
    newElement.setAttribute("type", "password");
  }
}

document.getElementById("cart").onclick = function () {
  this.classList.remove("hvr-pulse");
};
function toggleShoppingControls(enable) {
  if (enable) {
    document.getElementById("empty-cart").classList.remove("disabled");
    document.getElementById("btn-purchase").classList.remove("disabled");
    document.getElementById("btn-purchase").classList.add("hvr-pulse");
  } else {
    document.getElementById("empty-cart").classList.add("disabled");
    document.getElementById("btn-purchase").classList.add("disabled");
    document.getElementById("btn-purchase").classList.remove("hvr-pulse");
  }
}

function emptyCart() {
  let node = (document.getElementsByTagName("tbody")[0].innerHTML = "");
  updateCartTotal();
  toggleShoppingControls(false);
}

function purchaseClicked() {
  let node = (document.getElementsByTagName("tbody")[0].innerHTML = "");
  updateCartTotal();
  toggleShoppingControls(false);
  $("#cartPurchased").modal("show");
  setTimeout(function () {
    $("#cartPurchased").modal("hide");
  }, 2000);
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  var numRow = buttonClicked.parentNode.parentNode.parentNode.getAttribute(
    "row-number"
  );
  document.getElementById(numRow).remove();
  var numItemsAdded = document.getElementsByTagName("tbody")[0]
    .childElementCount;
  if (numItemsAdded == 0) {
    toggleShoppingControls(false);
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentNode.parentNode;
  var productId = shopItem.getAttribute("product-id");
  var title = shopItem.querySelector("img").getAttribute("alt");
  var price = shopItem.querySelector("small").innerText.replace(" €", "");
  var imageSrc = shopItem.querySelector("img").src;
  var imageSrc = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  addItemToCart(productId, title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(productId, title, price, imageSrc) {
  var cartRow = document.createElement("tr");
  var rowId = "row-number-" + productId;
  cartRow.setAttribute("id", rowId);
  var cartItems = document
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].getAttribute("id") == rowId) {
      $("#alreadyAddedToCart").modal("show");
      setTimeout(function () {
        $("#alreadyAddedToCart").modal("hide");
      }, 2500);
      return;
    }
  }
  var itemsAdded = cartItems.length + 1;
  var cartRowContents = `<th scope="row">${itemsAdded}</th>
        <td>
           <div class="card border-success mb-3 text-center">
              <div class="card-body text-success">
                 <img src="/img/${imageSrc}" alt="${title}" class="img-thumbnail">
              </div>
              <div class="card-footer bg-transparent border-success">${title}</div>
           </div>
        </td>
        <td>
           <h4 class="card-title pricing-card-title">${price} <small class="text-muted"> €</small></h4>
        </td>
        <td>
           <div class="row">
              <div class="quantity col-md-6">
                 <input class="form-control rounded-sm text-dark border-info" type="number" min="1" max="10"
                    step="1" value="1" row-number="${rowId}">
                 <div class="quantity-nav">
                    <div class="quantity-button quantity-up border-info">
                       <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up-circle-fill text-warning" fill="currentColor" xmlns="http:www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-10.646.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"/>
                       </svg>
                    </div>
                    <div class="quantity-button quantity-down border-info">
                       <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-circle-fill text-warning" fill="currentColor" xmlns="http:www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"/>
                       </svg>
                    </div>
                 </div>
              </div>
              <div class="text-center col-md-6">
                 <button type="button" class="btn btn-link text-danger mt-2" row-number="${rowId}">
                    <span>
                       <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill"
                          fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                             d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z" />
                       </svg>
                    </span>
                 </button>
              </div>
           </div>
        </td>`;
  cartRow.innerHTML = cartRowContents;
  document.getElementsByTagName("tbody")[0].appendChild(cartRow);
  // return
  cartRow
    .getElementsByClassName("btn btn-link text-danger mt-2")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("form-control rounded-sm text-dark border-info")[0]
    .addEventListener("change", updateCartTotal());
  cartRow
    .getElementsByClassName("form-control rounded-sm text-dark border-info")[0]
    .addEventListener("input", () => {
      updateCartTotal();
    });
  var quantityUp = cartRow.getElementsByClassName("quantity-up");
  quantityUp[0].addEventListener("click", () => {
    let input = quantityUp[0].parentNode.parentNode.firstChild.nextSibling;
    let max = input.getAttribute("max");
    let min = input.getAttribute("min");
    var oldValue = parseFloat(input.value);
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    input.value = newVal;
    updateCartTotal();
  });
  var quantityDown = cartRow.getElementsByClassName("quantity-down");
  quantityDown[0].addEventListener("click", () => {
    let input = quantityDown[0].parentNode.parentNode.firstChild.nextSibling;
    let max = input.getAttribute("max");
    let min = input.getAttribute("min");
    var oldValue = parseFloat(input.value);
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    input.value = newVal;
    updateCartTotal();
  });

  document.getElementById("cart").classList.add("hvr-pulse");
  if (itemsAdded == 1) {
    toggleShoppingControls(true);
  }
  $("#addedToCart").modal("show");
  setTimeout(function () {
    $("#addedToCart").modal("hide");
  }, 1800);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByTagName("table")[0];
  var cartPrices = cartItemContainer.getElementsByClassName(
    "card-title pricing-card-title"
  );
  var cartQuantities = cartItemContainer.getElementsByClassName(
    "form-control rounded-sm text-dark border-info"
  );
  var total = 0;
  for (var i = 0; i < cartPrices.length; i++) {
    var price = cartPrices[i].textContent;
    var quantity = cartQuantities[i].value;
    price = parseFloat(price.replace(" € / Kg", ""));
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementById("total-count").innerText = total;
}

// Make items draggables

const list_items = document.querySelectorAll(".draggable");
const cart = document.querySelector("#cart");
let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
  const item = list_items[i];

  item.addEventListener("dragstart", function () {
    draggedItem = item;
    setTimeout(function () {
      item.style.opacity = "0.5";
    }, 200);
  });

  item.addEventListener("dragend", function () {
    setTimeout(function () {
      draggedItem.style.opacity = "1";
      draggedItem = null;
    }, 200);
  });
}

// Make drop into cart

cart.addEventListener("dragover", function (e) {
  e.preventDefault();
});

cart.addEventListener("dragenter", function (e) {
  e.preventDefault();
});

// cart.addEventListener('dragleave', function (e) {
// });

cart.addEventListener("drop", function (e) {
  this.classList.add("hvr-pulse");
  var productId = draggedItem.getAttribute("product-id");
  var title = draggedItem.firstChild.getAttribute("alt");
  var productName = draggedItem.firstChild.nextSibling.nextSibling.textContent;
  var price = draggedItem.firstChild.nextSibling.firstChild.innerText.replace(
    " € / Kg",
    ""
  );
  var imageSrc = draggedItem.firstChild.src;
  addItemToCart(productId, title, productName, price, imageSrc);
  updateCartTotal();
});
