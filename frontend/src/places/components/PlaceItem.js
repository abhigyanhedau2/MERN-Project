import React, { Fragment, useState } from 'react';
import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import './PlaceItem.css';

const PlaceItem = (props) => {

    const [showMap, setShowMap] = useState(false);

    const toggleMapHandler = () => {
        setShowMap(prev => !prev);
    };

    return (
        <Fragment>
            <Modal
                show={showMap}
                onCancel={toggleMapHandler}
                header={props.address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button onClick={toggleMapHandler}>Close</Button>}
            >
                <div className="map-container">
                    <h2>The Map!</h2>
                </div>
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className="place-item__image">
                        <img src={props.imageUrl} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={toggleMapHandler}>View Place</Button>
                        <Button to={`/places/${props.id}`}>Edit</Button>
                        <Button danger>Delete</Button>
                    </div>
                </Card>
            </li>
        </Fragment>
    )
};

export default PlaceItem;