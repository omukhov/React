import { createContext, useReducer, useRef } from "react";

export const LoadingContext = createContext();

const initialState = {
  requests: 0,
};

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

  const startLoading = () => {
    clearTimeout(timer.current);

    dispatch({
      type: "START",
    });
  };

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
