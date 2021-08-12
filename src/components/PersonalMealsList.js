import { useContext, useState } from 'react';
import { MealsContext } from '../contexts/MealsContext';
import Meal from "./Meal";
import AddMeal from "./AddMeal";
import classes from './MealsList.module.css';
import Search from './Search';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Pagination from './Pagination';
import { motion } from 'framer-motion';
import Chat from './Chat';

const PersonalMealsList = () => {
	const { meals, searchTitle, setSearchTitle } = useContext(MealsContext);
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const [chat, setChat] = useState(false);

	const mealsPersonal = meals.filter((meal) =>
		meal.userId === currentUser.uid
	);

	const mealsFiltered = mealsPersonal.filter((meal) =>
	meal.title.toLocaleLowerCase().includes(searchTitle));

	// pagination

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5)

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = mealsFiltered.slice(indexOfFirstPost, indexOfLastPost)

	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	// pagination

	const handleLogout = async () => {
		setError('');

		try {
			await logout()
			history.push('/login')
		} catch {
			setError('Failed to log out')
		}
	}

	const handleOpenChat = () => {
		document.body.style.overflow = 'hidden'
		setChat(true);
	}

	return (
		<div className={classes.home}>
			<div className={classes['user-bar']}>
				<span className={`${classes['user-info']} light`}>Howdy, <strong>{currentUser.displayName}</strong>!</span>
				<Link onClick={() => setSearchTitle('')} className={`${classes['list-link']} light`} to="/">All ratingz</Link>
				<div>
					<button className='btn btn--chat' onClick={handleOpenChat}>Chat</button>
					<button className='btn' onClick={handleLogout}>Log Out</button>
					{error && <span className={'error-msg'}>{error}</span>}
				</div>
			</div>
			<Search />
			{chat && <Chat closeModal={setChat} />}
			<motion.div className={classes['meals-list']}
				initial={{ x: '100vw'}}
				animate={{ x: 0}}
				transition={{ type: 'spring', delay: 0.1}}
			>
				<AddMeal />
				{currentPosts.map((meal) => {
					return (
						<Meal
							key={meal.id}
							id={meal.id}
							userId={meal.userId}
							title={meal.title}
							text={meal.text}
							date={meal.date}
							author={meal.author}
							rating={meal.rating}
						/>
					)
				})}
			</motion.div>
			{mealsFiltered.length > 5 &&
				<Pagination postsPerPage={postsPerPage} totalPosts={mealsFiltered.length} paginate={paginate} currentPage={currentPage}/>
			}
		</div>
	 );
}

export default PersonalMealsList;