const total = () => {
  // js html selectors
  let t = document.querySelector('input[name="tier"]:checked').value,
  m = document.querySelector('input[name="month"]:checked').value;

  // calc of the selected values
  let result = Number(t) * Number(m);

  // writing it to the desginated html element
  document.getElementById("write").innerText = `Your bill will renew every ${m} months at $${t} dollars per month, for a total of $${result} dollars.`;
}

const showTotal = (evt) => {
  if (evt.target.id === 'price1') {
    document.getElementById('price1').innerText = '$0 / month';
  } else if (evt.target.id === 'price2') {
    document.getElementById('price2').innerText = '$16 / month';
  } else if (evt.target.id === 'price3') {
    document.getElementById('price3').innerText = '$32 / month';
  }
}

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
  Display object's for Order Views
*/
const previewOrder = () => {
  document.getElementById('makeOrder').addEventListener('click', function(event) {
    createOrder();
    event.preventDefault();
  })
}

window.onload = function() {
  previewOrder();
}