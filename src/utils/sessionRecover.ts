import { useEffect } from 'react';
import { fetchUser, selectUser } from '@/redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useFetchUserIfNull = () => {
    const user = useSelector(selectUser);
    const dispatch: any = useDispatch();

    useEffect(() => {
        if (user.userId === null) {
            dispatch(fetchUser());
        }
    }, [user.userId]);
};
