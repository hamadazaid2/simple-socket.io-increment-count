const socket = io();
const countLabel = document.querySelector("#count");

// Recieve an event

socket.on("countUpdated", (count) => {
  console.log("The count has been updated !:)", count);
  countLabel.textContent = count;
});

// Emit an evnet (send)
document.querySelector("#increment").addEventListener("click", () => {
  console.log("Clicked");
  socket.emit("increment");
});
