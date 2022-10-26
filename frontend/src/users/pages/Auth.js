import React, { useState, useContext, Fragment } from 'react';
import Card from '../../shared/components/UIElements/Card/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import useForm from '../../shared/hooks/use-form';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import AuthContext from '../../shared/store/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import useHttpClient from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import './Auth.css';

const Auth = () => {

    const authContext = useContext(AuthContext);

    const [isLogInMode, setIsLogInMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputChangeHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {

        // If we are in signup mode
        if (!isLogInMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                // If both are valid, then only set the overall form state to valid,
                // since, we're going from signup to login mode
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }

        else {
            // If we are in login mode
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
                // If we are switching to signup mode, then name input is added and 
                // hence, the overall form will be invalid since name field will be empty
            }, false);
        }

        setIsLogInMode(prev => !prev);
    };

    const formSubmitHandler = async (event) => {
        event.preventDefault();


        // Check if we're in login mode or signup mode
        if (isLogInMode) {

            try {

                const data = await sendRequest(`http://localhost:5000/api/v1/users/login`, 'POST', {
                    'Content-Type': 'application/json'
                },
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }));

                authContext.login(data.data.userId, data.data.token);

            } catch (error) {

            }

        }

        else {

            try {

                const formData = new FormData();
                formData.append('name', formState.inputs.name.value);
                formData.append('email', formState.inputs.email.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);

                const data = await sendRequest(`http://localhost:5000/api/v1/users/signup`, 'POST', {}, formData);

                authContext.login(data.data.userId, data.data.token);

            } catch (error) {

            }

        }

    };

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication" style={{ padding: '1rem' }}>
                {isLoading && <LoadingSpinner asOverlay />}
                {isLogInMode && <h2>Login</h2>}
                {!isLogInMode && <h2>Sign Up</h2>}
                <hr />
                <form onSubmit={formSubmitHandler}>
                    {!isLogInMode && (
                        <Input
                            id="name"
                            element="input"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name"
                            onInput={inputChangeHandler}
                        />
                    )}
                    {!isLogInMode && <ImageUpload id="image" onInput={inputChangeHandler} center />}
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputChangeHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password (atleast 5 characters)"
                        onInput={inputChangeHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLogInMode ? 'Login' : 'Signup'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    Switch to {isLogInMode ? 'Signup' : 'Login'}
                </Button>
            </Card>
        </Fragment>
    )
};

export default Auth;