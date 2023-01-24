var initPage = document.querySelector(".Accept-Conditions");
var checkBoxTYC = document.querySelector("#checkboxTYC");
var submitCheckedBtnValue = document.querySelector("#Checked-Btn-Value");

checkBoxTYC.addEventListener("change", () => {
  event.preventDefault();
  if (checkBoxTYC.value == "true") {
    checkBoxTYC.value = "false";
  } else {
    checkBoxTYC.value = "true";
  }
});

submitCheckedBtnValue.addEventListener("click", () => {
  event.preventDefault();
  if (checkBoxTYC.value == "true") {
    localStorage.setItem("T&C", "true");
    window.location.replace("./Diagnoster.html");
  } else {
    var initError = document.createElement("p");
    initError.textContent = "You need to accept the usage terms";
    initPage.appendChild(initError);
  }
});
