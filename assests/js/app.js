const total = () => {

  // js html selectors
  let t = document.querySelector('input[name="tier"]:checked').value;
  let m = document.querySelector('input[name="month"]:checked').value;

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

/*  
  Order object constructor
*/
function Order(tier, month, username, mail, card) {

  this.tier = tier;
  this.month = month;
  this.username = username;
  this.mail = mail;
  this.card = card;
}

/* 
  Arrow function that uses the Constructor to build the object and send it to display
*/
const createOrder = () => {

  let tier = document.querySelector('input[name="tier"]:checked').value;
  let month = document.querySelector('input[name="month"]:checked').value;
  let username = document.getElementById('username').value;
  let mail = document.getElementById('mail').value;
  let card = document.getElementById('card').value;
  let addOrder = new Order(tier, month, username, mail, card);
  createOrderDisplay(addOrder);
}

/* 
  Setups up basic html and nodes for fomratting of the user reciept 
*/
const createOrderDisplay = (order) => {

  let div = document.createElement('div');
  let classAttr = document.createAttribute('class');
  classAttr.value = "newOrder";
  div.setAttributeNode(classAttr);
  document.getElementById('display').appendChild(div);

  div.innerHTML = "Your Tier: " + order.tier + "<br>" + 
  "Your Month Subscription " + order.month + "<br>" + 
  "Your Username: " + order.username + "<br>" + 
  "Your E-mail: " + order.mail + "<br>" + 
  "Your Card: " + order.card + "<br>";
}

/* 
  Display object's for Order Views
*/
const viewOrder = () => {

  document.getElementById('makeOrder')
    .addEventListener('click', function(event) {
      createOrder();
      event.preventDefault();
  })
}

window.onload = function() {
  viewOrder();
}