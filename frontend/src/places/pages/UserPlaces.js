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
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=1600',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484445,
            lng: -73.9878584
        },
        creatorId: 'u2'
    },
    {
        id: 'p3',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=1600',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484445,
            lng: -73.9878584
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