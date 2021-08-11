import React, { useEffect } from 'react';
import classes from './Pagination.module.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
	const pageNumbers = [];



	useEffect(() => {
		const pagBtns = document.querySelectorAll('.btn--pagination');
		if (pagBtns) {
			pagBtns[0].classList.add('active');
		}
	}, [])

	for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	const changePage = (e) => {
		e.stopPropagation();
		const clickedBtn = e.target;
		const pagBtns = document.querySelectorAll('.btn--pagination');

		pagBtns.forEach((btn) => {
			btn.classList.remove('active')
		})

		clickedBtn.classList.add('active')
	}

	const changePagePrev = (e) => {
		e.stopPropagation();
		const currentPage = document.querySelector('.active');
		const previousPage = currentPage.parentElement.previousSibling.children[0];
		
		currentPage.classList.remove('active');
		previousPage.classList.add('active')
	}

	const changePageAfter = (e) => {
		e.stopPropagation();
		const currentPage = document.querySelector('.active');
		const followingPage = currentPage.parentElement.nextSibling.children[0];
		
		currentPage.classList.remove('active')
		followingPage.classList.add('active')
	}

	return (
		<ul className={classes.pagination}>
			<li onClick={changePagePrev} className={`${classes['page-arrow']} ${currentPage > 1 && classes.show}`}>
				<button onClick={() => paginate(currentPage - 1)} className="btn btn--arrow">
					{'<'}
				</button>
			</li>
			{pageNumbers.map(number => (
				<li onClick={changePage} key={number} className={classes['page-item']}>
					<button onClick={() => paginate(number)} className="btn btn--pagination">
						{number}
					</button>
				</li>
			))}
			<li onClick={changePageAfter} className={`${classes['page-arrow']} ${currentPage < pageNumbers.length && classes.show}`}>
				<button onClick={() => paginate(currentPage + 1)} className="btn btn--arrow">
					{'>'}
				</button>
			</li>
		</ul>
	 );
}

export default Pagination;