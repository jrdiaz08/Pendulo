

var estadoBandinski = 1;
var velocidadG= 6993;
var cantidadG= 102;
var estadoPenDali = 1;
var caudal = 120;
var gatilloA = 1;
var gatilloB = 1;
var gatilloC = 1;
var gatilloD = 1;
var codigoSalida= null

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

function EnviarBankinski(){
  codigoSalida=(velocidadG)+(cantidadG*10000)+(estadoBandinski*10000000);
  Enviar()
}
function EnviarPenDali(){
  codigoSalida=(gatilloA)+(gatilloB*10)+(gatilloC*100)+(gatilloD*1000)+(caudal*10000)+(estadoPenDali*10000000);  
  Enviar()
}
function IniciarBankinski(){ //funcion para iniciar la maquina Bankinski v1
    estadoBandinski = 2;
  EnviarBankinski()
}
function DetenerBankinski(){ //funcion para detener la maquina Bankinski v1
    estadoBandinski = 1;
  EnviarBankinski()
}
function IniciarPenDali(){ //funcion para iniciar la maquina PenDali v1
  estadoPenDali = 2
  EnviarPenDali()
}
function DetenerPendali(){ //funcion para detener la maquina PenDali v1
  estadoPenDali = 1;
  EnviarPenDali()
}
function VelocidadG(){
    var VelocidadInv=document.getElementById("vel");
    velocidadG=parseInt((1000000/VelocidadInv.value));
    EnviarBankinski()
}
function CantidadG(){
    cantidadG=(document.getElementById("can").value);
    EnviarBankinski()
}
function Caudal(){
    caudal=(document.getElementById("cau").value);
    EnviarPenDali()
}
function GatilloA(){
  if (gatilloA==1){ // condicional que se cumple si gatillo es igual a cero
    gatilloA = 2;
    EnviarPenDali()   
  }else{
    gatilloA = 1;
    EnviarPenDali()
    }     
}
function GatilloB(){
  if (gatilloB==1){ // condicional que se cumple si gatillo es igual a cero
    gatilloB = 2;
    EnviarPenDali()   
  }else{
    gatilloB = 1;
    EnviarPenDali()
    }   
}
function GatilloC(){
  if (gatilloC==1){ // condicional que se cumple si gatillo es igual a cero
    gatilloC = 2;
    EnviarPenDali()   
  }else{
    gatilloC = 1;
    EnviarPenDali()
    }   
}
function GatilloD(){
  if (gatilloD==1){ // condicional que se cumple si gatillo es igual a cero
    gatilloD = 2;
    EnviarPenDali()   
  }else{
    gatilloD = 1;
    EnviarPenDali()
    }   
}