import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import useForm from '../../shared/hooks/use-form';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card/Card';
import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=1600',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484445,
            lng: -73.9878584
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'Big Ben',
        description: 'Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster in London, England, and the name is frequently extended to refer also to the clock and the clock tower. ',
        imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1600',
        address: 'London SW1A 0AA, United Kingdom',
        location: {
            lat: 51.5007325,
            lng: -0.1268141
        },
        creatorId: 'u2'
    },
    {
        id: 'p3',
        title: 'Eiffel Tower',
        description: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.',
        imageUrl: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris, France',
        location: {
            lat: 48.8583736,
            lng: 2.2901039
        },
        creatorId: 'u3'
    },
];

const UpdatePlace = () => {

    const [isLoading, setIsLoading] = useState(true);

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

    const toBeUpdatedPlace = DUMMY_PLACES.find(place => place.id === placeId);

    useEffect(() => {

        if (toBeUpdatedPlace) {
            setFormData({
                title: {
                    value: toBeUpdatedPlace.title,
                    isValid: true
                },
                description: {
                    value: toBeUpdatedPlace.description,
                    isValid: true
                }
            }, true);
        }

        setIsLoading(false);

    }, [setFormData, toBeUpdatedPlace]);

    if (!toBeUpdatedPlace) {
        return (
            <div className="center">
                <Card style={{ padding: '1rem' }}>
                    <h2>Could not find the place!</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    const formSubmitHandler = (event) => {

        event.preventDefault();

        // Send data to backend
        console.log(formState.inputs, formState.isValid);

    };

    return (
        <form className='place-form' onSubmit={formSubmitHandler}>
            <Input
                id="title"
                type="text"
                element="input"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputChangeHandler}
                initialValue={formState.inputs.title.value}
                initialValidity={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (atleast 5 characters)."
                onInput={inputChangeHandler}
                initialValue={formState.inputs.description.value}
                initialValidity={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>Update</Button>
        </form>
    )
};

export default UpdatePlace;