import "./styles/reset.css";
import "./styles/main.css";
import { GETdate } from "./logic/validate";

const form = document.querySelector("form");
const hiddenTimeINPUT = document.querySelector("input[type='hidden']");
const inputs = document.querySelectorAll("input");

inputs.forEach((i) => {
  let touched = false;
  i.addEventListener("change", () => {
    touched = true;
  });
  i.addEventListener("focus", (e) => {
    const parentInputBLOCK = e.currentTarget.parentElement.parentElement;
    parentInputBLOCK.setAttribute("data-input_focused", "true");
    parentInputBLOCK.setAttribute("data-valid", "");
  });
  i.addEventListener("focusout", (e) => {
    const parentInputBLOCK = e.currentTarget.parentElement.parentElement;
    parentInputBLOCK.setAttribute("data-input_focused", "false");
  });
  i.addEventListener("blur", (e) => {
    if (!touched) return;
    HANDLEvalidity(e.currentTarget);
  });
});
form.addEventListener("submit", () => {
  hiddenTimeINPUT.setAttribute("value", GETdate());
});

function HANDLEvalidity(inputELEMENT) {
  const parentInputBLOCK = inputELEMENT.parentElement.parentElement;
  const { ISvalid, errorMESSAGE } = GETvalidityInfo(inputELEMENT);
  DISPLAYerrorMessage(parentInputBLOCK, ISvalid, errorMESSAGE);
}

function GETvalidityInfo(inputELEMENT) {
  const inputTYPE = inputELEMENT.id;
  const reqVALUE = inputELEMENT.value;

  if (inputTYPE === "fullname") {
    return GETfullNameValidityInfo(reqVALUE);
  }
  if (inputTYPE === "email") {
    return GETemailValidityInfo(reqVALUE);
  }
}
function GETfullNameValidityInfo(reqVALUE) {
  const DOESNTincludeNumbers = /^[^0-9]*$/.test(reqVALUE);
  const HASvalidLenght = /^.{2,}$/.test(reqVALUE);

  let ISvalid = true;
  let errorMESSAGE = "";

  if (!HASvalidLenght) {
    ISvalid = false;
    errorMESSAGE = "⚠️ Your name must include atleast 2 letters";
  }
  if (!DOESNTincludeNumbers) {
    ISvalid = false;
    errorMESSAGE = "⚠️ Your name cannot include numbers";
  }
  if (reqVALUE === "") {
    ISvalid = false;
    errorMESSAGE = "⚠️ Your name is required";
  }

  return { ISvalid, errorMESSAGE };
}
function GETemailValidityInfo(reqVALUE) {
  const emailREGEX =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/;

  let ISvalid = true;
  let errorMESSAGE = "";

  if (!emailREGEX.test(reqVALUE)) {
    ISvalid = false;
    errorMESSAGE = "⚠️ Please use this format → name@example.com";
  }
  if (reqVALUE === "") {
    ISvalid = false;
    errorMESSAGE = "⚠️ Email is required.";
  }

  return { ISvalid, errorMESSAGE };
}

function DISPLAYerrorMessage(inputBLOCK, ISvalid, errorMESSAGE) {
  const errorMessageELEMENT = inputBLOCK.querySelector(".inputALERT");
  inputBLOCK.setAttribute("data-valid", ISvalid);
  errorMessageELEMENT.textContent = errorMESSAGE;
}
