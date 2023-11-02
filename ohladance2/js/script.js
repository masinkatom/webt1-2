document.getElementById("firstname").addEventListener("focusout", validateFirstName);
document.getElementById("firstname").addEventListener("input", countNameLen);

document.getElementById("surname").addEventListener("focusout", validateSurName);
document.getElementById("surname").addEventListener("input", countNameLen);

document.getElementById("mail").addEventListener("focusout", validateEmail);
document.getElementById("mail").addEventListener("input", countEmailLen);

document.getElementById("phone").addEventListener("focusout", validatePhone);
document.getElementById("phone").addEventListener("input", countPhoneLen);

document.getElementById("driver-amount").addEventListener("input", validateNumberOnly);
document.getElementById("driver-amount").addEventListener("focusout", validateAmount);

document.getElementById("message").addEventListener("focusout", removeMessageCount);
document.getElementById("message").addEventListener("input", countMessageLen);

document.getElementById('birth-date').addEventListener("input", countAge);
document.getElementById('birth-date').addEventListener("focusout", validateDate);

document.getElementById("check-price").addEventListener("click", checkValues);

document.getElementById("sk-part").addEventListener("change", selectPart);
document.getElementById("sk-part").addEventListener("focusout", validateTrack);
document.getElementById("sk-region").addEventListener("change", selectRegion);
document.getElementById("sk-region").addEventListener("focusout", validateTrack);
document.getElementById("sk-track").addEventListener("focusout", validateTrack);

document.getElementById("drive-length").addEventListener("focusout", validateDriveLen);

document.getElementById("equipment1").addEventListener("change", checkboxToRadioButton);
document.getElementById("equipment2").addEventListener("change", checkboxToRadioButton);
document.getElementById("equipment3").addEventListener("change", checkboxToRadioButton);

document.getElementById("balaclava-new").addEventListener("input", validateNumberOnly);
document.getElementById("balaclava-used").addEventListener("input", validateNumberOnly);
document.getElementById("gloves").addEventListener("input", validateNumberOnly);

document.getElementById("whoami").addEventListener("click", showName);

setDefaults();

function setDefaults() {
    document.getElementById("equipment1").checked = false;
    document.getElementById("equipment2").checked = false;
    document.getElementById("equipment3").checked = false;
}




function countAge() {
    let inputAge = document.getElementById("age");
    let inputDate = document.getElementById("birth-date");

    let selectedDate = new Date(inputDate.value);
    let currDate = new Date();

    let age = Math.floor((currDate - selectedDate) / (1000 * 3600 * 24 * 365.2425));
    if (age < 0) {
        age = 0;
    }
    inputAge.value = age;

}


function displayError(input, msg, errInput) {
    errInput.style.display = 'block';
    errInput.innerHTML = msg;
    input.style.border = '3px solid red';
}

function hideError(input, errInput) {
    errInput.style.display = 'none';
    errInput.innerHTML = "";
    input.style.border = '';
}

function validateInput(inputId, errMessage, errInputId) {
    let input = document.getElementById(inputId);
    let errInput = document.getElementById(errInputId);

    if (input.value.trim() === "" || input.value == "null") {
        displayError(input, errMessage, errInput);
        return 1;
    } else {
        hideError(input, errInput);
        return 0;
    }
}

function validateFirstName() {

    let input = document.getElementById("firstname");

    hideCharCounter(input.nextElementSibling);
    let output = validateInput("firstname", "Vyplňte Vaše meno.", "err-firstname");

    return output;
}

function validateSurName() {

    let input = document.getElementById("surname");

    hideCharCounter(input.nextElementSibling);
    let output = validateInput("surname", "Vyplňte Vaše priezvisko.", "err-surname");


    return output;
}

function validateEmail() {

    let input = document.getElementById("mail");
    hideCharCounter(input.nextElementSibling);

    let output = validateInput("mail", "Zadajte Vašu emailovú adresu.", "err-mail");
    let errInput = document.getElementById("err-mail");

    if (output == 0) {
        let email = input.value;

        let emailRegex = /^[^\s@]{3,}@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            displayError(mail, "Zadajte správny formát emailovej adresy.", errInput);
            return 1;
        }
    }

    return output;

}

function validatePhone() {

    let input = document.getElementById("phone");
    hideCharCounter(input.nextElementSibling);

    let output = validateInput("phone", "Zadajte Vaše telefónne číslo.", "err-phone");
    let errInput = document.getElementById("err-phone");

    if (output == 0) {
        if (/^\d{8}$/.test(input.value) || /^\d{9}$/.test(input.value)) {
            return 0; // Valid
        } else {
            displayError(phone, "Zadajte správne tel. číslo.", errInput);
            return 1;
        }
    }
    return output;

}

function validateDate() {
    let output = validateInput("birth-date", "Zadajte Váš vek", "err-age");
    return output;
}

function validateTrack() {
    
    let output1 = validateInput("sk-part", "Vyberte jednu z možností.", "err-track");
    let output2 = validateInput("sk-region", "Vyberte jednu z možností.", "err-track");
    let output3 = validateInput("sk-track", "Vyberte jednu z možností.", "err-track");

    if ((output1 + output2 + output3) > 1) {
        return 1;
    }
    return 0;
}

function validateDriveLen() {
    let output = validateInput("drive-length", "Vyberte jednu z možností.", "err-length");
    return output;
}

function validateNumberOnly() {
    numberOnlyParse(this);
}

function validateAmount() {
    let input = document.getElementById("driver-amount");
    let errInput = document.getElementById("err-driver-amount");

    let output = validateInput("driver-amount", "Zadajte počet jazdcov.", "err-driver-amount");

    if (output == 0) {
        if (input.value < 1 || input.value > 8) {
            displayError(input, "Zadaj správny počet jazdcov.", errInput);
            return 1;
        }
    }

    return output;

}

function removeMessageCount() {

    let input = document.getElementById("message");
    hideCharCounter(input.nextElementSibling);
}

function numberOnlyParse(input) {
    input.value = input.value.replace(/\D/g, '');
}



function hideCharCounter(spanCounter) {
    spanCounter.style.display = "none";
}

function countLenght(spanCounter, input, countTo) {

    spanCounter.style.display = "flex";

    if (input.value.length > countTo) {
        input.value = input.value.substring(0, countTo);
    }

    spanCounter.textContent = input.value.length + " / " + countTo;
}

function countNameLen() {
    countLenght(this.nextElementSibling, this, 30);
}

function countEmailLen() {
    countLenght(this.nextElementSibling, this, 40);
}

function countPhoneLen() {
    numberOnlyParse(this);
    countLenght(this.nextElementSibling, this, 9);
}

function countMessageLen() {
    countLenght(this.nextElementSibling, this, 200);
}




function addElement(title, text) {
    let div = document.createElement("div");
    let elem = document.createElement("p");
    let h3 = document.createElement("h3");
    let divElement = document.getElementById("added-values");

    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";

    h3.textContent = title + ":";
    h3.style.paddingRight = "2rem";
    elem.textContent = text;

    div.appendChild(h3);
    div.appendChild(elem);
    divElement.appendChild(div);
}

function addOption(select, text, value) {
    let option = document.createElement("option");
    option.value = value;
    option.text = text;
    select.add(option);
}

function selectPart() {
    let inputPart = document.getElementById("sk-part");
    let inputRegion = document.getElementById("sk-region");
    let inputTrack = document.getElementById("sk-track");

    if (inputPart.value == "null" || inputPart.value == ""){
        inputRegion.style.display = "none";
        inputRegion.previousElementSibling.style.display = "none";
        inputTrack.style.display = "none";
        inputTrack.previousElementSibling.style.display = "none";
    }

    else {
        inputRegion.style.display = "block";
        inputRegion.previousElementSibling.style.display = "block";
    }

    inputRegion.innerHTML = "";
    inputTrack.innerHTML = "";
    

    switch (inputPart.value) {
        case "Východ":
            addOption(inputRegion, "-- Vyberte kraj --", "null");
            addOption(inputRegion, "Prešovský kraj", "Prešovský");
            addOption(inputRegion, "Košický kraj", "Košický");
            break;

        case "Stred":
            addOption(inputRegion, "-- Vyberte kraj --", "null");
            addOption(inputRegion, "Žilinský kraj", "Žilinský");
            addOption(inputRegion, "Banskobystrický kraj", "Banskobystrický");
            break;

        case "Západ":
            addOption(inputRegion, "-- Vyberte kraj --", "null");
            addOption(inputRegion, "Bratislavský kraj", "Bratislavský");
            addOption(inputRegion, "Trnavský kraj", "Trnavský");
            addOption(inputRegion, "Trenčiansky kraj", "Trenčiansky");
            addOption(inputRegion, "Nitriansky kraj", "Nitriansky");
            break;
    }
}

function selectRegion() {
    let inputRegion = document.getElementById("sk-region");
    let inputTrack = document.getElementById("sk-track");

    inputTrack.innerHTML = ""; 

    if (inputRegion.value == "null" || inputRegion.value == ""){
        inputTrack.style.display = "none";
        inputTrack.previousElementSibling.style.display = "none";
    }

    else {
        inputTrack.style.display = "block";
        inputTrack.previousElementSibling.style.display = "block";
    }

    switch (inputRegion.value) {
        case "Prešovský":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Motokáry Tatry", "PP-tatry");
            addOption(inputTrack, "Motokáry Šariš", "PO-šariš");
            addOption(inputTrack, "T1 Ring", "VT-T1");
            break;

        case "Košický":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Karting aréna Košice", "KE-arena");
            addOption(inputTrack, "Motokáry Strážske", "MI-strážske");
            break;

        case "Žilinský":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Motokáry Martin", "MA-martin");
            addOption(inputTrack, "Monaco Grand Prix", "LM-monaco");
            break;

        case "Banskobystrický":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Motokáry Sliač", "ZV-sliač");
            break;

        case "Bratislavský":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Kart 1 arena", "BA-Kart1");
            addOption(inputTrack, "Motokáry Max 60", "BA-Max60");
            break;

        case "Trnavský":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Slovakia Ring", "DS-Potôň");
            addOption(inputTrack, "Motokáry GoKartDS", "DS-GoKart");
            addOption(inputTrack, "Motokáry Dlhá", "TT-Dlhá");
            addOption(inputTrack, "Monza", "PN-Monza");
            addOption(inputTrack, "Motokáry Trebatice", "TT-Trebatice");
            break;

        case "Trenčiansky":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Volt Racing center", "TN-arena");
            break;

        case "Nitriansky":
            addOption(inputTrack, "-- Vyberte trať --", "null");
            addOption(inputTrack, "Fibo Karting", "NZ-Fibo");
            addOption(inputTrack, "Motokáry Nitra", "NR-Dlhá");
            addOption(inputTrack, "Speed Kart Center", "LV-Seč");
            break;

    }
}

function addEquipCounter(checkbox, placeholder, elementId) {
    let inputNumber = document.getElementById(elementId);
    inputNumber.placeholder = placeholder;

    if (checkbox.checked) {
        inputNumber.style.display = "block";
    }
    else {
        inputNumber.style.display = "none";
        inputNumber.value = "";
    }

}

function removeInputNum(inputCheck) {
    if (inputCheck.id == "equipment1") {
        let inputNumber = document.getElementById("balaclava-new");
        inputNumber.style.display = "none";
        inputNumber.value = "";
    }
    else {
        let inputNumber = document.getElementById("balaclava-used");
        inputNumber.style.display = "none";
        inputNumber.value = "";
    }
}

function checkboxToRadioButton() {
    let equip1 = document.getElementById("equipment1");
    let equip2 = document.getElementById("equipment2");
    let equip3 = document.getElementById("equipment3");
    let currEquip, otherEquip;

    if (this == equip1) {
        currEquip = equip1;
        otherEquip = equip2;
    }
    else {
        currEquip = equip2;
        otherEquip = equip1;
    }

    if (currEquip.checked) {
        otherEquip.checked = false;
        removeInputNum(otherEquip);

    }

    if (this == equip1) {
        addEquipCounter(equip1, "Počet kukiel", "balaclava-new");
    }
    else if (this == equip2) {
        addEquipCounter(equip2, "Počet kukiel", "balaclava-used");
    }
    if (this == equip3) {
        addEquipCounter(equip3, "Počet párov rukavíc", "gloves");
    }

}

function showName() {
    let inputName = document.getElementById("myName");

    if (inputName.style.display == "" || inputName.style.display == "none") {
        inputName.style.display = "block";

    }
    else {
        inputName.style.display = "none";
    }
}

function calculatePrice() {
    let price = 0;
    let equip1 = document.getElementById("equipment1");
    let equip2 = document.getElementById("equipment2");
    let equip3 = document.getElementById("equipment3");
    let balaclava = document.getElementById("balaclava-new");
    let balaclavaUsed = document.getElementById("balaclava-used");
    let gloves = document.getElementById("gloves");

    let drivers = document.getElementById("driver-amount");
    let dLength = document.getElementById("drive-length");

    
    if (dLength.value.substring(0, 2) == "10") {
        price += 10;
    }
    else {
        price += 15;
    }
    
    price *= drivers.value;
    
    if (equip1.checked) {
        price += (2*balaclava.value);
    }
    if (equip2.checked) {
        price += (1.5*balaclavaUsed.value);
    }
    if (equip3.checked) {
        price += (1*gloves.value);
    }

    return price;

}

function showSummary() {
    let price = calculatePrice();
    let modal = document.getElementById("modal");
    let span = document.getElementById("close");

    modal.style.display = "block";

    addElement("Meno", document.getElementById("firstname").value);
    addElement("Priezvisko", document.getElementById("surname").value);
    addElement("Email", document.getElementById("mail").value);
    addElement("Tel. č.", document.getElementById("phone").value);
    addElement("Trať", document.getElementById("sk-track").value);
    addElement("Počet jazdcov", document.getElementById("driver-amount").value);
    addElement("Dĺžka jazdy", document.getElementById("drive-length").value);

    document.getElementById("final-price").textContent = price.toString() + " €";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


function checkValues() {
    if (validateFirstName() == 1) {
        event.preventDefault();
        return 1;
    }
    if (validateSurName() == 1) {
        event.preventDefault();
        return 1;
    }
    if (validateEmail() == 1) {
        event.preventDefault();
        return 1;
    }
    if (validatePhone() == 1) {
        event.preventDefault();
        return 1;
    }
    if (validateDate() == 1) {
        event.preventDefault();
        return 1;
    }
    if (validateTrack() == 1) {
        event.preventDefault();
        return 1;
    }
    if (validateAmount() == 1) {
        event.preventDefault();
        return 1;
    }
    if ( validateDriveLen() == 1 ) {
        event.preventDefault();
        return 1;
    }
    showSummary();
}
