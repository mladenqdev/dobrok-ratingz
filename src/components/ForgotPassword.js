import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'
import classes from './Login.module.css';

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setMessage('')
			setError('')
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage('Reset successful, check your email!')
		} catch {
			setError('Failed to reset password')
		}
		setLoading(false)
	}

	return (
		<div className={classes['form-container']}>
			<h2 className={classes['login-title']}>Reset Password</h2>
			{error && <span className={'error-msg'}>{error}</span>}
			{message && <span className={'success-msg'}>{message}</span>}
			<form className={classes['login-form']} onSubmit={handleSubmit}>
				<div className={classes['login-group-ctrl']}>
					<label className={classes.label}>Email</label>
					<input type="email" ref={emailRef} required/>
				</div>
				<button className={`${classes['login-submit-btn']} btn`} type='submit' disabled={loading}>Reset Password</button>
			</form>
			<div className={`${classes['login-text']} ${classes['password-query']} light`}>
				<Link to='/login'>Login</Link>
			</div>
			<div className={`${classes['login-text']} light`}>Need an account? <Link to="/signup">Sign Up</Link></div>
		</div>
	 );
}

export default ForgotPassword;