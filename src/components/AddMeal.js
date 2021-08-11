import { useState } from 'react';
import classes from './Meal.module.css';
import { MealsContext } from '../contexts/MealsContext';
import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const characterLimit = 100;

const AddMeal = () => {
	const { addMeal } = useContext(MealsContext);
	const [mealTitle, setMealTitle] = useState('');
	const [mealRating, setMealRating] = useState('');
	const [mealText, setMealText] = useState('');
	const [ratingError, setRatingError] = useState(false);
	const { currentUser } = useAuth();

	const handleTextChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setMealText(event.target.value);
		}
	};

	const handleRatingChange = (event) => {
		setMealRating(event.target.value);
	}

	const handleTitleChange = (event) => {
		setMealTitle(event.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (mealRating >= 1 && mealRating <= 5) {

			addMeal(mealTitle, mealText, mealRating, currentUser.uid, currentUser.displayName)
			setMealTitle('');
			setMealText('');
			setMealRating('');
			setRatingError(false);
		} else {
			setRatingError(true);
		}
	}

	return (
		<form onSubmit={handleSubmit} className={`${classes.meal} ${classes.new}`}>
			<input className={classes['add-meal-input']} type="text" value={mealTitle} placeholder='New meal title...' required onChange={handleTitleChange}/>
			<input className={classes['add-meal-input']} type="number" value={mealRating} placeholder="Your personal rating" required step=".1" onChange={handleRatingChange} />
			{ratingError && <span className='error-msg'>Rating must be in the range of 1-5</span>}
			<textarea
				 className={classes['add-meal-input']}
				 cols="10"
				 rows="4"
				 placeholder='Comment...'
				 value={mealText}
				 onChange={handleTextChange}
			></textarea>
			<div className={classes['meal-footer']}>
				<small>{characterLimit - mealText.length} characters remaining</small>
				<button className={'btn'}>Add</button>
			</div>
		</form>
	);
}

export default AddMeal;