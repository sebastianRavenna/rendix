$(function(){
    
  const socket = io (); 

  // para obtener los DOM del chat
  const $messageForm = $("#message-form");
  const $messageBox = $("#message");
  const $chat = $("#chat");

  //para obtener los DOM del NicknameForm 
  const $nickForm = $("#nickForm");
  const $nickError = $("#nickError");
  const $nickname = $("#nickname");

  // para obtener los DOM del username
  const $users = $("#usernames");  

  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit("nuevo usuario", $nickname.val(), data => {
      if (data){
          $("#nickWrap").hide();
          $("#contentWrap").show();
      }else{
          $nickError.html(`
              <div class="alert alert-danger">
                  Ese usuario ya existe.
              </div>
          `)
      }
      $nickname.val("");
    });
  })

 // eventos
  $messageForm.submit( e => {
    e.preventDefault();
    socket.emit("enviar mensaje", $messageBox.val(), (data) => {
      $chat.append(`<p class="error">${data}</p>`);
    });
    $messageBox.val("");
    /*socket.emit("enviar mensaje", $messageBox.val());
    $messageBox.val("")*/
  });


  socket.on("nuevo mensaje", (data) =>{
    //displayMsg(data);
    $chat.append("<b>" + data.nick + "</b>: " + data.msg + "<br/>")
  });

  socket.on("usernames", data =>{
    let html ="";
    for (let i = 0; i < data.length; i++) {
        html+=`<p><i class="fas fa-user"></i> ${data[i]} </p>`
    }
    $users.html(html);
  })

  socket.on("whisper", data => {
    $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`)
  })

  socket.on("load old msgs", msgs => {
    for (let i = 0; i < msgs.length; i++) {
      displayMsg(msgs[i]);
    }
  })

  function displayMsg(data) {
    $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`)
  };

})