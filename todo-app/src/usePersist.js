import { useEffect } from "react";

//adding the state to local storage
export function usePersistedContext(context, key = "state") {
  const persistedContext = localStorage.getItem(key);
  return persistedContext ? JSON.parse(persistedContext) : context;
}

export function usePersistedReducer([state, dispatch], key = "state") {
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [
    key,
    state
  ]);
  return [state, dispatch];
}
