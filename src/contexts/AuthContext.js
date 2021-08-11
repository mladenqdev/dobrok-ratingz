import React, { useContext, useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider = (props) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signup = (email, password, displayName) => {
		return projectAuth.createUserWithEmailAndPassword(email, password)
		.then((result) => result.user.updateProfile({ displayName }));
	}

	const login = (email, password) => {
		return projectAuth.signInWithEmailAndPassword(email, password);
	}

	const logout = () => {
		return projectAuth.signOut();
	}

	const resetPassword = (email) => {
		return projectAuth.sendPasswordResetEmail(email);
	}

	useEffect(() => {
		const unsub = projectAuth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsub;
	}, [])



	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && props.children}
		</AuthContext.Provider>
	 );
}
