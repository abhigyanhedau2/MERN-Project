import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {

    switch (action.type) {

        case 'INPUT_CHANGE':
            let formIsValid = true;

            for (const inputId in state.inputs) {

                // if any of the input fields is undefined
                if(!state.inputs[inputId])
                    continue;

                // If the id is provided, update the validity state
                if (inputId === action.inputId)
                    formIsValid = formIsValid && action.isValid;

                // Else, keep the previous validity state
                else
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
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
            };

        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
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

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    }, []);

    return [formState, inputHandler, setFormData];
};

export default useForm;