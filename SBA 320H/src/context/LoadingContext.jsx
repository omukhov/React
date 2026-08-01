import { createContext, useReducer, useRef } from "react";

export const LoadingContext = createContext();

const initialState = {
  requests: 0,
};

// Reducer example function
function reducer(state, action) {
  switch (action.type) {
    case "START":
      return {
        requests: state.requests + 1,
      };

    case "STOP":
      return {
        requests: Math.max(0, state.requests - 1),
      };

    default:
      return state;
  }
}

export function LoadingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const timer = useRef(null);

  // SetInterval need for smooth working application
  const startLoading = () => {
    clearTimeout(timer.current);

    dispatch({
      type: "START",
    });
  };

  // Every loader will be works minimum 300ms, this prevents blinking.
  const stopLoading = () => {
    timer.current = setTimeout(() => {
      dispatch({
        type: "STOP",
      });
    }, 300);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading: state.requests > 0,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
