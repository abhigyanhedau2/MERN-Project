import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = (props) => {

    if (props.items.length === 0) {
        return (
            <div className='center'>
                <h2>No Users Found.</h2>
            </div>
        )
    }

    const users = props.items.map(user => {
        return <UserItem
            key={user.id}
            id={user.id}
            profileImg={user.profileImg}
            name={user.name}
            placesCount={user.placesCount}
        />
    })

    return (
        <ul className='users-list'>
            {users}
        </ul>
    )
};

export default UsersList;