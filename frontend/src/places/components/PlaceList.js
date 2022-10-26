import React from 'react';
import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card className="place-list-card">
                    <h2>No Places Found. Maybe Create One?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        )
    }

    const places = props.items.map(place => {
        return <PlaceItem
            key={place.id}
            id={place.id}
            imageUrl={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
        />
    })

    return (
        <ul className="place-list">
            {places}
        </ul>
    )
};

export default PlaceList;