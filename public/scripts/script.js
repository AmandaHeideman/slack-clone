//Det här är klientdelen

const socket = io();

let form = document.getElementById("form"); // 1 .när vi skickar in ett formulär så kommer det skapas ett event som heter submit.
let input = document.getElementById("input");
let messages = document.getElementById("messages");
let checkChannel = document.getElementById("channel");

form.addEventListener("submit", (e) => {
  //vi vill lyssna på när vi försöker submitta formuläret
  e.preventDefault(); //funktion som tar emot eventet, vad som ska hända när vi skickar
  //normalt när vi skicka så vill vi ju göra en post, men det vill vi inte här
  if (input.value) {
    //console.log('Sending message: ' + input.value + ' in channel ' + input.name);
    let data = { message: input.value, channel: input.name };
    socket.emit("chat message", data); //skickar med meddelande + vilken kanal till servern
  }

  input.value = "";
});

socket.on("chat message", (data) => {
  let message = data.message;
  let channel = data.channel;
  let user = "user: ";

  if (checkChannel.textContent == channel) {
    //skriver bara ut message ifall vi är i rätt kanal
    let item = document.createElement("li");
    let now = new Date().toString();
    let newDate = now.slice(0, 21);
    item.textContent = user + message + " : " + newDate;
    messages.appendChild(item);
  }
});
