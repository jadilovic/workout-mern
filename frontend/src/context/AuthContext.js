const { createContext, useReducer } = require('react');

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				user: null,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatcher] = useReducer(authReducer, {
		user: null,
	});
	console.log('Auth state : ', state);
	return (
		<AuthContext.Provider value={{ ...state, dispatcher }}>
			{children}
		</AuthContext.Provider>
	);
};
