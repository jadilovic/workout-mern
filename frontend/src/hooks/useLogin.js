import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setIsLoading(true);
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/user/login`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
		);
		const user = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(user.message);
		}

		if (response.ok) {
			// save user to local storage
			localStorage.setItem('user', JSON.stringify(user));
			// updating user in auth context
			dispatch({ type: 'LOGIN', payload: user });
			setIsLoading(false);
		}
	};

	return { login, isLoading, error };
};

export default useLogin;
