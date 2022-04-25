/*
  User validation checks
*/
const checkName = (string) => {
  let name = string.value;
  try {
    if (/^([A-Za-z]{4,})/.test(name)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

const checkEmail = (string) => {
  let mail = string.value;
  try {
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err)
  }
}

const checkPassword = (string) => {
  let password = string.value;
  try {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err)
  }
}

/*
  Rudimentary checks for user input in the input fields for the credit card and expiration date 
*/
const checkCreditCard = (creditCard) => {
  const cardNumbers = /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/

  try {
    if (cardNumbers.test(creditCard)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
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
const creditCardFormat = (cardSelected) => {
  let cardPlaceholder = document.getElementById('number');
  if (cardSelected.value === 'amex') {
    cardPlaceholder.placeholder = 'xxxx-xxxxxx-xxxx'
  } else if (cardSelected.value === "mc") {
    cardPlaceholder.placeholder = 'xxxx-xxxx-xxxx-xxxx';
  } else if (cardSelected.value === 'visa') {
    cardPlaceholder.placeholder = 'xxxx-xxxx-xxxx-xxxx'
  }
}

/*
  End of User validation checks
*/
const total = () => {
  // jquery html selectors
  const t = $('input[name="tier"]:checked').val(),
  m = $('input[name="month"]:checked').val()

  // calc of the selected values
  let result = Number(t) * Number(m);

  // writing it to the designated html element
  $("#write").text(`Your bill will renew every ${m} months at $${t} dollars per month, for a total of $${result} dollars.`);
}

/*
  A simple for loop that will create the seperate lines for each option checked by the user
*/
const showOptions = (array) => {
  let value = "No options selected.";
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      value += array[i] + ' ';
    }
  } else {
    return value
  }
  return value;
}

/*
  Order object constructor
*/
function Order(tier, month, options, username, mail, card) {
  this.tier = tier;
  this.month = month;
  this.options = options;
  this.username = username;
  this.mail = mail;
  this.card = card;
}

/*
  Arrow function that uses the Constructor to build the object and send it to display
*/
const createOrder = () => {
  let tier = $('input[name="tier"]:checked').val(),
  month = $('input[name="month"]:checked').val(),
  options = [],
  username = $('#username').val(),
  mail = $('#mail').val(),
  card = $('#card').val(),
  checkboxes = $('option');

  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      options.push(checkbox.value);
    }
  }
  let addOrder = new Order(tier, month, options, username, mail, card);
  createDisplay(addOrder);
}

/*
  Setups up the container for the display portion of the order
*/
const createDisplay = (order) => {
  let optionsList = showOptions(order.options)
  $('#showOrder').text(
  `Tier - ${order.tier}
  Subscription - ${order.month}
  Options - ${optionsList}
  Username - ${order.username}
  E-mail - ${order.mail}
  Card - ${order.card}`)
}

/*
  Display object's for Order Views
*/
const previewOrder = () => {
  document.getElementById('makeOrder').addEventListener('click', function(event) {
    createOrder();
    event.preventDefault();
  })
}

/*
  the event listeners will run in succession when the window loads and they are triggered per each use
*/
window.onload = function() {
  const user = document.getElementById('username'),
  email = document.getElementById('mail'),
  password = document.getElementById('pwd'),
  card = document.querySelector('#card'),
  cardNumber = document.getElementById('number'),
  checkExpiration = document.getElementById('expiration');

  let check = false;

  user.addEventListener('blur', function() {
    user.setCustomValidity('Please enter your full name here.');
    if (checkName(user) === false) {
      user.reportValidity();
      check = false;
    } else {
      check = true;
    }
  })

  email.addEventListener('blur', function() {
    email.setCustomValidity('Please enter a valid email address here.');
    if (checkEmail(email) === false) {
      email.reportValidity();
      check = false;
    } else {
      check = true;
    }
  })

  password.addEventListener('blur', function() {
    password.setCustomValidity('Please enter a password at least eight characters long with at least one number.');
    if (checkPassword(password) === false) {
      password.reportValidity();
      check = false;
    } else {
      check = true;
    }
  })

  card.addEventListener('change', function() {
    let cardOpts = card.options[card.selectedIndex]
    creditCardFormat(cardOpts);
  })

  cardNumber.addEventListener('blur', function() {
    let enteredCardNumber = document.getElementById('number').value
    cardNumber.setCustomValidity('Please enter your card number.');
    if (checkCreditCard(enteredCardNumber) === false) {
      cardNumber.reportValidity();
      check = false;
    } else if (check === true) {
      previewOrder();
    }
  })
  previewOrder();
}