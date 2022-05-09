
if ('serviceWorker' in navigator) { //se activa la funcion de service worker, esta solo puede funcionar en el protocolo HTTPS
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de Service Worker exitoso', reg))
    .catch(err => console.warn('Error al registrar el Service Worker', err))
}
var estadoBandinski = 1; //Estado inicaial de variable
var velocidadG= 5000; //Estado inicaial de variable
var cantidadG= 102; //Estado inicaial de variable
var estadoPenDali = 1; //Estado inicaial de variable
var caudal = 120; //Estado inicaial de variable
var gatilloA = 1; //Estado inicaial de variable
var gatilloB = 1; //Estado inicaial de variable
var gatilloC = 1; //Estado inicaial de variable
var gatilloD = 1; //Estado inicaial de variable
var codigoSalida= null //Estado inicaial de variable

setTimeout(function () { // se ejecuta la funcion una vez se carga la pagina, con un retraso definido
    document.getElementById('loader').style.transform="scale(0)"; // en la seccion loader se altera la propiedad css escala   
},2000); // el retraso definido en milisegundos

function fecha() { // funcion que extrae la fecha del navegador, codigo descargado
    var hoy = new Date();
    var m = new Array();
    var d = new Array();
    var an= hoy.getFullYear();
    m[0]="Enero";  m[1]="Febrero";  m[2]="Marzo";
    m[3]="Abril";   m[4]="Mayo";  m[5]="Junio";
    m[6]="Julio";    m[7]="Agosto";   m[8]="Septiembre";
    m[9]="Octubre";   m[10]="Noviembre"; m[11]="Diciembre";
    document.write(hoy.getDate());
    document.write(" de ");
    document.write(m[hoy.getMonth()]);
    document.write(" ");
    document.write(hoy.getFullYear());   
}

function EnviarBankinski(){ //funcion para enviar la informacion a la maquina Bandinski v1
  codigoSalida=(velocidadG)+(cantidadG*10000)+(estadoBandinski*10000000); //se calcula el codigo de salida como un solo numero entero
  Enviar() //Envia el codigo a la maquina Bandinski v1
}
function EnviarPenDali(){ //funcion para enviar la informacion a la maquina PenDali v1
  codigoSalida=(gatilloA)+(gatilloB*10)+(gatilloC*100)+(gatilloD*1000)+(caudal*10000)+(estadoPenDali*10000000);  //se calcula el codigo de salida como un solo numero entero
  Enviar() //Envia el codigo a la maquina
}
function IniciarBankinski(){ //funcion para iniciar la maquina Bandinski v1
    estadoBandinski = 2; // se cambia el estado con el numero de esta variable
  EnviarBankinski() //Se ejecuta dicha funcion
}
function DetenerBankinski(){ //funcion para detener la maquina Bankinski v1
    estadoBandinski = 1; // se cambia el estado con el numero de esta variable
  EnviarBankinski() //Se ejecuta dicha funcion
}
function IniciarPenDali(){ //funcion para iniciar la maquina PenDali v1
  estadoPenDali = 2 // se cambia el estado con el numero de esta variable
  EnviarPenDali() //Se ejecuta dicha funcion
}
function DetenerPendali(){ //funcion para detener la maquina PenDali v1
  estadoPenDali = 1; // se cambia el estado con el numero de esta variable
  EnviarPenDali() //Se ejecuta dicha funcion
}
function VelocidadG(){ //funcion que determina la velocidad de giro
    var VelocidadInv=document.getElementById("vel"); // se referencia el input slider de velocidad
    velocidadG=(-1*VelocidadInv.value); // se transforma la informacion capturada para que el slider tenga un efecto inverso
    EnviarBankinski() //Se ejecuta dicha funcion
}
function CantidadG(){ //funcion que determina la cantidad de giro
    cantidadG=(document.getElementById("can").value); // se referencia el input slider de cantidad
    EnviarBankinski() //Se ejecuta dicha funcion
}
function Caudal(){ //funcion que determina el caudal de pintura
    caudal=(document.getElementById("cau").value); // se referencia el input slider de caudal
    EnviarPenDali()//Se ejecuta dicha funcion
}
function GatilloA(){ //funcion que activa/desactiva la dosificacion de pintura de dicho motor
  if (gatilloA==1){ // condicional que se cumple si gatillo es igual a uno
    gatilloA = 2; // se cambia el estado con el numero de esta variable
    document.getElementById("A").style.backgroundColor = "rgba(237, 255, 75)";// en el boton se altera el color de fondo para indicar su estado
    EnviarPenDali() //Se ejecuta dicha funcion   
  }else{
    gatilloA = 1; // se cambia el estado con el numero de esta variable
    document.getElementById("A").style.backgroundColor = "rgba(255, 255, 255)";// en el boton se altera el color de fondo para indicar su estado
    EnviarPenDali() //Se ejecuta dicha funcion
    }     
}
function GatilloB(){ //funcion que activa/desactiva la dosificacion de pintura de dicho motor
  if (gatilloB==1){ // condicional que se cumple si gatillo es igual a uno
    gatilloB = 2; // se cambia el estado con el numero de esta variable
    document.getElementById("B").style.backgroundColor = "rgba(237, 255, 75)";// en el boton se altera el color de fondo para indicar su estado
    EnviarPenDali() //Se ejecuta dicha funcion  
  }else{
    gatilloB = 1; // se cambia el estado con el numero de esta variable
    document.getElementById("B").style.backgroundColor = "rgba(255, 255, 255)";// en el boton se altera el color de fondo para indicar su estado
    EnviarPenDali() //Se ejecuta dicha funcion
    }   
}
function GatilloC(){ //funcion que activa/desactiva la dosificacion de pintura de dicho motor
  if (gatilloC==1){ // condicional que se cumple si gatillo es igual a uno
    document.getElementById("C").style.backgroundColor = "rgba(237, 255, 75)";// en el boton se altera el color de fondo para indicar su estado
    gatilloC = 2; // se cambia el estado con el numero de esta variable
    EnviarPenDali() //Se ejecuta dicha funcion   
  }else{
    gatilloC = 1; // se cambia el estado con el numero de esta variable
    document.getElementById("C").style.backgroundColor = "rgba(255, 255, 255)";// en el boton se altera el color de fondo para indicar su estado
    EnviarPenDali() //Se ejecuta dicha funcion
    }   
}
function GatilloD(){ //funcion que activa/desactiva la dosificacion de pintura de dicho motor
  if (gatilloD==1){ // condicional que se cumple si gatillo es igual a uno
    gatilloD = 2; // se cambia el estado con el numero de esta variable
    document.getElementById("D").style.backgroundColor = "rgba(237, 255, 75)";// en el boton se altera el color de fondo para indicar su estado
    EnviarPenDali() //Se ejecuta dicha funcion   
  }else{
    gatilloD = 1; // se cambia el estado con el numero de esta variable
    document.getElementById("D").style.backgroundColor = "rgba(255, 255, 255)";// en el boton se altera el color de fondo para indicar su estado
    EnviarPenDali() //Se ejecuta dicha funcion
    }   
}