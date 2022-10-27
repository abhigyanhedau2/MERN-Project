import React, { Fragment, useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import useHttpClient from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {

            try {
                const data = await sendRequest(`${process.env.REACT_APP_HOME_URL}/api/v1/users`, 'GET');
                setLoadedUsers(data.data.users);

            } catch (error) {

            }

        };

        fetchUsers();

    }, [sendRequest]);

    // return <UsersList items={USERS} />;
    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className='center'>
                <LoadingSpinner />
            </div>}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </Fragment>
    );
};

export default Users;