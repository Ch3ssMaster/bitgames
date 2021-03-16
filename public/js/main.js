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
  validatePassword();
  checkPasswordMatch();
  const validatePass = document.querySelector('input[name="inputPassword"]');
  const checkSecondPass = document.querySelector(
    'input[name="inputPassword2"]'
  );
  validatePass.addEventListener("input", (e) => {
    validatePassword();
  });
  checkSecondPass.addEventListener("input", (e) => {
    checkPasswordMatch();
  });
  checkSecondPass.addEventListener("change", (e) => {
    checkPasswordMatch();
  });
  var homeTab = document.querySelector("#home-tab");
  var profileTab = document.querySelector("#profile-tab");
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
    // document.querySelector("#goLogin").disabled = false;
  } else {
    toShow.classList.remove("d-none");
    document.querySelector("#goLogin").disabled = true;
  }
  checkPasswordMatch();
}

function checkPasswordMatch() {
  var toValidate = document.querySelector('input[name="inputPassword2"]').value;
  let toCompare = document.querySelector('input[name="inputPassword"]').value;
  let toShow = document.querySelector("#passwordHelpBlock2");
  if (toValidate != toCompare) {
    toShow.classList.remove("d-none");
    document.querySelector("#goLogin").disabled = true;
  } else {
    document.querySelector("#goLogin").disabled = false;
    toShow.classList.add("d-none");
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
