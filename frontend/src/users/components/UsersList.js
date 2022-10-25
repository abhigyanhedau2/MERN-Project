import React from 'react';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card/Card';
import './UsersList.css';

const UsersList = (props) => {

    if (props.items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2>No Users Found.</h2>
                </Card>
            </div>
        )
    }

    const users = props.items.map(user => {
        return <UserItem
            key={user.id}
            id={user.id}
            profileImg={user.image}
            name={user.name}
            placesCount={user.places.length}
        />
    })

    return (
        <ul className='users-list'>
            {users}
        </ul>
    )
};

export default UsersList;