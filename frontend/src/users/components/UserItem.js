import React from 'react';
import './UserItem.css';
import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import Card from '../../shared/components/UIElements/Card/Card';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
    return (
        <li className='user-item'>
            <div className="user-item__content">
                <Card className="user-item__content">
                    <Link to={`/${props.id}/places`}>
                        <div className="user-item__image">
                            <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
                        </div>
                        <div className="user-item__info">
                            <h2>{props.name}</h2>
                            <h3>{props.placesCount} {props.placesCount === 1 ? 'Place' : 'Places'}</h3>
                        </div>
                    </Link>
                </Card>
            </div>
        </li>
    )
};

export default UserItem;