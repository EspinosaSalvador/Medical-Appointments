var initPage = document.querySelector(".Accept-Conditions");
var checkBox = document.querySelector("#checkbox");
var submitCheckedBtnValue = document.querySelector("#Checked-Btn-Value");

checkBox.addEventListener("change", () => {
  event.preventDefault();
  if (checkBox.value == "true") {
    checkBox.value = "false";
  } else {
    checkBox.value = "true";
  }
});

submitCheckedBtnValue.addEventListener("click", () => {
  event.preventDefault();
  if (checkBox.value == "true") {
    localStorage.setItem("T&C", "true");
    window.location.replace("./Diagnoster.html");
  } else {
    var initError = document.createElement("p");
    initError.textContent = "You need to accept the usage terms";
    initPage.appendChild(initError);
  }
});
