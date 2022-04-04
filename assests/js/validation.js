/*
  Rudimentary checks for user input in the input fields for the credit card and expiration date 
*/
const checkForCard = () => {
  let card = document.getElementById('number');
  let boolean = true;
  try {
    if (card.value == '') {
      throw 'Please enter your credit card naumber.';
    }
  } catch (err) {
    card.placeholder = 'Please enter your credit card naumber.';
    console.log(err);
    boolean = false;
  }
  return boolean;
}

const checkForExp = () => {
  let exp = document.getElementById('expiration');
  let boolean = true;
  try {
    if (exp.value == '') {
      throw 'Please enter your expiration date for your card.';
    }
  } catch (err) {
    exp.placeholder = 'Please enter your expiration date for your card.';
    console.log(err);
    boolean = false;
  }
  return boolean;
}

/*
  Changes the format according to user selection, the pattern shifts with it as well
*/
const creditCardFormat = () => {
  let cardIssuer = document.getElementById('card');
  let cardFormat = document.getElementById('number');

  cardIssuer.addEventListener('change', function() {
    if (cardIssuer.value === 'amex') {
      cardFormat.placeholder = 'xxxx-xxxxxx-xxxx'
      cardFormat.pattern = /^3[47][0-9]{13}$/
    } else if (cardIssuer.value === "mc") {
      cardFormat.placeholder = 'xxxx-xxxx-xxxx-xxxx';
      cardFormat.pattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    } else if (cardIssuer.value === 'visa') {
      cardFormat.placeholder = 'xxxx-xxxx-xxxx-xxxx'
      cardFormat.pattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    }
  })
}


/*
  Upon successful checks this function will reload the page 
*/
// const validateForm = () => {

//   document.getElementById('check')
//     .addEventListener('click', function(event) {
//       if (checkForCard() === true && checkForExp() === true) {
//         window.location.reload();
//       } else if (checkForCard() === false) {
//         document.getElementById('number').setCustomValidity('Please enter your credit card number.');
//         return false;
//       } else if (checkForExp() === false) {
//         document.getElementById('expiration').setCustomValidity('Please enter your expiration date.');
//         return false;
//       }
//       event.preventDefault();
//   })
// }