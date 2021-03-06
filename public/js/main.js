// Dynamic ShowCase v1.0.0-alpha (https://github.com/Ch3ssMaster/dynamic_showcase)
// Copyright 2020 Antonio Cebrián Mesa
// Licensed under MIT (https://github.com/Ch3ssMaster/dynamic_showcase/blob/master/LICENSE.md)
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  getYear();
  var homeTab = document.querySelector("#home-tab");
  var profileTab = document.querySelector("#profile-tab");
  // console.log(homeTab);
  // console.log(profileTab);
  // homeTab.addEventListener("click", toggleUpdateUser(true));
  // profileTab.addEventListener("click", toggleUpdateUser(false));
}
function getYear() {
  var year = new Date();
  document.getElementById("date").innerHTML += year.getFullYear();
}

function toggleUpdateUser(changeUserData) {
  // var hidden = document.querySelector('[name=updateUserData]');
  // console.log(hidden);
  if (changeUserData === "home-tab") {
    //Enable update user data
    document.querySelector("#newPassword").disabled = true;
    document.querySelector("#newName").disabled = false;
    document.querySelector("#newLastname").disabled = false;
    document.querySelector('[name=updateUserData]').value = true;
  } else {
    //Disable update user data
    document.querySelector("#newPassword").disabled = false;
    document.querySelector("#newName").disabled = true;
    document.querySelector("#newLastname").disabled = true;
    document.querySelector('[name=updateUserData]').value = false;
  }
}

$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
  toggleUpdateUser(e.target.getAttribute("id")); // newly activated tab
});