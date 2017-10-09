var nombre = $("#name");
var lastName = $("#last-name");
// var nombre = $("#name").val(); devuelve vacio nose porque ??
//la palabra name tiene conflictos [object object] name.val() is not a function
function init() {

  $("#name").keydown(function(event){
    //console.log($(this).val()); // empty
    console.log(event); //con la palabra event dentro de la funcion puedes acceder al teclado
    event.preventDefault();
  });

  $("#email").on("keyup",function(event) {
    console.log(event); // el vento, desde aqui se puede ingresar al KeyboardEvent
    console.log($(this)); // da el objeto del elemento
  })

  $("#name").keypress(function(){
    // console.log($(this).val()); // empty
    // console.log($(this)[0]); // elemento
    // console.log($(this)[0].parentElement); // elemento padre can access DOM
    // console.log($(this)[0].id); // name, you can access the attributes
    // console.log($(this).keyCode); // undefined just works with the event in html
    // console.log($(this).parentElement); // undefined, no se para que sive el objeto del elemento
    // console.log($(this)); // objeto del elemento
    // console.log(nombre); // objeto del elemento
  });

  $("#name").keyup(function(){
    // console.log($(this).val()); // valor
    // console.log(nombre.val());
    // var nameValue = nombre.val();
    // console.log(nameValue);
    // if(nameValue=='9'){
    //   console.log("es 9");
    // }
  });

  $("#last-name").keyup(function(){
    console.log(lastName);
    var lastNameValue = lastName.val();
    console.log(lastNameValue);
    console.log(lastName.val());
  });

  $("#send").click(function(){
    console.log(nombre.val());
    console.log(nombre.val().length);
    if(nombre.val()==""){
      console.log("nothing"); //length = 0 no se ha escrito nada
    }else if(nombre.val()=="undefined"){
      console.log("shows undefined");
    }else {
      console.log("else"); // length = # de espacios en blanco
    }
  });
}


function validateName(_evt){
  //console.log(_evt); //KeyboardEvent the list of the events like keyCode
  //var nameValue = nombre.val(); // extraemos el valor del input
  //console.log(typeof(nameValue)); // string
  //console.log(_evt.key); //the press key each one
  //console.log(_evt.keyCode); //the press key each one
  //var numero = nameValue.length;
  //key code number 48-57 numb pad 96-105
  //if(_evt.key>=0 || _evt.key<=9){ //considera " " space como numero :( nose porque
    //console.log("es numero");
    //nameValue = nameValue.slice(0,numero-1);
    //nombre.val(nameValue);
  //}
  if((_evt.keyCode >= 48 && _evt.keyCode <= 57) || ( _evt.keyCode >= 96 && _evt.keyCode <= 105)){
    _evt.preventDefault(); // ya no se escriben numeroos!!!
  }
}
