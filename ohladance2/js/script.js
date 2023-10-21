document.getElementById("firstname").addEventListener("focusout", validateFirstName);
document.getElementById('birth-date').addEventListener("input", countAge);

function countAge() {
    let inputAge = document.getElementById("age");
    let inputDate = document.getElementById("birth-date");
    
    let selectedDate = new Date(inputDate.value);
    let currDate = new Date();

    let age = Math.floor((currDate - selectedDate)/(1000*3600*24*365.2425));
    inputAge.value = age;
    
}


function displayError(msg, errFieldId) {
    let err = document.getElementById(errFieldId);
    let input = document.getElementById('firstname');
    err.style.display = 'block';
    err.innerHTML = msg;
    input.style.border = '3px solid red';
}   

function hideError(errFieldId) {
    let err = document.getElementById(errFieldId);
    let input = document.getElementById('firstname');
    err.style.display = 'none';
    err.innerHTML = "";
    input.style.border = '';
}

function validateFirstName() {
    let firstname = document.getElementById('firstname');
    if (!firstname.value) {
        displayError("Vyplňte vaše meno.", 'err-firstname');
    } else {
        hideError('err-firstname');
    }
}

