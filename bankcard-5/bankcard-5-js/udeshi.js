// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms_card_2 = document.querySelectorAll(".need-validation-card-2");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms_card_2).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
const form = document.getElementById("cardFormtwo");
const cardNumberInput = document.getElementById("cc-number-card-2");
const cardTypeImage = document.getElementById("card-2-cardicons");
const expiry = document.getElementById("cc-exp-card-2");
const cardCVC = document.getElementById("cc-cvc-card-2");
let cardTypescard2 = document.querySelector(".animation-card-2");
const errorMessage = document.getElementById("card-cardform-2-erroMessage-div");
const cardCountry = document.querySelector("#country-card-2");
const cardNumberValue = cardNumberInput.value.trim().replace(/[ -]/g, "");

//Card Number format 1234 1234 1234 1234
cardNumberInput.addEventListener("input", function (event) {
  let cardNumber = event.target.value;
  let formattedCardNumber = "";
  cardNumber = cardNumber.replace(/\s+/g, ""); // remove all whitespaces
  cardNumber = cardNumber.replace(/\D+/g, ""); // remove all non-numeric characters

  for (let i = 0; i < cardNumber.length; i++) {
    formattedCardNumber += cardNumber[i];
    if ((i + 1) % 4 === 0 && i !== cardNumber.length - 1) {
      formattedCardNumber += " ";
    }
  }

  event.target.value = formattedCardNumber;
  //errorMessage.style.display = "";

  if (
    cardNumber === "" ||
    (!cardNumber.startsWith("34") &&
      !cardNumber.startsWith("37") &&
      !cardNumber.startsWith("51") &&
      !cardNumber.startsWith("52") &&
      !(parseInt(cardNumber.substring(0, 4)) >= 2221 && parseInt(cardNumber.substring(0, 4)) <= 2720) &&
      !cardNumber.startsWith("53") &&
      !cardNumber.startsWith("54") &&
      !cardNumber.startsWith("55") &&
      !cardNumber.startsWith("4"))
  ) {
    cardTypescard2.style.animation = "";
    cardTypescard2.style.backgroundImage = "";
    cardTypeImage.innerHTML = "";
    cardTypeImage.style.display = "";
  } else if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
    cardTypescard2.style.animation = "none";
    cardTypescard2.style.backgroundImage = "none";
    cardTypeImage.innerHTML =
      '<img class="card-2-mobile-image" src="./card-2-images/americanexpress.png" alt="americanexpress" style="display:initial;">';
  } else if (
    cardNumber.startsWith("51") ||
    cardNumber.startsWith("52") ||
    cardNumber.startsWith("53") ||
    cardNumber.startsWith("54") ||
    cardNumber.startsWith("55") ||
    (parseInt(cardNumber.substring(0, 4)) >= 2221 && parseInt(cardNumber.substring(0, 4)) <= 2720)
  ) {
    cardTypescard2.style.animation = "none";
    cardTypescard2.style.backgroundImage = "none";
    cardTypeImage.innerHTML =
      '<img class="card-2-mobile-image " src="./card-2-images/marstercard.png" alt="marstercard" style="display:initial;">';
  } else if (cardNumber.startsWith("4")) {
    cardTypescard2.style.animation = "none";
    cardTypescard2.style.backgroundImage = "none";
    cardTypeImage.innerHTML =
      '<img class="card-2-mobile-image " src="./card-2-images/Visa.png" alt="visa" style="display:inline-block;">';
  }
});

//Date format
function formatString(e) {
  var inputChar = String.fromCharCode(event.keyCode);
  var code = event.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  event.target.value = event.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
}

//CVC validation
cardCVC.addEventListener("input", function () {
  let cardNumber = document.getElementById("cc-number-card-2").value;

  // Allow only numeric characters
  cardCVC.value = cardCVC.value.replace(/[^\d]/g, "");

  if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
    cardCVC.maxLength = 4;
    cardCVC.minLength = 3;
    if (cardCVC.value.length !== 4) {
      cardCVC.value = cvv.value.slice(0, 4);
    }
  } else if (
    cardNumber.startsWith("51") ||
    cardNumber.startsWith("52") ||
    cardNumber.startsWith("53") ||
    cardNumber.startsWith("54") ||
    cardNumber.startsWith("55") ||
    !(parseInt(cardNumber.substring(0, 4)) >= 2221 && parseInt(cardNumber.substring(0, 4)) <= 2720)
  ) {
    cardCVC.maxLength = 3;
    cardCVC.minLength = 3;
    if (cardCVC.value.length !== 3) {
      cardCVC.value = cvv.value.slice(0, 3);
    }
  } else if (cardNumber.startsWith("4")) {
    cardCVC.maxLength = 3;
    cardCVC.minLength = 3;
    if (cardCVC.value.length !== 3) {
      cardCVC.value = cvv.value.slice(0, 3);
    }
  } else {
    cardCVC.maxLength = 3;
    cardCVC.minLength = 3;
    if (cardCVC.value.length !== 3) {
      cardCVC.value = cvv.value.slice(0, 3);
    }
  }
});

//expiry custom validation
expiry.addEventListener("input", function (event) {
  if (expiry.value.length == "") {
    expiry.setCustomValidity(`Card number is blank`);
    cardSetErrorFor(expiry, "Card number is blank");

  } else if (expiry.value.length < 5) {
    expiry.setCustomValidity(`Card expiration is incomplete`);
    cardSetErrorFor(expiry, "Card expiration is incomplete");

  } else if (!validateExpDate(expiry.value)) {
    expiry.setCustomValidity(`Card expiration is past`);
    cardSetErrorFor(expiry, "Card expiration is in the past");

  } else {
    expiry.setCustomValidity("");
    cardSetSuccessFor(expiry);
  }
});

//cvc custom validation

cardCVC.addEventListener("input", function (event) {
  if (cardCVC.value.length == "") {
    cardCVC.setCustomValidity(`Card CVC is blank`);
    cardSetErrorFor(cardCVC, "Card CVC is blank");
  } else if (cardCVC.value.length < 3) {
    cardCVC.setCustomValidity(`Card CVC is incomplete`);
    cardSetErrorFor(cardCVC, "Card CVC is incomplete");
  } else {
    cardCVC.setCustomValidity("");
    cardSetSuccessFor(cardCVC);
  }
});

/*invalid valid states*/
function cardTwoValidateForm() {
  var selects_card_2 = cardFormtwo.querySelectorAll("select");
  var isValid = true;

  for (var i = 0; i < selects_card_2.length; i++) {
    if (selects_card_2[i].value === "") {
      selects_card_2[i].style.borderColor = "#CD4C64";
      selects_card_2[i].style.borderWidth = "1px";
      isValid = false;
    } else {
      selects_card_2[i].style.borderColor = "#14a44d";
      selects_card_2[i].style.borderWidth = "1px";
    }
  }

  return isValid;
}
cardFormtwo.querySelectorAll("select").forEach(function (selects_card_2_1) {
  selects_card_2_1.addEventListener("change" || "submit", function () {
    if (selects_card_2_1.value !== "") {
      selects_card_2_1.style.borderColor = "#14a44d";
      selects_card_2_1.style.borderWidth = "1px";
    }
  });
});

//select country custom validation
cardCountry.addEventListener("input", function (event) {
  if (cardCountry.value == "") {
    cardCountry.setCustomValidity(`Card country is blank`);
    cardSetErrorFor(cardCountry, "Card country is blank");
  } else {
    cardCountry.setCustomValidity("");
    cardSetSuccessFor(cardCountry);
  }
});

//card number validation
/*cardNumberInput.addEventListener("input", function(event) {
              if (cardNumberInput.value.length == '') {
                cardNumberInput.setCustomValidity(`Card number is blank`);
                cardSetErrorFor(cardNumberInput, 'Card number is blank');
              } else if (cardNumberInput.value.length < 15) {
                cardNumberInput.setCustomValidity(`Card number is incomplete`);
                cardSetErrorFor(cardNumberInput, 'Card number is incomplete');
              } else if (!validateCardNumber(cardNumberInput)) {
                cardNumberInput.setCustomValidity('Card number is invalid');
                cardSetErrorFor(cardNumberInput, 'Card number is invalid');
              } else {
                cardSetSuccessFor(cardNumberInput);
              }
              });*/
let timeout;             
cardNumberInput.addEventListener("input", function (event) {
  if (cardNumberInput.value.length == "") {
    cardNumberInput.setCustomValidity(`Card number is blank`);
    cardSetErrorFor(cardNumberInput, "Card number is blank");
  } else if (cardNumberInput.value.length < 15) {
    cardNumberInput.setCustomValidity(`Card number is incomplete`);
    cardSetErrorFor(cardNumberInput, "Card number is incomplete");
  }else {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
     myFunction();
    }, 700);
    } 
});

function myFunction(){

  const inpNumber = document.getElementById("cc-number-card-2").value;
  const numretValue = validateCreditCardNumber(inpNumber);

  if (numretValue === false) {
    cardNumberInput.setCustomValidity(`Card number is invalid`);
    cardSetErrorFor(cardNumberInput, "Card number is invalid");
  } else {
    cardNumberInput.setCustomValidity("");
    cardSetSuccessFor(cardNumberInput);
  }
}


function validateCreditCardNumber(number) {
  // Remove non-digit characters from the number
  number = number.replace(/\D/g, '');

  // Check if the number is between 12 and 19 digits long
  if (!/^\d{12,19}$/.test(number)) return false;

  // Check if the number passes the Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}



cardFormtwo.addEventListener("submit", function (event) {
  
  if (cardCVC.value.length == "") {
    cardCVC.setCustomValidity(`Card CVC is blank`);
    cardSetErrorFor(cardCVC, "Card CVC is blank");
    
  }

  if (cardNumberInput.value.length == "") {
    cardNumberInput.setCustomValidity(`Card number is blank`);
    cardSetErrorFor(cardNumberInput, "Card number is blank");
  }

  if (cardCountry.value == "") {
    cardCountry.setCustomValidity(`Card country is blank`);
    cardSetErrorFor(cardCountry, "Card country is blank");
  }

  if (expiry.value.length == "") {
    expiry.setCustomValidity(`Card number is blank`);
    cardSetErrorFor(expiry, "Card number is blank");
  }
});


/*Date validation*/
validateExpDate = (date) => {
  let today = new Date();
  let today_mm = ("0" + (today.getMonth() + 1)).slice(-2);
  let today_yy = today.getFullYear().toString().substr(-2);
  // Check if the date entered has exactly 5 characters (2 for month + "/" + 2 for year)
  if (date.length !== 5) {
    // Check if the entered date has 2 characters (month)
    if (date.length === 2 && /^\d{2}$/.test(date)) {
      return true;
    }
    return false;
  }

  let date_mm = date.split("/")[0];
  let date_yy = date.split("/")[1];

  // Check if the first two characters are numeric (month) and the last two characters are numeric (year)
  if (!/^\d{2}$/.test(date_mm) || !/^\d{2}$/.test(date_yy)) {
    return false;
  }

  // Check if the entered expiration date is later than the current date
  if (date_yy > today_yy || (date_yy === today_yy && date_mm >= today_mm)) {
    return true;
  } else {
    return false;
  }
};


function cardSetErrorFor(input, message) {
  const formControl = input.parentElement; // .form-control
  const CFOErr = formControl.querySelector(".card-cardform-2-erroMessage-div");
  // add error message inside the div
  CFOErr.innerHTML =
    "<p>" + message + '&nbsp;<i class="fas fa-exclamation-circle"></i></p>';
  formControl.classList.add("error");
  formControl.classList.remove("success");
}

function cardSetSuccessFor(input) {
  const formControl = input.parentElement; // .form-control
  const CFOErr = formControl.querySelector(".card-cardform-2-erroMessage-div");

  // add error message inside the div
  CFOErr.innerText = "";
  formControl.classList.add("success");
  formControl.classList.remove("error");
}