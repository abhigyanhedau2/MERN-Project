import React from 'react';
import Card from '../../shared/components/UIElements/Card/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No Places Found. Maybe Create One?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        )
    }

    const places = props.items.map(place => {
        return <PlaceItem
            key={place.id}
            id={place.id}
            imageUrl={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creatorId}
            coordinates={place.location}
        />
    })

    return (
        <ul className="place-list">
            {places}
        </ul>
    )
};

export default PlaceList;