import { MdDeleteForever } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import classes from './Meal.module.css';
import { MealsContext } from '../contexts/MealsContext';
import { useContext, useState } from 'react';
import { characterLimit } from './AddMeal';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Meal = ({ id, title, text, date, rating, userId, author }) => {
	const { deleteMeal } = useContext(MealsContext);
	const { updateMeal } = useContext(MealsContext);
	const { currentUser } = useAuth();

	const [ratingError, setRatingError] = useState(false)

	const [editedTitle, setEditedTitle] = useState('');
	const [editedText, setEditedText] = useState('');
	const [editedRating, setEditedRating] = useState('');
	const [editForm, setEditForm] = useState(false)

	const handleTextChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setEditedText(event.target.value);
		}
	};

	const handleRatingChange = (event) => {
		setEditedRating(event.target.value);
	}

	const handleTitleChange = (event) => {
		setEditedTitle(event.target.value)
	}

	let quality = 'medium';
	if (rating < 3) {
		quality = 'bad'
	} else if (rating >= 4) {
		quality = 'good'
	}

	const handleEditForm = () => {
		setEditForm(true)
		setEditedTitle(title)
		setEditedText(text)
		setEditedRating(rating)
	}

	const handleUpdateMeal = (e) => {
		e.preventDefault();

		if (editedRating >= 1 && editedRating <= 5) {

			updateMeal(id, editedTitle, editedText, editedRating)
			setRatingError(false);
			setEditForm(false)
		} else {
			setRatingError(true);
		}
	}

	return (
		<div>
			{!editForm &&
				<motion.div className={`${classes.meal} ${classes[quality]}`}
				>
					<h4 className={classes['meal-title']}>{ title }</h4>
					<span className={classes['meal-rating']}>Rating: <strong>{ rating }/5</strong></span>
					<p className={classes['meal-comment']}>{ text }</p>
					{currentUser.uid === userId &&
					<RiEdit2Fill
						onClick={handleEditForm}
						className={classes['edit-icon']}
					/>
					}
					<div className={classes['meal-footer']}>
						<small>{ date }</small>
						<small>by { author }</small>
						{currentUser.uid === userId &&
						<MdDeleteForever
							onClick={() => deleteMeal(id)}
							className={classes['delete-icon']}
							size='1.3em'
						/>}
					</div>
				</motion.div>
			}
			{editForm &&
				<motion.form onSubmit={handleUpdateMeal} className={`${classes.meal} ${classes[quality]} ${classes.update}`}
					initial={{rotateY: 180, opacity: 0}}
					animate={{rotateY: 0, opacity: 1}}
					transition={{ duration: 0.05}}
				>
					<input className={classes['add-meal-input']} type="text" value={editedTitle} placeholder='New meal title...' required onChange={handleTitleChange}/>
					<input className={classes['add-meal-input']} type="number" value={editedRating} placeholder="Your personal rating" required step=".1" onChange={handleRatingChange} />
					{ratingError && <span className={'error-msg'}>Rating must be in the range of 1-5</span>}
					<textarea
						className={classes['add-meal-input']}
						cols="10"
						rows="5"
						placeholder='Comment...'
						value={editedText}
						onChange={handleTextChange}
					></textarea>
					<div className={classes['meal-footer']}>
						<small>{characterLimit - editedText.length} characters remaining</small>
						<button
						className={'btn'}
						>Update</button>
					</div>
				</motion.form>
			}
		</div>

	 );
}

export default Meal;