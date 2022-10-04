import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

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

const UserPlaces = () => {

    const params = useParams();

    const filteredPlaces = DUMMY_PLACES.filter(item => item.creatorId === params.userId)

    return <PlaceList items={filteredPlaces} />
};

export default UserPlaces;