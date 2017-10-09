var msgBlank = $("#msg-blank");
var msgEmpty = $("#msg-empty");
var msgText = $("#msg-text");
var msgEmail = $("#msg-email");
var msgDate = $("#msg-date");

var nombre = $("#name");
var lastName = $("#last-name");
var email = $("#email");
var born = $("#born");

function init() {
  var formContact = $(".form-contact");
  var reportContact = $(".report-contact");

  formContact.on("click",showForm);
  reportContact.on("click",showReport);

  validar.mayuscula(nombre);
  validar.mayuscula(lastName);
  validar.noNumero(nombre);
  validar.noNumero(lastName);

}
var x=false;
function menuIcon(_evt) {
  //console.log(_evt); // show the div element
  //_evt.toggleClass("change"); // is not a function ¿???
  //$(".nav-icon").toggleClass("change");
  //$(".menu-show").toggle(); // errores
  console.log($(".menu-show").css("display"));
  if(x == false){
    $(".menu-show").show();
    $(".nav-icon").addClass("change");
    x= true;
  }else{
    $(".menu-show").hide();
    $(".nav-icon").removeClass("change");
    x= false;
  }
}

$(".container-page").click(function(){
  if($(".menu-show").css("display") == "block"){
    //console.log($(".menu-show").css("display"));
    $(".menu-show").hide();
    $(".nav-icon").removeClass("change");
    x= false;
  } else {
    //console.log($(".menu-show").css("display"));
  }
});


var validar = {
  mayuscula : function(_value){
    _value.keyup(function(event){
      if(event.keyCode>=65 && event.keyCode<=90){
        _value.val(convertirMayus(_value.val()));
      }
    });
  },
  noNumero : function(_value){
    _value.keydown(function(event){
      if((event.keyCode >= 48 && event.keyCode <= 57) || ( event.keyCode >= 96 && event.keyCode <= 105)){
        event.preventDefault(); // ya no se escriben numeroos!!!
      }
    });
  }
};

function showForm() {
  $("#form-div").show();
  $("#report-div").hide();
  validateBlank();
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
          mayuscula += nombreArray[i].toLowerCase();
          if(nombreArray[i] == " ")
              espacio = true;
      }
  }
  return mayuscula;
}

var blank=false;

function validateBlank() {
  if($("#name").val().length == 0 || $("#last-name").val().length == 0 || $("#email").val().length == 0){
    msgBlank.show();
    msgBlank.html("Falta ingresar datos");
    blank=false;
  }else {
    msgBlank.hide();
    blank=true;
  }
}

function validateText(value) {
  if((value.keyCode>47 && value.keyCode<58) || (value.keyCode>=96 && value.keyCode<=105)){
    msgText.show();
    msgText.html("No se permiten números");
  }else {
    msgText.hide();
  }
}

function isEmpty() {
  if(/([a-zA-Z])/g.test($("#name").val()) && /([a-zA-Z])/g.test($("#last-name").val())){
    msgEmpty.hide();
  } else {
    msgEmpty.show();
    msgEmpty.html("Hay espacios vacios");
  }
}

var text = false;

function isText() {
  var num = /[0-9]/g;
  if($("#name").val().match(num) || $("#last-name").val().match(num)){
    msgText.show();
    msgText.html("No se permiten números");
    text=false;
  }else {
    msgText.hide();
    text=true;
  }
}

function validateName(_evt) {
  validateBlank();
  validateText(_evt);
  isText();
  isEmpty();
}

function validateLastName(_evt) {
  validateBlank();
  validateText(_evt);
  isText();
  isEmpty();
}

var emailInput = false;

function validateEmail(_evt) {
  if(/([a-zA-Z0-9(-_.)]+[@][a-zA-Z0-9]+[.][a-zA-Z]+)/g.test(email.val())){
      msgEmail.hide();
      emailInput=true;
  } else {
      msgEmail.show();
      msgEmail.html("Ingrese con la estructura <i><b>nombre@correo.com</b></i>");
      emailInput=false;
  }
}

var fechaNacimiento = false;
var edad=0;

function validateDate() {
  var fecha = $("#born").val().split("-");
  var year = parseInt(fecha[0]);
  var month = parseInt(fecha[1]);
  var day = parseInt(fecha[2]);
  var d = new Date();
  var actualYear = d.getFullYear();
  var actualMonth = d.getMonth()+1;
  var actualDay = d.getDate();

  if($("#born").val()=="" || year == actualYear){
    msgDate.show();
    msgDate.html("Ingrese su fecha de nacimiento correctamente");
    fechaNacimiento=false;
  }else{
    msgDate.hide();
    fechaNacimiento=true;

    if(actualMonth > month){
      edad = actualYear - year;
    }else if(actualMonth < month){
      edad = actualYear - year - 1;
    }else if(actualMonth == month){
      if(actualDay < day){
        edad = actualYear - year - 1;
      }else if(actualDay > day){
        edad = actualYear - year;
      }else if(actualDay == day){
        edad = actualYear - year;
      }
    }
  }
}

var isChecked;

function checkGender () {
  var msgCheck = $("#msg-check");
  isChecked = $("input[name=genero]:checked").val();
  if(!isChecked){
    msgCheck.show();
    msgCheck.html("Seleccione su género");
    isChecked=false;
  }else{
    msgCheck.hide();
    isChecked=true;
  }
}

function sendForm() {

  isEmpty();
  isText();
  validateBlank();
  validateDate();
  checkGender();
  if(text==true && blank==true && emailInput==true && fechaNacimiento==true && isChecked==true){
    console.log("si");
    localStorage.setItem('Nombre', $("#name").val());
    localStorage.setItem('Apellido', $("#last-name").val());
    localStorage.setItem('Email', $("#email").val());
    localStorage.setItem('Fecha de Nacimiento', $("#born").val());
    localStorage.setItem('Edad', edad);
    localStorage.setItem('Genero', $("input[name=genero]:checked").val());

    writeReport();
  }else {
    console.log("no");
    alert("Revise");
  }
}

function writeReport() {
  showReport();
  var table = $("#table-form");
  var nombre = localStorage.getItem('Nombre');
  var apellido = localStorage.getItem('Apellido');
  var correo = localStorage.getItem('Email');
  var genero = localStorage.getItem('Genero');
  var edad = localStorage.getItem('Edad');
  var nacimiento = localStorage.getItem('Fecha de Nacimiento');

  table.append("<tr><td>"+nombre+"</td><td>"+apellido+"</td><td>"+correo+"</td><td>"+genero+"</td><td>"+edad+"</td><td>"+nacimiento+"</td></tr>");

  resetForm();
}

function resetForm() {
  $("#name").val("");
  $("#last-name").val("");
  $("#email").val("");
  $("#born").val("");
  $("input[name=genero]").attr("checked",false);
}
