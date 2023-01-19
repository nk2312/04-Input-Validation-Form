import { useReducer } from "react";

const INITIAL_STATE = { value: "", isTouched: false };

const inputReducerFunction = (state, action) => {
  if (action.type === "INPUT") {
    console.log("onchange is triggered")
    return {
      value: action.value,
      isTouched:state.isTouched
    };
  }
  if(action.type==='BLUR'){
    console.log("onBlur");
    return{
        isTouched:true,
        value:state.value
    }
  }
  if(action.type==='RESET'){
    return{
        isTouched:false,
        value:''
    }
  }
  return INITIAL_STATE;
};

const useInput = (valueFunction) => {
  // const [value, setValue] = useState("");
  // const [valueIsTouched, setValueIsTouched] = useState(false);

  const [stateInput, dispatch] = useReducer(
    inputReducerFunction,
    INITIAL_STATE
  );

  const valueIsValid = valueFunction(stateInput.value);
  const valueIsInValid = !valueIsValid && stateInput.isTouched;
  console.log(valueIsInValid);

  const valueHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };

  const valueBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  function reset() {
    dispatch({ type: "RESET" });
  }

  return {
    value:stateInput.value,
    valueIsValid,
    valueIsInValid,
    valueHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
