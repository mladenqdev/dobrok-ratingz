import React, { createContext, useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';


export const MealsContext = createContext();

const MealsContextProvider = (props) => {
    const [meals, setMeals] = useState([]);


    const [searchTitle, setSearchTitle] = useState('');

	useEffect(() => {
		projectFirestore.collection('meals')
			.orderBy('date', 'desc')
			.onSnapshot((snap) => {
				let documents = [];
				snap.forEach(doc => {
					documents.push({...doc.data(), id:doc.id})
				})
				setMeals(documents)
			})
	}, [])

	const addMeal = (title, text, rating, userId, author) => {
		const collectionRef = projectFirestore.collection('meals');

		const date = new Date();

		collectionRef.add({
			title: title,
			text: text,
			rating: rating,
			userId: userId,
			author: author,
			date: date.toLocaleDateString()
		})
	}

	const deleteMeal = (id) => {
		projectFirestore.collection('meals').doc(id).delete();
	}

	const updateMeal = (id, editedTitle, editedText, editedRating) => {
		projectFirestore.collection('meals').doc(id).update({
			title: editedTitle,
			text: editedText,
			rating: editedRating
		})
	}

    const value = {
        meals,
        addMeal,
        deleteMeal,
		updateMeal,
        searchTitle,
        setSearchTitle
    }

    return (
        <MealsContext.Provider value={value}>
            {props.children}
        </MealsContext.Provider>
     );
}

export default MealsContextProvider;