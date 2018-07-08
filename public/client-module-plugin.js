var client_module_plugin = {
init: (socket,firebaseUser)=>{
  console.log('Initializing client module plugin...');
  let buzzerCard = new window.Card("https://cdn.glitch.com/f0fe6efa-d0a9-4419-9a51-6afe79b04bc5%2Fvib.png", "Piezo Buzzer");
  buzzerCard.addButton("Buzz Buzzer",e=>{
    socket.emit("buzzBuzzer");
  });
  socket.on('buzzUpdate',data=>{
    console.log(data);
    buzzerCard.setReadOut(`Buzzer Buzzing State: ${data}`);
  });
  let vibrationSensorCard = new window.Card("https://cdn.glitch.com/f0fe6efa-d0a9-4419-9a51-6afe79b04bc5%2Fvib.png","Vibration Sensor");
  vibrationSensorCard.addDial(10000);
  socket.on('vibrationUpdate',data=>{
    console.log(data);
    //vibrationSensorCard.setReadOut(`Vibration Level: ${data}`);
    vibrationSensorCard.dial.update(data);
  }); 
  let rgbLEDCard = new window.Card("https://cdn.glitch.com/f0fe6efa-d0a9-4419-9a51-6afe79b04bc5%2Frgbled.png","RGB LED");
  rgbLEDCard.addButton("Toggle Color",e=>{
     socket.emit('toggleColorState');
  });
  socket.on('rgbLEDColorUpdate', data=>{
     console.log(data);
     rgbLEDCard.setReadOut(`Current Color: ${data}`);
  });  
  
}
}


