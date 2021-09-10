if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de Service Worker exitoso', reg))
    .catch(err => console.warn('Error al registrar el Service Worker', err))
}

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
  then(device => {
    console.log('Dispositivo"' + device.name + '" selecionado');
    deviceCache = device;
    console.log(deviceCache);
    deviceCache.addEventListener('gattserverdisconnected',handleDisconnection);
    return deviceCache;
  });   
}

// Conectarse a un dispositivo específico, obtener servicio y características
function connectDeviceAndCacheCharacteristic(device) {
  console.log('Conectando a servidor GATT...');
  return device.gatt.connect().
      then(server => {
        console.log('Servidor GATT contectado, obteniendo servicio...');
        return server.getPrimaryService(0xFFE0);}).
      then(service => {
        console.log('Servicio encontrado, obteniendo caracteristica...');
        return service.getCharacteristic(0xFFE1);}).
      then(characteristic => {
        console.log('Caracteristica encontrada');   
        characteristicCache = characteristic;
        console.log(characteristicCache);
        return characteristicCache;
      });
}

// Habilitación para recibir notificaciones sobre cambios en las características
function startNotifications(characteristic) {
  console.log('Iniciando notificaciones...');
  return characteristic.startNotifications().
      then(() => {
        console.log('Notificaciones iniciadas');
        document.getElementById("final").style.backgroundColor = "rgba(100, 255, 100, 0.75)"; // en la seccion final se altera el color de fondo 
        characteristic.addEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);
          ;});      
}

// Manejo ante desconexion, reconexion
function handleDisconnection(event) {
  let device = event.target;
  console.log('Dispositivo"' + device.name +'" desconectado, Intentando reconectar...');
  document.getElementById("final").style.backgroundColor = "rgba(255, 100, 100, 0.75)"; // en la seccion final se altera el color de fondo 
  connectDeviceAndCacheCharacteristic(device).
    then(characteristic => startNotifications(characteristic));
}

// Desconectarse de un dispositivo conectado
function desconectar() {
  if (deviceCache) {
    console.log('Desconectando dispositivo "' + deviceCache.name + '"');
    deviceCache.removeEventListener('gattserverdisconnected', handleDisconnection);
    if (deviceCache.gatt.connected) {
      deviceCache.gatt.disconnect();
      console.log('Dispositivo"' + deviceCache.name + '" desconectado');
    }
    else {
      console.log('Dispositivo"' + deviceCache.name + '" ya esta desconectado');
    }
  }
  if (characteristicCache) {
    characteristicCache.removeEventListener('characteristicvaluechanged',
        handleCharacteristicValueChanged);
    characteristicCache = null;
  }
  deviceCache = null;
  document.getElementById("final").style.backgroundColor = "rgba(255, 100, 100, 0.75)"; // en la seccion final se altera el color de fondo 
}

// Recuperando datos desde dispositivo
function handleCharacteristicValueChanged(event) {
  let recibido = new TextDecoder().decode(event.target.value);
  console.log(recibido);

}

// Enviar datos al dispositivo conectado
function Enviar() {
  codigoSalida = String(codigoSalida)
  codigoSalida += '\n';
  console.log(codigoSalida);
  characteristicCache.writeValue(new TextEncoder().encode(codigoSalida)); // Escribir valor en característica
}

