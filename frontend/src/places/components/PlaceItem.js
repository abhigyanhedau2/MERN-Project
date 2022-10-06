import React, { Fragment, useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import Map from '../../shared/components/Map/Map';
import AuthContext from '../../shared/store/auth-context';
import './PlaceItem.css';

const PlaceItem = (props) => {

    const authContext = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const toggleMapHandler = () => {
        setShowMap(prev => !prev);
    };

    const toggleDeleteWarningHandler = () => {
        setShowConfirmModal(prev => !prev);
    };

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);

        console.log('Deleting...');
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
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={toggleDeleteWarningHandler}
                header="Are you sure?"
                footerClass='place-item__modal-actions'
                footer={<Fragment>
                    <Button inverse onClick={toggleDeleteWarningHandler}>Cancel</Button>
                    <Button danger onClick={confirmDeleteHandler}>Delete</Button>
                </Fragment>}
            >
                <p>Do you want to proceed and delete this place?</p>
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
                        {authContext.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button>}
                        {authContext.isLoggedIn && <Button danger onClick={toggleDeleteWarningHandler}>Delete</Button>}
                    </div>
                </Card>
            </li>
        </Fragment>
    )
};

export default PlaceItem;