// As a user, I can:

// - See the timer increment every second once the page has loaded.
// - Manually increment and decrement the counter using the plus and minus buttons.
// - "Like" an individual number of the counter. I should see the count of the
//   number of "likes" associated with that number displayed.
// - Pause the counter, which should:
//   - pause the counter
//   - disable all buttons except the pause button
//   - switch the label on the button from "pause" to "resume"
// - Click the "restart" button to restart the counter and re-enable the buttons.
// - Leave comments on my gameplay, such as: "Wow, what a fun game this is."

// ## Timer Hints

// If you're not sure how to create or pause a timer, look into:

// - [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
// - [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
// - [`clearinterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content has loaded!");

  setInterval(() => handleCount(1), 1000);
});

let count = 0;
let paused = false;

const counter = document.querySelector("#counter");

const incrementButton = document.querySelector("#plus");
const decrementButton = document.querySelector("#minus");
const pauseButton = document.querySelector("#pause");
const heartButton = document.querySelector("#heart");
const restartButton = document.querySelector("#restart");
const submitButton = document.querySelector("#submit");

const likeList = document.querySelector(".likes");
const commentDisplay = document.querySelector("#list");
const form = document.getElementById("comment-form");
const logComment = document.getElementById("list");
const inputText = document.getElementById("comment-input");

const buttonList = [

  incrementButton,
  decrementButton,
  heartButton,
  restartButton,
  submitButton,
];

incrementButton.addEventListener("click", () => {
  handleCount(1);
});

decrementButton.addEventListener("click", () => {
  handleCount(-1);
});

pauseButton.addEventListener("click", () => {
  if (paused === true) {
    paused = false;
  } else if (paused === false) {
    paused = true;
  }

  pauseButton.textContent = paused ? "Resume" : "Pause";

  toggleButtonDisable(buttonList, paused);

  console.log(paused);
});

heartButton.addEventListener("click", () => {
  const likeComment = document.createElement("li");

  likeComment.textContent = `I like ${count}!`;

  likeList.append(likeComment);
});

restartButton.addEventListener("click", () => {
  count = 0;
  counter.textContent = count;

  likeList.innerHTML = "";
});

form.addEventListener("submit", logComments);

function logComments(event) {
  const newCommentList = document.createElement("ul");
  const newComment = document.createElement("li");

  newComment.textContent = inputText.value;
  newCommentList.append(newComment);
  logComment.append(newCommentList);
  form.reset();

  event.preventDefault();
}

function toggleButtonDisable(list, paused) {
  list.forEach((btn) => {
    btn.disabled = paused ? true : false;
  });
}

function handleCount(crement) {
  if (paused) {
    return;
  }
  count += crement;
  counter.textContent = count;
}
