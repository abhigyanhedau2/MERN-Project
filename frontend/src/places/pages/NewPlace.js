import React from 'react';
import useForm from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './PlaceForm.css';

const NewPlace = () => {

    const [formState, inputChangeHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);


    const formSubmitHandler = (event) => {
        event.preventDefault();

        // Send data to backend
        console.log(formState.inputs);
    };

    return (
        <form className='place-form' onSubmit={formSubmitHandler}>
            <Input
                id="title"
                element='input'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid title.'
                onInput={inputChangeHandler}
            />
            <Input
                id="description"
                element='textarea'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Please enter a valid description (atleast 5 characters).'
                onInput={inputChangeHandler}
            />
            <Input
                id="address"
                element='input'
                label='Address'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid address'
                onInput={inputChangeHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
        </form>
    )
};

export default NewPlace;