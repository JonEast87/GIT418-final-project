const loadInformation = () => {
  const data = null;
  
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let responseObject = JSON.parse(this.responseText);
      let location = responseObject.location;
      let unordered = document.getElementById('unordered');
      document.getElementById('location').innerText = location;
      for (let i = 0; i < responseObject.items.length; i++) {
        let item = document.createElement('li');
        if (responseObject.items[i].name !== '') {
          item.textContent = `Name: ${responseObject.items[i].name} Type: ${responseObject.items[i].type}`;
          unordered.appendChild(item);
        }
      }
    }
  });

  xhr.open("GET", "https://destiny-2-xur.p.rapidapi.com/xur");
  xhr.setRequestHeader("X-RapidAPI-Host", "destiny-2-xur.p.rapidapi.com");
  xhr.setRequestHeader("X-RapidAPI-Key", "bc22899022msh9bcabcb1ea9d846p1d80a4jsn3c7b7bf4e7e1");

  xhr.send(data);
}
