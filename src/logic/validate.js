export function SETinputListeners() {
  const inputs = GETallInputs();
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
}
export function SETsubmitListeners() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    HANDLEformSubmit(e.currentTarget);
  });
}

function HANDLEvalidity(inputELEMENT) {
  console.log(inputELEMENT);
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
  if (inputTYPE === "password") {
    return GETpasswordValidityInfo(reqVALUE);
  }

  // expected return => { ISvalid, errorMESSAGE }
}

function GETfullNameValidityInfo(reqVALUE) {
  const DOESNTincludeNumbers = /^[^0-9]*$/.test(reqVALUE);
  const HASvalidLenght = /^.{2,}$/.test(reqVALUE);

  let ISvalid = true;
  let errorMESSAGE = "";

  if (!HASvalidLenght) {
    ISvalid = false;
    errorMESSAGE = "⚠️ Your name must include atleast 2 characters";
  }
  if (!DOESNTincludeNumbers) {
    ISvalid = false;
    errorMESSAGE = "⚠️ Your name cannot include numbers";
  }
  if (reqVALUE === "") {
    ISvalid = false;
    errorMESSAGE = "⚠️️ Uh-oh, we can not read your mind just yet.";
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
    errorMESSAGE = "⚠️️ Uh-oh, is your email might be on vacation.";
  }

  return { ISvalid, errorMESSAGE };
}
function GETpasswordValidityInfo(reqVALUE) {
  const passwordREGEX = /.{6,}/;

  let ISvalid = true;
  let errorMESSAGE = "";

  if (!passwordREGEX.test(reqVALUE)) {
    ISvalid = false;
    errorMESSAGE = "⚠️ Your password must include at least 6 chracters";
  }
  if (reqVALUE === "") {
    ISvalid = false;
    errorMESSAGE = "⚠️️ Uh-oh, your password is playing hide and seek.";
  }
  return { ISvalid, errorMESSAGE };
}

function DISPLAYerrorMessage(inputBLOCK, ISvalid, errorMESSAGE) {
  const errorMessageELEMENT = inputBLOCK.querySelector(".inputALERT");
  inputBLOCK.setAttribute("data-valid", ISvalid);
  errorMessageELEMENT.textContent = errorMESSAGE;
  SHAKEerror(errorMessageELEMENT, ISvalid);
}
function SHAKEerror(errorMessageELEMENT, ISvalid) {
  const IScurrentlyShaking =
    errorMessageELEMENT.getAttribute("data-shaking") === "true";
  if (IScurrentlyShaking || ISvalid) return;

  errorMessageELEMENT.setAttribute("data-shaking", "true");
  setTimeout(() => {
    errorMessageELEMENT.setAttribute("data-shaking", "false");
  }, 810);
}

function HANDLEformSubmit(form) {
  const allINPUTS = GETallInputs();
  const ALLOWsubmit = ALLOWformSubmit(allINPUTS);

  if (!ALLOWsubmit) {
    allINPUTS.forEach((i) => HANDLEvalidity(i));
    return;
  }
  EDITformSubmitDate();
  form.submit();
}
function ALLOWformSubmit(allINPUTS) {
  return allINPUTS.every((i) => GETvalidityInfo(i).ISvalid === true);
}
function GETformSubmitDate() {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const now = new Date();
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}. ${month}, ${year} | ${hours}:${minutes}`;
}
function EDITformSubmitDate() {
  const hiddenTimeINPUT = document.querySelector("input[type='hidden']");
  hiddenTimeINPUT.setAttribute("value", GETformSubmitDate());
}
function GETallInputs() {
  return [...document.querySelectorAll("input")].filter(
    (i) => i.getAttribute("type") !== "hidden",
  );
}
