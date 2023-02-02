import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (email, password) => {
		setError(null);
		setIsLoading(true);
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/user/signup`,
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

	return { signup, isLoading, error };
};

export default useSignup;
