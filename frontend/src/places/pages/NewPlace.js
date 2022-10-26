import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../shared/hooks/use-form';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import useHttpClient from '../../shared/hooks/http-hook';
import AuthContext from '../../shared/store/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './PlaceForm.css';

const NewPlace = () => {

    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const authContext = useContext(AuthContext);

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


    const formSubmitHandler = async (event) => {
        event.preventDefault();

        try {

            await sendRequest('http://localhost:5000/api/v1/places', 'POST', {
                'Content-Type': 'application/json'
            },
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: authContext.userId
                }));

            navigate('/');

            // Redirect user to different page
        } catch (error) {

        }
    };

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={formSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
        </Fragment>
    )
};

export default NewPlace;