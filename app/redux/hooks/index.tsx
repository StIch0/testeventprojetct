import { useSelector } from 'react-redux';
import { RootState } from '../types';

const useRootSelector = () => useSelector((state: RootState) => ({ ...state }));

export { useRootSelector };
