var socket = io();

socket.on('message', addMessages);

$(() => {
    $("#send").click(()=>{
       sendMessage({
          name: $("#name").val(), 
          message:$("#message").val()});
        })
      getMessages()
    })
function addMessages(message){
   $("#messages").append(`
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>`)
   }
function getMessages(){
  $.get('http://35.199.115.157:80/messages', (data) => {
   data.forEach(addMessages);
   })
 }
function sendMessage(message){
   $.post('http://35.199.115.157:80/messages', message)
 }