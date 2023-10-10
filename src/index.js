import "./styles/reset.css";
import "./styles/main.css";
import { GETdate, TOGGLEsubmitBtn } from "./logic/function";

const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const submitBTN = document.querySelector('button[type="submit"]');
const hiddenTimeINPUT = document.querySelector("input[type='hidden']");

inputs.forEach((i) =>
  i.addEventListener("input", () => {
    TOGGLEsubmitBtn(submitBTN);
  }),
);
form.addEventListener("submit", () => {
  hiddenTimeINPUT.setAttribute("value", GETdate());
});
