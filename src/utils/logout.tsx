import { logout } from '../redux/reducers/authSlice';
import { AppDispatch } from '../redux/store'; // Adjust path if needed
import { useRouter } from 'next/router';

export const logoutUser = async (dispatch: AppDispatch, router: any) => {
    const channel = new BroadcastChannel('auth_channel');
    
    try {
        const token = sessionStorage.getItem('access_token');

        if (token) {
            await fetch(`/api/auth/logoutUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        }

        // Frontend cleanup
        dispatch(logout());
        channel.postMessage({ type: 'logout' });
        channel.close();

        router.push('/login');
    } catch (error) {
        console.error('Error during logout:', error);
        channel.close();
    }
};
