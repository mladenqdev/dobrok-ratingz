import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import classes from './Login.module.css';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError('')
			await login(emailRef.current.value, passwordRef.current.value)
			history.push('/')
		} catch {
			setError('Failed to log in - Incorrect email/password')
		}
	}

	return (
		<div className={classes['form-container']}>
			<h2 className={classes['login-title']}>Log In</h2>
			{error && <span className={'error-msg'}>{error}</span>}
			<form className={classes['login-form']} onSubmit={handleSubmit}>
				<div className={classes['login-group-ctrl']}>
					<label className={classes.label}>Email</label>
					<input type="email" ref={emailRef} required/>
				</div>
				<div className={classes['login-group-ctrl']}>
					<label className={classes.label}>Password</label>
					<input type="password" ref={passwordRef} required/>
				</div>
				<button className={`${classes['login-submit-btn']} btn`} type='submit'>Log In</button>
			</form>
			<div className={`${classes['login-text']} ${classes['password-query']} light`}>
				<Link  to='/forgot-password'>Forgot Password?</Link>
			</div>
			<div className={`${classes['login-text']} light`}>Need an account? <Link to="/signup">Sign Up</Link></div>
		</div>
	 );
}

export default Login;