import React from 'react';
import UsersList from '../components/UsersList';

const USERS = [
    {
        id: 'u1',
        name: 'Max',
        profileImg: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600',
        placesCount: 2
    },
    {
        id: 'u2',
        name: 'Kimberley',
        profileImg: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600',
        placesCount: 5
    },
    {
        id: 'u3',
        name: 'Alice',
        profileImg: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=1600',
        placesCount: 3
    }
];

const Users = () => {
    return <UsersList items={USERS} />;
};

export default Users;