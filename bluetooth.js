
// Informacion del dispositivo conectado, para reconexion
let deviceCache = null; //la variable inicia vacia
// Informacion de la caracteristica del dispositivo conectado
let characteristicCache = null; //la variable inicia vacia
// Inicia la selección y conexion del dispositivo Bluetooth

function conectar() { //se ejecuta la funcion al presionar el boton conectar
  if (deviceCache==null){ //condicional que se cumple cuando el dispositivo esta desconectado
    requestBluetoothDevice(). //ejecuta funcion para buscar dispositivo
    then(device => connectDeviceAndCacheCharacteristic(device)). //luego ejecuta la funcion para conectar dispositivo
    then(characteristic => startNotifications(characteristic)) //Luego ejecuta la funcion para activar notificaciones
  }      
}

// Solicitud de selección de dispositivo Bluetooth
function requestBluetoothDevice() { //ejecuta funcion para buscar dispositivo
  console.log('Buscando dispositivos Bluetooth...'); //muestra mensaje en consola
  return navigator.bluetooth.requestDevice({filters: [{services: [0xFFE0]}], }). //muestra los dispositivos disponibles con ese servicio
  then(device => { //sobre el dispositivo
    console.log('Dispositivo"' + device.name + '" selecionado'); //se muestra el mensaje por consola
    deviceCache = device; //se guarda la informacion del dispositivo 
    console.log(deviceCache); //se muestra la informacion del dispositivo por consola
    deviceCache.addEventListener('gattserverdisconnected',handleDisconnection); //se activa una alerta que actua cuando se pierde la conexion
    return deviceCache; // devuelve como resultado la informacion del dispositivo
  });   
}

// Conectarse a un dispositivo específico, obtener servicio y características
function connectDeviceAndCacheCharacteristic(device) { //ejecuta la funcion para obtener la caracteristica (de comunicacion) del dispositivo
  console.log('Conectando a servidor GATT...'); //se muestra el mensaje por consola
  return device.gatt.connect(). // se conecta el servidor
      then(server => { //sobre el servidor
        console.log('Servidor GATT contectado, obteniendo servicio...'); //se muestra el mensaje por consola
        return server.getPrimaryService(0xFFE0);}). // se obtiene el servicio del tipo especifico de la tarjeta bluetooth
      then(service => { //sobre el servicio
        console.log('Servicio encontrado, obteniendo caracteristica...'); //se muestra el mensaje por consola
        return service.getCharacteristic(0xFFE1);}). // se obtiene la caracteristica del tipo especifico de la tarjeta bluetooth
      then(characteristic => { //sobre la caracteristica
        console.log('Caracteristica encontrada'); //se muestra el mensaje por consola  
        characteristicCache = characteristic; //se guarda la informacion de la caracteristica
        console.log(characteristicCache); //se muestra la informacion de la caracteristica por consola
        return characteristicCache; // devuelve como resultado la informacion de la caracteristica
      });
}

// Habilitación para recibir notificaciones sobre cambios en las características
function startNotifications(characteristic) { //se ejecuta la funcion para iniciar notificaciones de comunicacion
  console.log('Iniciando notificaciones...'); //se muestra el mensaje por consola
  return characteristic.startNotifications(). // devuelve como resultado la propiedad de la caracteristica para iniciar notificaciones
      then(() => { // sobre las notificaciones
        console.log('Notificaciones iniciadas'); //se muestra el mensaje por consola
        document.getElementById("final").style.backgroundColor = "rgba(100, 255, 100, 0.75)"; // en la seccion final se altera el color de fondo para confirmar la correcta conexion
        characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged); //se activa una alerta que actua cuando cambia el valor de una caracteristica (envio o recepcion de informacion)
          ;});      
}

// Manejo ante desconexion, reconexion
function handleDisconnection(event) { // ejecuta la funcion que maneja una desconexion 
  let device = event.target; //el dispositivo toma el valor del evento
  console.log('Dispositivo"' + device.name +'" desconectado, Intentando reconectar...'); //se muestra el mensaje por consola
  document.getElementById("final").style.backgroundColor = "rgba(255, 100, 100, 0.75)"; // en la seccion final se altera el color de fondo para indicar una desconexion
  connectDeviceAndCacheCharacteristic(device). // se ejecuta la funcion para reconectar el dispositivo
    then(characteristic => startNotifications(characteristic)); //se ejecuta la funcion para iniciar notificaciones de comunicacion
}

// Desconectarse de un dispositivo conectado
function desconectar() { //ejecuta la funcion para desconectar el dispositivo
  if (deviceCache) { // condicional que se cumple si ya hay un dispositivo conectado
    console.log('Desconectando dispositivo "' + deviceCache.name + '"'); //se muestra el mensaje por consola
    deviceCache.removeEventListener('gattserverdisconnected', handleDisconnection); //se desactiva la alerta que actua cuando se pierde la conexion
    if (deviceCache.gatt.connected) { // condicional que se cumple si ya hay un dispositivo conectado
      deviceCache.gatt.disconnect(); // Desconecta el servidor GATT
      console.log('Dispositivo"' + deviceCache.name + '" desconectado'); //se muestra el mensaje por consola
    }
    else {
      console.log('Dispositivo"' + deviceCache.name + '" ya esta desconectado'); //se muestra el mensaje por consola
    }
  }
  if (characteristicCache) { // condicional que se cumple si hay infomacion de caracteristica guardada
    characteristicCache.removeEventListener('characteristicvaluechanged', handleCharacteristicValueChanged); //se desactiva una alerta que actua cuando cambia el valor de una caracteristica (envio o recepcion de informacion)  
    characteristicCache = null; // se borra la informacion de la caracteristica del dispositivo
  }
  deviceCache = null; // se borra la informacion del dispositivo
  document.getElementById("final").style.backgroundColor = "rgba(255, 100, 100, 0.75)"; // en la seccion final se altera el color de fondo para indicar la desconexion
}

// Recuperando datos desde dispositivo
function handleCharacteristicValueChanged(event) { // se ejecuta la funcion que recibe informacion
  let recibido = new TextDecoder().decode(event.target.value); // se guarda la informacion recibida 
  console.log(recibido); // se muestra el mensaje recibido por consola

}

// Enviar datos al dispositivo conectado
function Enviar() { // se ejecuta la funcion para enviar informacion
  codigoSalida = String(codigoSalida) //tranforma en codigo de salida en una cadena de caracteres
  codigoSalida += '\n'; // se le adiciona la indicacion de finde linea
  console.log(codigoSalida); // muestra la informacion enviada por consola
  characteristicCache.writeValue(new TextEncoder().encode(codigoSalida)); // Escribir valor en característica
}

