let serverModulePlugin = {
  addHandlers: (io,socket,fb,membersOnline,mailService)=>{
    console.log('Adding server module plugin...');
    fb.subscribeTo('buzz',data=>{
      let buzz = data.val();
      console.log(buzz);  
      io.emit('buzzUpdate',buzz);
    });  
    fb.subscribeTo('vibration',data=>{
      let vibration = data.val();
      console.log(vibration);
      io.emit('vibrationUpdate',vibration);
    });
    fb.subscribeTo('colorState',data=>{
      let color = data.val();
      console.log(color);
      io.emit('rgbLEDColorUpdate',color);
    });
    socket.on('buzzBuzzer', ()=>{
      fb.set('buzz',true);
    });
    socket.on('toggleColorState',() =>{
      fb.get('colorState',data=>{
        let color;
        if(data.val() == 'red'){
          color = 'purple';
        }else{
          color = 'red';
        }
        fb.set('colorState',color);
      }); 
    });
  }
}
module.exports = serverModulePlugin;



