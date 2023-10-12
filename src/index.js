import "./styles/reset.css";
import "./styles/main.css";
import { SETinputListeners, SETsubmitListeners } from "./logic/validate";

(() => {
  SETinputListeners();
  SETsubmitListeners();
})();
