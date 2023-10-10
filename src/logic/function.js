function AREinputsValid() {
  const inputs = [...document.querySelectorAll("input")].filter(
    (i) => i.getAttribute("type") !== "hidden",
  );
  return [...inputs].every((i) => i.checkValidity() === true);
}

export function TOGGLEsubmitBtn(btn) {
  const SHOULDbeActive = AREinputsValid();
  if (!SHOULDbeActive) {
    btn.classList.remove("active");
    return;
  }
  btn.classList.add("active");
}

export function GETdate() {
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
