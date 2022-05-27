var user = {
  name,
  email,
  password,
  birthDate,
  gender,
  address: {
    cep,
    avenue,
    city,
    uf,
    number,
    complement
  }
};

var login = function () {
  event.preventDefault();
  var email = document.querySelector('#emailEntrar');
  var password = document.querySelector('#passwordEntrar');
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `https://localhost:5001/api/Token/LoginUser?password=${password.value}`, true);
  
  xhr.setRequestHeader('content-type', 'application/json');

  xhr.onload = function () {
    var result = JSON.parse(this.responseText);

    if(result.token){
      sessionStorage.setItem('token', `Bearer ${result.token}`);
      sessionStorage.setItem('email', email.value);
      verify();
    }
    else {
      window.alert(result[0]);
      email.value = '';
      password.value = '';
    }
  }
  xhr.send(JSON.stringify(email.value));
}

var verify = function () {
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', `https://localhost:5001/api/App`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    var result = this.responseText;
    window.location.href = "index.html";
  }
  xhr.send();
}

function register() {
  try {
    event.preventDefault();
    let dateSplit = document.querySelector('#birthDate').value.split("-")
  
    user.birthDate = new Date(dateSplit[2], dateSplit[1], dateSplit[0])
    user.name = document.querySelector('#name').value;
    user.cpf = document.querySelector('#cpf').value;
    user.gender = document.querySelector('#gender').value;
    user.email = document.querySelector('#email').value;
    user.password = document.querySelector('#password').value;
  
    user.address.cep = document.querySelector('#cep').value;
    user.address.city = document.querySelector('#city').value;
    user.address.uf = document.querySelector('#uf').value;
    user.address.complement = document.querySelector('#complement').value;
    user.address.number = Number.parseInt(document.querySelector('#number').value);
    user.address.avenue = document.querySelector('#avenue').value;
  
    saveUser('POST', user);
  
    windows.alert("Usuario cadastrado com sucesso!");
  }
  catch {
    window.alert("Falha ao realizar o login!")
  }
}

function saveUser(method, body) {
    var xhr = new XMLHttpRequest();
  
    xhr.open(method, `https://localhost:5001/api/Token/CreateUser`, true);
  
    xhr.setRequestHeader('content-type', 'application/json');
  
    xhr.send(JSON.stringify(body));  
}

function newClient() {
  user.name = document.querySelector('#name').value;
  user.cpf = document.querySelector('#cpf').value;
  user.birthDate = document.querySelector('#birthDate').value;
  user.gender = document.querySelector('#gender').value;
  user.email = document.querySelector('#email').value;
  user.password = document.querySelector('#password').value;

  user.address.cep = document.querySelector('#cep').value;
  user.address.city = document.querySelector('#city').value;
  user.address.uf = document.querySelector('#uf').value;
  user.address.complement = document.querySelector('#complement').value;
  user.address.number = document.querySelector('#number').value;

  console.log('user: ', user)

  saveUser('POST', user);
}

function cancel() {
  var btnSave = document.querySelector('#btnSave');
  var title = document.querySelector('#title');

  document.querySelector('#name').value = '';
  document.querySelector('#cpf').value = '';
  document.querySelector('#birthDate').value = '';
  document.querySelector('#gender').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('#cep').value = '';
  document.querySelector('#city').value = '';
  document.querySelector('#uf').value = '';  
  document.querySelector('#complement').value = '';
  document.querySelector('#number').value = '';

  client = {};

  btnSave.textContent = 'Cadastrar';
  btnCancel.textContent = 'Limpar';
  title.textContent = "Cadastrar cliente";
}
