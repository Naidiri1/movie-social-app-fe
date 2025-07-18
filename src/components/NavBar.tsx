'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { restoreUserSession, logout } from '../redux/reducers/authSlice';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '../redux/store'; // Adjust the path

const Navbar = () => {
const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { username } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(restoreUserSession());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-lg font-bold">
                {username ? `Welcome, ${username}` : 'Not logged in'}
            </div>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
