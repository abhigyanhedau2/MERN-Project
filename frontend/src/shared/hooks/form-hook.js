import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;

            // For all inputs in the inputs object
            for (const inputId in state.inputs) {

                // if the current input is the input which got updated
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    // Set the previous value to it
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            }

        default:
            return state;
    }
};

const useForm = (initialInputs, initialFormValidity) => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    const inputChangeHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, [dispatch]);

    return [formState, inputChangeHandler];
};

export default useForm;