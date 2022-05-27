var tbody = document.querySelector('table tbody');
var client = {};

function register() {
  client.Name = document.querySelector('#name').value;
  client.Cpf = document.querySelector('#cpf').value;
  client.BirthDate = document.querySelector('#birthDate').value;
  client.Income = document.querySelector('#income').value;
  
  if(client.Id === undefined || client.Id === 0){
    saveClients('POST', 0, client);
  }  
  else {
    saveClients('PUT', client.Id, client)
  }

  loadClients();
}

function newClient() {
  var btnSave = document.querySelector('#btnSave');
  var title = document.querySelector('#title');

  document.querySelector('#name').value = '';
  document.querySelector('#cpf').value = '';
  document.querySelector('#birthDate').value = '';
  document.querySelector('#income').value = '';

  client = {};

  btnSave.textContent = 'Cadastrar';
  btnCancel.textContent = 'Limpar';
  title.textContent = "Cadastrar cliente";
}

function cancel() {
  var btnSave = document.querySelector('#btnSave');
  var title = document.querySelector('#title');

  document.querySelector('#name').value = '';
  document.querySelector('#cpf').value = '';
  document.querySelector('#birthDate').value = '';
  document.querySelector('#income').value = '';

  client = {};

  btnSave.textContent = 'Cadastrar';
  btnCancel.textContent = 'Limpar';
  title.textContent = "Cadastrar cliente";
}

function loadClients() {
  tbody.innerHTML = '';

  var xhr = new XMLHttpRequest();

  xhr.open('GET', `https://localhost:44312/api/client/`, true)

  xhr.onload = function () {
    var clients = JSON.parse(this.responseText);
    for(var index in clients){
      insertLine(clients[index]);
    }
  }
  xhr.send();  
}

function saveClients(method, id, body) {  
  var xhr = new XMLHttpRequest();

  if(id === undefined || id === 0) {
    id = '';
  }

  xhr.open(method, `https://localhost:44312/api/client/${id}`, false);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(body));
}

loadClients();

function  editClient(_client) {
  var btnSave = document.querySelector('#btnSave');
  var title = document.querySelector('#title');

  let data = new Date(_client.BirthDate);
  let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ;                 

  document.querySelector('#name').value = _client.Name;
  document.querySelector('#cpf').value = _client.Cpf;
  document.querySelector('#birthDate').value = _client.BirthDate;
  document.querySelector('#income').value = _client.Income;


  btnSave.textContent = 'Salvar';
  btnCancel.textContent = 'Cancelar';
  title.textContent = `Editar cliente: ${_client.Name}`;

  client = _client;
}

function deleteClient(id) {
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE', `https://localhost:44312/api/client/${id}`, false);

  xhr.send();
}

function deleteAndLoad(id) {
  if(confirm("Tem certeza que deseja excluir?")){
    deleteClient(id);
    loadClients();
  }
}

function insertLine(client) {
  var trow = `<tr>
                  <td>${client.Name}</td>
                  <td>R$ ${client.Income}</td>
                  <td>
                    <button class="btn btn-warning" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modal" onclick='editClient(${JSON.stringify(client)})'>Editar</button> 
                    <button class="btn btn-danger" data-bs-dismiss="modal" onclick='deleteAndLoad(${client.Id})'>Deletar</button>
                  </td>
              </tr>   
              `
  tbody.innerHTML += trow;
}