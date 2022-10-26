import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttpClient from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {

    const [userPlaces, setUserPlaces] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const params = useParams();

    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const data = await sendRequest(`http://localhost:5000/api/v1/places/user/${params.userId}`)
                setUserPlaces(data.data.userPlaces);
            } catch (error) {

            }
        };

        fetchUserPlaces();

    }, [sendRequest, params.userId]);

    // const filteredPlaces = DUMMY_PLACES.filter(item => item.creatorId === params.userId)

    return (
        <Fragment>
            {isLoading && <div className='center'>
                <LoadingSpinner asOverlay />
            </div>}
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && userPlaces && <PlaceList items={userPlaces} />}
        </Fragment>
    );
};

export default UserPlaces;