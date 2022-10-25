import React, { Fragment, useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loadedUsers, setLoadedUsers] = useState([]);

    useEffect(() => {

        const sendRequest = async () => {

            try {

                setIsLoading(true);

                const response = await fetch('http://localhost:5000/api/v1/users');
                const data = await response.json();

                if (!response.ok)
                    throw new Error(data.message);


                setLoadedUsers(data.data.users);
                setIsLoading(false);

            } catch (error) {

                setIsLoading(false);
                setError(error.message);

            }

        };

        sendRequest();

    }, []);

    const errorHandler = () => {

        setError(null);

    };

    // return <UsersList items={USERS} />;
    return (
        <Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <div className='center'>
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </Fragment>
    );
};

export default Users;