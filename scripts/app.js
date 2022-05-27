{
  payload = {
    appId: "",
    userId: "",
    paymentMethod: 0,
    resultConfirmation: "",
    message: "",
    creditCard: {
      validateDate: "",
      active: true,
      name: "",
      cvv: "",
      number: "",
      company: "",
      userId: ""
    }
  }
};

var tbody = document.querySelector('table tbody');
let appIdVariable = "";
let userIdVariable = "";



function GetUserId() {
  let email = sessionStorage.getItem('email');
  var xhr = new XMLHttpRequest();

  xhr.open('GET', `https://localhost:5001/api/Token/${email}`, true)
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        userIdVariable = this.responseText;
      }
      else if (this.status == 404) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send(JSON.stringify(email));
}

function loadApp() {
  tbody.innerHTML = '';
  var xhr = new XMLHttpRequest();

  xhr.open('GET', `https://localhost:5001/api/App`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var app = JSON.parse(this.responseText);
        for (var index in app) {
          insertLine(app[index]);
        }
      }
      else if (this.status == 500) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send();
}

loadApp();

function insertLine(app) {
  var trow = `<tr>
  <td>${app.name}</td>
  <td>R$ ${app.value}</td>
  <td>${app.creator}</td>
  <td>
  <button class="btn btn-primary" data-bs-toggle="modal"
  data-bs-target="#modal" onclick=paymentApp(${JSON.stringify(app)})>Comprar!</button>
  </td>
  </tr>   
  `
  tbody.innerHTML += trow;
}

function paymentApp(app) {
  GetUserId();
  document.querySelector('#app').value = app.name;
  document.querySelector('#creator').value = app.creator;
  document.querySelector('#value').value = `R$${app.value}`;
  appIdVariable = app.id;
}

function buyApp() {
    GetUserId();
    let dateSplit = document.querySelector('#validateDate').value.split("-")

    payloadonj = {
      payload: {
        appId: appIdVariable,
        userId: userIdVariable,
        paymentMethod: 1,
        resultConfirmation: 1,
        message: "Eviando por: " + appIdVariable,
        creditCard: {
          validateDate: new Date(dateSplit[0], dateSplit[1]),
          active: true,
          name: document.querySelector('#name').value,
          cvv: document.querySelector('#cvv').value,
          number: document.querySelector('#number').value,
          company: document.querySelector('#company').value,
          userId: userIdVariable
        }
      }
    };

    var xhr = new XMLHttpRequest();
  
    xhr.open("POST", `https://localhost:5001/api/Payment`, true);
  
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
  
    xhr.send(JSON.stringify(payloadonj));

    window.alert("Pagamento realizado com sucesso!");
}

(() => {
  var statusLogin = document.querySelector('#statusLogin');
  if (sessionStorage.getItem('token') != null) {
    statusLogin.innerHTML =
      `
    <li class="nav-item">
    <a class="nav-link active me-3 mb-2 mb-md-0" aria-current="page" href="/pages/login.html" onclick=logout()>Sair</a>
    </li>
    `
  }
  else {
    `
    <li class="nav-item">
    <a class="nav-link active me-3 mb-2 mb-md-0" aria-current="page" href="/pages/login.html">Entrar</a>
    </li>
    `
    window.location.href = "login.html";
  }
})()

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('email');
  window.location.href = "login.html";
}


