import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error('useAuthContext is not wrapped in AuthContextProvider');
	}

	return context;
};
