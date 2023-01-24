//First API Variables
var checkBox = document.querySelector("#checkbox");
var btnAddSymptom = document.querySelector(".Add-Features");
var availableFeatures = document.querySelector(".AvailableFeatures");
const symptomsRequest = fetch("./SymptomsOutput.json");
var selectedUserFeatures = document.querySelector(".user-features");
var defaultTextInUserFeaturesCard = document.querySelector(
  ".DefaultText-userFeaturesCard"
);
var analyzeBtn = document.querySelector(".analyzeProcessBTN");
var displayDiseasesOutput = document.querySelector(".displayDisease");
var TermsAndConditions = localStorage.getItem("T&C");
var diagnosticatedDisease = localStorage.getItem("Disease");

//Second API Variables
var input = document.querySelector(".form-control");
var searchbutton = document.querySelector("#SubmitButton");
var urllist = document.querySelector("#URL");

checkBox.addEventListener("change", () => {
  event.preventDefault();
  if (checkBox.value == "true") {
    checkBox.value = "false";
  } else {
    checkBox.value = "true";
  }
  InitSession();
});

function displayAddSymptomsCard(SessionID) {
  btnAddSymptom.addEventListener("click", () => {
    symptomsRequest
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const symptomNames = data.map((item) => item.text);
        for (var element in symptomNames) {
          var displayFeature = document.createElement("a");
          displayFeature.textContent = symptomNames[element];
          displayFeature.setAttribute("class", element);
          availableFeatures.appendChild(displayFeature);

          displayFeature.addEventListener("click", (element) => {
            document.getElementById("mySidebar").style.width = "0";

            if (
              selectedUserFeatures.children[0].innerHTML == "Add some features"
            ) {
              selectedUserFeatures.innerHTML = "";
            }
            displayUserFeatures(
              data,
              element.srcElement.attributes.class.textContent,
              SessionID
            );
          });
        }
      });
  });
}

function displayUserFeatures(objectData, indexFeature, SessionID) {
  var createEachFeatureElement = document.createElement("div");

  if (
    objectData[indexFeature].type == "integer" ||
    objectData[indexFeature].type == "double"
  ) {
    createEachFeatureElement.innerHTML =
      "<p>" +
      objectData[indexFeature].laytext +
      "</p>\
        <p>Type a number between " +
      objectData[indexFeature].min +
      " and " +
      objectData[indexFeature].max +
      "</p>";
    var inputFeatureElement = document.createElement("input");
    createEachFeatureElement.appendChild(inputFeatureElement);
    const btn2hearInput = document.createElement("button");
    btn2hearInput.setAttribute("type", "submit");
    btn2hearInput.textContent = "Submit";
    createEachFeatureElement.appendChild(btn2hearInput);

    btn2hearInput.addEventListener("click", () => {
      if (
        isNaN(inputFeatureElement.value) ||
        inputFeatureElement.value < objectData[indexFeature].min ||
        inputFeatureElement.value > objectData[indexFeature].max
      ) {
        var displayErrorInValue = document.createElement("p");
        displayErrorInValue.textContent = "Type a valid input!";
        createEachFeatureElement.appendChild(displayErrorInValue);
      } else {
        if (
          createEachFeatureElement.lastElementChild.textContent ==
          "Type a valid input!"
        ) {
          createEachFeatureElement.lastElementChild.textContent = "";
          updateFeature(
            SessionID,
            objectData[indexFeature].name,
            inputFeatureElement.value
          );
          var displaySelection = document.createElement("p");
          displaySelection.innerHTML =
            objectData[indexFeature].name + " : " + inputFeatureElement.value;
          createEachFeatureElement.appendChild(displaySelection);
        } else {
          updateFeature(
            SessionID,
            objectData[indexFeature].name,
            inputFeatureElement.value
          );
          var displaySelection = document.createElement("p");
          displaySelection.innerHTML =
            objectData[indexFeature].name + " : " + inputFeatureElement.value;
          createEachFeatureElement.appendChild(displaySelection);
        }
      }
    });
  }

  if (objectData[indexFeature].type == "categorical") {
    createEachFeatureElement.innerHTML =
      "<p>" + objectData[indexFeature].laytext + "</p>";
    for (var element in objectData[indexFeature].choices) {
      var selectedChoiceInFeature = document.createElement("button");
      selectedChoiceInFeature.innerHTML =
        objectData[indexFeature].choices[element].text;
      selectedChoiceInFeature.setAttribute("class", element);
      createEachFeatureElement.appendChild(selectedChoiceInFeature);

      selectedChoiceInFeature.addEventListener("click", (selectedChoice) => {
        updateFeature(
          SessionID,
          objectData[indexFeature].name,
          objectData[indexFeature].choices[
            selectedChoice.srcElement.attributes.class.value
          ].value
        );
        var displaySelection = document.createElement("p");
        displaySelection.innerHTML =
          objectData[indexFeature].name +
          " : " +
          objectData[indexFeature].choices[
            selectedChoice.srcElement.attributes.class.value
          ].laytext;
        createEachFeatureElement.appendChild(displaySelection);
      });
    }
  }

  selectedUserFeatures.appendChild(createEachFeatureElement);
}

//First API Call
function InitSession() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed",
      "X-RapidAPI-Host": "endlessmedicalapi1.p.rapidapi.com",
    },
  };

  fetch("https://endlessmedicalapi1.p.rapidapi.com/InitSession", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      acceptTermsOfUse(data.SessionID);
      if (checkBox.value == "true") {
        setUseDefaultValues(data.SessionID);
      }
      displayAddSymptomsCard(data.SessionID);
      analyze(data.SessionID);
    })
    .catch((err) => console.error(err));
}

function acceptTermsOfUse(SessionID) {
  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "d0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed",
      "X-RapidAPI-Host": "endlessmedicalapi1.p.rapidapi.com",
    },
  };

  if (TermsAndConditions) {
    fetch(
      "https://endlessmedicalapi1.p.rapidapi.com/AcceptTermsOfUse?SessionID=" +
        SessionID +
        "&passphrase=I%20have%20read%2C%20understood%20and%20I%20accept%20and%20agree%20to%20comply%20with%20the%20Terms%20of%20Use%20of%20EndlessMedicalAPI%20and%20Endless%20Medical%20services.%20The%20Terms%20of%20Use%20are%20available%20on%20endlessmedical.com",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
}

function updateFeature(SessionID, name, value) {
  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "d0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed",
      "X-RapidAPI-Host": "endlessmedicalapi1.p.rapidapi.com",
    },
  };

  fetch(
    "https://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID=" +
      SessionID +
      "&name=" +
      name +
      "&value=" +
      value,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}git 

function setUseDefaultValues(SessionID) {
  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "d0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed",
      "X-RapidAPI-Host": "endlessmedicalapi1.p.rapidapi.com",
    },
  };

  fetch(
    "https://api.endlessmedical.com/v1/dx/SetUseDefaultValues?SessionID=" +
      SessionID +
      "&value=true",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

function analyze(SessionID) {
  analyzeBtn.addEventListener("click", () => {
    event.preventDefault();
    const options = {
      method: "GET",
    };

    fetch(
      "https://api.endlessmedical.com/v1/dx/Analyze?SessionID=" +
        SessionID +
        "&NumberOfResults=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        var setLocalStorageDisease = Object.keys(
          data.Diseases[0]
        ).toLocaleString(); //change
        localStorage.setItem("Disease", setLocalStorageDisease); //change
        // diagnosticatedDisease es la variable que devuelve el diagnostico de la api utilizada.
        diagnosticatedDisease = localStorage.getItem("Disease"); // change
        displayDiseasesOutput.innerHTML =
          "You may have:  " + diagnosticatedDisease; // change
      })
      .catch((err) => console.error(err));
  });
}

InitSession();
if (diagnosticatedDisease == null){
  displayDiseasesOutput.innerHTML = '';
}
else{
  displayDiseasesOutput.innerHTML = "You may have:  " + diagnosticatedDisease;
}

//Second API Search Function
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "26b0a498f5msh74e273f1c1aa05fp19c98djsn09d2bf6637aa",
    "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
  },
};

//Function to obtain the search API, second API
function searchAPI() {
  fetch(
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=" +
      input.value +
      "&pageNumber=1&pageSize=10&autoCorrect=true",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //Show values from the API and append them into the HTML Page
      for (var y = 0; y < 10; y++) {
        var searchresults = data.value[y].title;
        var urllink = data.value[y].url;

        var link = document.createElement("a");
        link.setAttribute("href", data.value[y].url);

        var titleEL = document.createElement("span");
        titleEL.textContent = data.value[y].url;

        link.appendChild(titleEL);

        var newDiv = document.createElement("div");

        var searchresultsspan = document.createElement("span");

        searchresultsspan.textContent = searchresults;

        link.appendChild(searchresultsspan);

        newDiv.appendChild(searchresultsspan);
        newDiv.appendChild(link);

        urllist.appendChild(newDiv);
      }
    })
    .catch((err) => console.error(err));
}

//Call the search API when the search button is clicked
searchbutton.addEventListener("click", searchAPI);


