//Det här är klientdelen

const socket = io();

let form = document.getElementById("form"); // 1 .när vi skickar in ett formulär så kommer det skapas ett event som heter submit.
let input = document.getElementById("input");
let messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  //vi vill lyssna på när vi försöker submitta formuläret
  e.preventDefault(); //funktion som tar emot eventet, vad som ska hända när vi skickar
  //normalt när vi skicka så vill vi ju göra en post, men det vill vi inte här
  if (input.value) {
    //console.log("sending message: " + input.value);
    socket.emit("chat message", input.value); //chat mesage är eventet.
  }

  input.value = "";
});

socket.on("chat message", (message) => {
  let item = document.createElement("li");
  let user = "user: "
  let now = new Date().toString();
  let newDate = now.slice(0, 21)
  console.log(newDate);
  item.textContent = user + message + " : " + newDate;


  messages.appendChild(item);

});

