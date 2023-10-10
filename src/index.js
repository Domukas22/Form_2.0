import returnText from "./logic/function";
import "./styles/reset.css";
import "./styles/main.css";

function print(textSTRING) {
  const text = document.createElement("h2");
  text.innerHTML = textSTRING;
  document.body.appendChild(text);
}

print(returnText());

print("hww");
