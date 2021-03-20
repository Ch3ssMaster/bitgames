// bitGames v1.0.0-alpha (https://github.com/Ch3ssMaster/bitgames)
// Copyright 2021 Antonio Cebrián Mesa
// Licensed under MIT (https://github.com/Ch3ssMaster/bitgames/blob/main/LICENSE.md)

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // Updates img after it is loaded by input[type=file]
  let gameCover = document.querySelector("#fileInput");
  if (gameCover) {
    gameCover.addEventListener("change", (e) => {
      handleFileSelect(e);
    });
  }

  let showPassword = document.querySelectorAll('[data-show="password"]');
  if (showPassword) {
    for (var i = 0; i < showPassword.length; i++) {
      var button = showPassword[i];
      button.addEventListener("click", togglePassword);
    }
  }
  let toggleLoginButton = document.getElementById("toggleLogin");
  if (toggleLoginButton) {
    toggleLoginButton.addEventListener("click", toggleLogin);
  }
  let validatePass = document.querySelector('input[name="inputPassword"]');
  if (validatePass) {
    validatePass.addEventListener("input", (e) => {
      validatePassword();
    });
  }
  let checkSecondPass = document.querySelector('input[name="inputPassword2"]');
  if (checkSecondPass) {
    checkSecondPass.addEventListener("input", (e) => {
      validatePassword();
    });
    checkSecondPass.addEventListener("change", (e) => {
      validatePassword();
    });
  }
  let uploadIcon = document.getElementById("uploadIcon");
  if (uploadIcon) {
    uploadIcon.addEventListener("click", (e) => {
      document.querySelector("#fileInput").click();
    });
  }
  let uploadButton = document.getElementById("uploadButton");
  if (uploadButton) {
    uploadButton.addEventListener("click", (e) => {
      document.querySelector("#fileInput").click();
    });
  }

  // validatePassword();
  getYear();
}

// Show loaded img for products
if (window.FileReader) {
  function handleFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();

    reader.onload = (function (uploadedImg) {
      let changeSrcImg = (e) => {
        let img = document.querySelector("#game-cover-img");
        if (img) {
          img.setAttribute("src", e.target.result);
          img.setAttribute("title", uploadedImg.name);
        }
      };
      return changeSrcImg;
    })(f);

    reader.readAsDataURL(f);
  }
} else {
  alert("This browser does not support FileReader");
}

function getYear() {
  var year = new Date();
  document.getElementById("date").innerHTML += year.getFullYear();
}

function validatePassword() {
  let toValidate = document.querySelector("#inputPassword");
  let toShow = document.querySelector("#passwordHelpBlock");
  let rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
  if (toValidate.value.match(rule)) {
    toShow.classList.add("d-none");
    if (checkPasswordMatch()) {
      document.querySelector("#goLogin").disabled = false;
      return true;
    } else {
      document.querySelector("#goLogin").disabled = true;
      return false;
    }
  } else {
    document.querySelector("#goLogin").disabled = true;
    toShow.classList.remove("d-none");
    checkPasswordMatch();
    return false;
  }
}

function checkPasswordMatch() {
  var toValidate = document.querySelector('input[name="inputPassword2"]').value;
  let toCompare = document.querySelector('input[name="inputPassword"]').value;
  let toShow = document.querySelector("#passwordHelpBlock2");
  if (toValidate != toCompare) {
    toShow.classList.remove("d-none");
    return false;
  } else {
    // document.querySelector("#goLogin").disabled = false;
    toShow.classList.add("d-none");
    return true;
  }
}

function toggleUpdateUser(changeUserData) {
  // var hidden = document.querySelector('[name=updateUserData]');
  // console.log(hidden);
  if (changeUserData === "home-tab") {
    //Enable update user data
    document.querySelector("#newPassword").disabled = true;
    document.querySelector("#newName").disabled = false;
    document.querySelector("#newLastname").disabled = false;
    document.querySelector("[name=updateUserData]").value = true;
  } else {
    //Disable update user data
    document.querySelector("#newPassword").disabled = false;
    document.querySelector("#newName").disabled = true;
    document.querySelector("#newLastname").disabled = true;
    document.querySelector("[name=updateUserData]").value = false;
  }
}

$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
  toggleUpdateUser(e.target.getAttribute("id")); // newly activated tab
});

function toggleLogin() {
  let buttonText = document.querySelector("#toggleLogin").innerText;
  if (buttonText == "Create Account") {
    // set name attribute for login form
    document.querySelector("#loginForm").setAttribute("name", "register");

    //disable login form
    if (!validatePassword()) {
      document.querySelector("#goLogin").disabled = true;      
    }
    document.querySelector("#email").disabled = true;
    document.querySelector("#inputLoginPassword").disabled = true;
    //enable registry form
    document.querySelector("#username").disabled = false;
    document.querySelector("#lastname").disabled = false;
    document.querySelector("#newEmail").disabled = false;
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
    document.querySelector("#goLogin").disabled = false;
    document.querySelector("#email").disabled = false;
    document.querySelector("#inputLoginPassword").disabled = false;
    //disable registry form
    document.querySelector("#username").disabled = true;
    document.querySelector("#lastname").disabled = true;
    document.querySelector("#newEmail").disabled = true;
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
