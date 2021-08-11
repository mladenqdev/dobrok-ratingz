import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import classes from './Login.module.css';

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const displayNameRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match')
		}

		try {
			setError('')
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value)
			history.push('/')
		} catch {
			setError('Failed to create an account / Password needs to have at least 6 characters')
		}
	}

	return (
		<div className={classes['form-container']}>
			<h2 className={classes['login-title']}>Sign Up</h2>
			{error && <span className={'error-msg'}>{error}</span>}
			<form className={classes['login-form']} onSubmit={handleSubmit}>
				<div className={classes['login-group-ctrl']}>
					<label className={classes.label}>Username</label>
					<input type="text" ref={displayNameRef} required/>
				</div>
				<div className={classes['login-group-ctrl']}>
					<label className={classes.label}>Email</label>
					<input type="email" ref={emailRef} required/>
				</div>
				<div className={classes['login-group-ctrl']}>
					<label className={classes.label}>Password</label>
					<input type="password" ref={passwordRef} required/>
				</div>
				<div className={classes['login-group-ctrl']}>
					<label className={classes.label}>Password Confirmation</label>
					<input type="password" ref={passwordConfirmRef} required/>
				</div>
				<button className={`${classes['login-submit-btn']} btn`} type='submit' disabled={loading}>Sign Up</button>
			</form>
			<div className={`${classes['login-text']} light`}>Already have an account? <Link to="/login">Log In</Link></div>
		</div>
	 );
}

export default Signup;