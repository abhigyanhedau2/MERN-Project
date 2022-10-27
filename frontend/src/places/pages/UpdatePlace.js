import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import useForm from '../../shared/hooks/use-form';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card/Card';
import useHttpClient from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import AuthContext from '../../shared/store/auth-context';
import './PlaceForm.css';

const UpdatePlace = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();

    const placeId = useParams().placeId;

    const [formState, inputChangeHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const data = await sendRequest(`${process.env.REACT_APP_HOME_URL}/api/v1/places/${placeId}`, 'GET');
                console.log('fetch');
                setLoadedPlace(data.data.place);
                console.log(data.data.place);
                setFormData({
                    title: {
                        value: data.data.place.title,
                        isValid: true
                    },
                    description: {
                        value: data.data.place.description,
                        isValid: true
                    }
                }, true);
            } catch (error) {

            }
        };

        fetchPlace();

    }, [sendRequest, placeId, setFormData]);

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card style={{ padding: '1rem' }}>
                    <h2>Could not find the place!</h2>
                </Card>
            </div>
        );
    }

    const formSubmitHandler = async (event) => {

        event.preventDefault();

        try {
            await sendRequest(`${process.env.REACT_APP_HOME_URL}/api/v1/places/${placeId}`, 'PATCH', {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authContext.token}`
            },
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }));

            navigate(`/${authContext.userId}/places`);

        } catch (error) {

        }

    };

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (<form className='place-form' onSubmit={formSubmitHandler}>
                <Input
                    id="title"
                    type="text"
                    element="input"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputChangeHandler}
                    initialValue={loadedPlace.title}
                    initialValidity={true}
                />
                <Input
                    id="description"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (atleast 5 characters)."
                    onInput={inputChangeHandler}
                    initialValue={loadedPlace.description}
                    initialValidity={true}
                />
                <Button type="submit" disabled={!formState.isValid}>Update</Button>
            </form>)}
        </Fragment>
    )
};

export default UpdatePlace;