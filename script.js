const disp = document.getElementById("display");
const board = document.getElementById("row1");
const board1 = document.getElementById("row2");
const board2 = document.getElementById("row3");
const board3 = document.getElementById("row4");
const rules = document.getElementById("rules");
const btn2 = document.getElementById("play");
const btn = document.getElementById("btn");
const set = ["red", "blue", "yellow", "green", "orange", "brown"];
const hint = document.getElementById("hint");
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", rule);
btn2.addEventListener("click", playGame);
/*function playGame() {
  if (board.classList.contains("row")) {
    board1.classList.remove("row");
    board2.classList.remove("row");
    board3.classList.remove("row");
    board.classList.remove("row");
    btn1.classList.add("btn1");
    btn.classList.remove("btn");
    
    btn2.innerText = "BACK TO HOME";
  } else {
    board.classList.add("row");
    board1.classList.add("row");
    board2.classList.add("row");
    board3.classList.add("row");
    btn.classList.add("btn");
    btn1.classList.remove("btn1");
    document.querySelectorAll('input[type="radio"]').forEach((e1), => {e1.checked=false; attempts=6; })*/
function playGame() {
  if (board.classList.contains("row")) {
    board1.classList.remove("row");
    board2.classList.remove("row");
    board3.classList.remove("row");
    board.classList.remove("row");
    btn1.classList.add("btn1");
    btn.classList.remove("btn");
    
    btn2.innerText = "BACK TO HOME";
  } else {
    board.classList.add("row");
    board1.classList.add("row");
    board2.classList.add("row");
    board3.classList.add("row");
    btn.classList.add("btn");
    btn1.classList.remove("btn1");
    document.querySelectorAll('input[type="radio"]').forEach((e1) =>{ e1.checked = false});
    attempts=6;
    hint.innerText = "";
    btn2.innerText = "PLAY";
  }
}
   
function rule() {
  if (rules.classList.contains("rules")) {
    rules.classList.remove("rules");
    btn.classList.add("btn");
    btn2.classList.add("play");
    btn1.innerText = "BACK";
  } else {
    rules.classList.add("rules");
    btn2.classList.remove("play");
    btn1.innerText = "RULES";
  }
}
let attempts = 6;
btn.disabled = true;

function checkSelections() {
  const selected = document.querySelectorAll('input[type="radio"]:checked');
  btn.disabled = selected.length !== 4;
}
document.querySelectorAll('input[type="radio"]').forEach((input) => {
  input.addEventListener("change", checkSelections);
});
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const answer = shuffle(set).slice(0, 4);

btn.addEventListener("click", () => {
  const selected = [];

  document.querySelectorAll('input[name="color1"]:checked').forEach((item) => {
    selected.push(item.value);
  });
  document.querySelectorAll('input[name="color2"]:checked').forEach((item) => {
    selected.push(item.value);
  });
  document.querySelectorAll('input[name="color3"]:checked').forEach((item) => {
    selected.push(item.value);
  });
  document.querySelectorAll('input[name="color4"]:checked').forEach((item) => {
    selected.push(item.value);
  });
  match(selected, answer);
  if (attempts === 0) {
    hint.innerText = `You Have Lost The Game!, Correct answer was ${answer}`;
     hint.style.fontSize = "50px";
    hint.style.fontWeight = "bold";

    answer=shuffle(set).slice(0, 4);
   
    btn.disabled = true;
  } else {
    attempts--;
  }
  console.log(attempts);
});
function match(color, answer) {
  let black = 0;
  let white = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (color[i] === answer[j] && i === j) {
        white++;
      } else if (color[i] === answer[j] && i !== j) {
        black++;
      } else {
        // Do nothing
      }
    }
  }
  if (white == 4) {
    hint.innerText = `You Have WON The Game!`;
    hint.style.fontSize = "50px";
    hint.style.fontWeight = "bold";
    btn.disabled = true;
    answer=shuffle(set).slice(0, 4);
  } else {
    hint.innerText = `black: ${black}  (color correct), white: ${white}(pos correct)`;
    hint.style.fontSize = "30px";
  }
  console.log(black);
  console.log(white);
  console.log(answer);
  console.log(attempts);
}
