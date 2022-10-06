import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import useForm from '../../shared/hooks/use-form';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import AuthContext from '../../shared/store/auth-context';
import './Auth.css';

const Auth = () => {

    const authContext = useContext(AuthContext);

    const [isLogInMode, setIsLogInMode] = useState(true);

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
                name: undefined
                // If both are valid, then only set the overall form state to valid,
                // since, we're going from signup to login mode
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }

        else {
            // If we are in login mode
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
                // If we are switching to signup mode, then name input is added and 
                // hence, the overall form will be invalid since name field will be empty
            }, false);
        }

        setIsLogInMode(prev => !prev);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        authContext.login();
    };

    return (
        <Card className="authentication" style={{ padding: '1rem' }}>
            <h2>Login</h2>
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
                    validators={[VALIDATOR_MINLENGTH(5)]}
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
    )
};

export default Auth;