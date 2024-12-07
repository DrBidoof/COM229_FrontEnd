// src/reducers/modeReducer.js
const initialState = "light";

export default function modeReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_MODE":
      return state === "light" ? "dark" : "light";
    default:
      return state;
  }
}
