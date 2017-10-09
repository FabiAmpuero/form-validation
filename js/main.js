var validate = $("#validate");
var name = $("input#name");

var lastName = $("#last-name");
var email = $("#email");
var born = $("#born");
var age = $("#age");
var genero = $("#name");
var sendButton = $("#send");

function init() {
  var formContact = $("#form-contact");
  var reportContact = $("#report-contact");

  formContact.on("click",showForm);
  reportContact.on("click",showReport);
  sendButton.on("click",sendForm);
}

function showForm() {
  $("#form-div").show();
  $("#report-div").hide();
}

function showReport() {
  $("#form-div").hide();
  $("#report-div").show();
}

function convertirMayus(texto){
    var nombreArray = texto.split("");
    var primeraLetra = nombreArray[0];
    var mayuscula = primeraLetra.toUpperCase();
    var espacio = false;

    for(var i=1; i<nombreArray.length; i++) {
        if(espacio){
            mayuscula += nombreArray[i].toUpperCase();
            espacio = false;
        } else {
            mayuscula += nombreArray[i];
            if(nombreArray[i] == " ")
                espacio = true;
        }
    }
    return mayuscula;
}

function validateBlank(value) {
  //if($("#name, #last-name").val().length == 0)
  validate.show();
  validate.html("Falta ingresar datos");
}

function validateText(value) {
  if((value.keyCode>47 && value.keyCode<58) || (value.keyCode>=96 && value.keyCode<=105)){
    validate.show();
    validate.html("No se permiten números");
  }
  else {
    validate.hide();
  }
}

function validateName(_evt) {
  //var nameVal = name.val();
  validateText(_evt);
  console.log(name);
  console.log($("#name")[0]);
  console.log($("#name").val());
  if($("#name").val().length == 0){
    validateBlank();
  }else {
      $("#name").val(convertirMayus($("#name").val()));
  }
}

function validateLastName(_evt) {
  validateText(_evt);

  if($("#last-name").val().length == 0){
    validateBlank();
  }else {
    $("#last-name").val(convertirMayus($("#last-name").val()));
  }
}

function validateEmail(_evt) {
  var msg = $("#email-msg");
  if(/([a-zA-Z0-9(-_.)]+[@][a-zA-Z0-9]+[.][a-zA-Z]+)/g.test(email.val())){
        msg.hide();
  } else {
    if(email.val().length >= 0){
      msg.show();
      msg.html("Incorrecto");
    }
  }
}

function validateDate(_evt) {
  //console.log(_evt);
}

function validateAge(_evt) {
  var validateAge = $("#validate-age");
  var regex= /[0-9]/g;

  if($("#age").val().length == 0){
    validateBlank();
  }else {
    if(regex.test($("#age").val())){
      alert("si");
    }else {
      alert("no");
    }
  }
  // else {
  //   if(_evt.keyCode > 64 || _evt.keyCode < 91 ){
  //     validateAge.show();
  //     validateAge.html("Ingrese un Número");
  //   }else {
  //     validateAge.hide();
  //   }
  // }
}

function sendForm() {
  isChecked = $("input[name=genero]:checked").val();
  if(!isChecked){
       alert('Seleccione su género');
  }

  localStorage.setItem('Nombre', $("#name").val());
  localStorage.setItem('Apellido', $("#last-name").val());
  localStorage.setItem('Email', $("#email").val());
  localStorage.setItem('Fecha de Nacimiento', $("#name").val());
  localStorage.setItem('Edad', $("#age").val());
  localStorage.setItem('Genero', isChecked);
}
