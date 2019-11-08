import React from "react";

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export const StateProvider = StateContext.Provider;
export const DispatchProvider = DispatchContext.Provider;

export function useDispatch() {
  const dispatch = React.useContext(DispatchContext);
  return dispatch;
}

export function useSelector(selector) {
  const state = React.useContext(StateContext);
  const slice = selector(state);
  return slice;
}
