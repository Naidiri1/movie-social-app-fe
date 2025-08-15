import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUserSession , selectUsername } from "../redux/reducers/authSlice";


export const useFetchUserIfNull = () => {
    const user = useSelector(selectUsername);
    const dispatch: any = useDispatch();

    useEffect(() => {
        if (user === null) {
            dispatch(restoreUserSession());
        }
    }, [selectUsername]);
};
