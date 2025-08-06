import {
    type TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

export const UseAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

