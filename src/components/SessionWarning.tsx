import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Button,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { hideRenewDialog } from '@/redux/reducers/authSlice';
import { updateUser } from '@/redux/reducers/userSlice';

export default function SessionExpiryWarningDialog() {
    const dispatch = useDispatch();
    const router = useRouter();
    const showDialog = useSelector((state: any) => state.auth.showDialog);
    const [toggleOpenDialog, setToggleOpenDialog] = useState(false);

    const closeDialog = () => {
        dispatch(hideRenewDialog());
    };

    const logout = () => {
        sessionStorage.removeItem('access_token');
        dispatch(hideRenewDialog());
        router.push('/login');
    };

    const refreshSession = async () => {
        const response = await fetch('/api/auth/userSession');
        if (response.ok) {
            const data = await response.json();
            dispatch(updateUser(data));
            closeDialog();
        }
    };

    return (
        <Dialog handler={closeDialog} open={showDialog} size="xs">
            <div className="flex items-center justify-between">
                <DialogHeader className="flex justify-center">
                    Session Timeout
                </DialogHeader>
                <XMarkIcon
                    className="mr-3 h-5 w-5 cursor-pointer"
                    onClick={closeDialog}
                />
            </div>
            <DialogBody divider>
                <h1>
                    Your session is about to expire. Do you want to stay signed
                    in?
                </h1>
                <div className="flex justify-end space-x-4 mt-4">
                    <Button onClick={refreshSession}>Stay signed in</Button>
                    <Button className=" bg-blue-gray-400" onClick={logout}>
                        Logout
                    </Button>
                </div>
            </DialogBody>
        </Dialog>
    );
}
