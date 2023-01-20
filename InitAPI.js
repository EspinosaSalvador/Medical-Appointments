var checkBox = document.querySelector('#checkbox');

checkBox.addEventListener('change',()=>{
    event.preventDefault();
    if (checkBox.value == 'true'){
        checkBox.value = 'false';
        console.log(checkBox.value);
    }
    else{
        checkBox.value = 'true';
        console.log(checkBox.value);
    }
})

function InitSession(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed',
            'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
        }
    };

    fetch('https://endlessmedicalapi1.p.rapidapi.com/InitSession', options)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            acceptTermsOfUse(data.SessionID);
            if (checkBox.value == 'true'){
                useDefaulValues(data.SessionID);
            }
        })
        .catch(err => console.error(err));
}

function acceptTermsOfUse(SessionID){
    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'd0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed',
            'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
        }
    };
    
    fetch('https://endlessmedicalapi1.p.rapidapi.com/AcceptTermsOfUse?SessionID='+ SessionID +'&passphrase=I%20have%20read%2C%20understood%20and%20I%20accept%20and%20agree%20to%20comply%20with%20the%20Terms%20of%20Use%20of%20EndlessMedicalAPI%20and%20Endless%20Medical%20services.%20The%20Terms%20of%20Use%20are%20available%20on%20endlessmedical.com', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function updateFeature(SessionID){
    const options = {
	method: 'POST',
	headers: {
		'X-RapidAPI-Key': 'd0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed',
		'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
	}};

    fetch('https://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID='+ SessionID +'&name=Age&value=26', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function updateFeature(SessionID){
    const options = {
	method: 'POST',
	headers: {
		'X-RapidAPI-Key': 'd0ed215756mshcea412ef2c15fa9p1f031djsn0097fd11a4ed',
		'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
	}};

    fetch('https://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID='+ SessionID +'&name=Age&value=26', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

InitSession();








