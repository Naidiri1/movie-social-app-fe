import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUserSession, selectUsername } from "../redux/reducers/authSlice";

export const useFetchUserIfNull = () => {
    const username = useSelector(selectUsername);
    const dispatch: any = useDispatch();

    useEffect(() => {
        if (username === null) {
            const token = sessionStorage.getItem('access_token');
            console.log('Token in hook:', token); // ADD THIS
            if (token) {
                console.log('Dispatching restoreUserSession'); // ADD THIS
                dispatch(restoreUserSession());
            }
        }
    }, [username, dispatch]);
};