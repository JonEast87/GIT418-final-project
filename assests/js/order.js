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
  End of User validation checks
*/

const total = () => {
  // js html selectors
  let t = document.querySelector('input[name="tier"]:checked').value,
  m = document.querySelector('input[name="month"]:checked').value;

  // calc of the selected values
  let result = Number(t) * Number(m);

  // writing it to the desginated html element
  document.getElementById("write").innerText = `Your bill will renew every ${m} months at $${t} dollars per month, for a total of $${result} dollars.`;
}

/*
  A DOM selection that will capture the text values for the order total amount
*/
const showTotal = (evt) => {
  if (evt.target.id === 'price1') {
    document.getElementById('price1').innerText = '$0 / month';
  } else if (evt.target.id === 'price2') {
    document.getElementById('price2').innerText = '$16 / month';
  } else if (evt.target.id === 'price3') {
    document.getElementById('price3').innerText = '$32 / month';
  }
}

/*
  A simple for loop that will create the seperate lines for each option checked by the user
*/
const showOptions = (array) => {
  let value = "<br>";
  for (let i = 0; i < array.length; i++) {
    value += array[i] + "<br>";
  }
  value = value + "- End of Options -"
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
  let tier = document.querySelector('input[name="tier"]:checked').value,
  month = document.querySelector('input[name="month"]:checked').value,
  options = [],
  username = document.getElementById('username').value,
  mail = document.getElementById('mail').value,
  card = document.getElementById('card').value,
  checkboxes = document.getElementsByName('option');

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
  document.getElementById('showOrder').innerHTML = 
  "Your Tier - " + order.tier 
  + "<br>" + 
  "Your Month Subscription - " + order.month 
  + "<br>" + 
  "- Options - " + optionsList 
  + "<br>" + 
  "Your Username - " + order.username 
  + "<br>" + 
  "Your E-mail - " + order.mail 
  + "<br>" + 
  "Your Card - " + order.card + 
  "<br>";
}

/*
  Check user info before calling previewOrder
*/
const checkOrder = () => {
  const name = checkName(),
  mail = checkEmail(),
  password = checkPassword();

  let passOrFail = false

  if (name === true) {
    passOrFail = true
  }

  if (mail === true) {
    passOrFail = true
  }

  if (password === true) {
    passOrFail = true
  }

  if (passOrFail === false) {
    console.log('failed')
  }
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

window.onload = function() {
  const user = document.getElementById('username'),
  email = document.getElementById('mail'),
  password = document.getElementById('pwd');

  user.addEventListener('blur', function() {
    user.setCustomValidity('Please enter your full name here.')
    if (checkName(user) === false) {
      user.reportValidity()
    }
  })

  email.addEventListener('blur', function() {
    email.setCustomValidity('Please enter a valid email address here.')
    if (checkEmail(email) === false) {
      email.reportValidity()
    }
  })

  password.addEventListener('blur', function() {
    password.setCustomValidity('Please enter a password at least eight characters long with at least one number.')
    if (checkPassword(password) === false) {
      password.reportValidity()
    } else {
      previewOrder();
    }
  })
}