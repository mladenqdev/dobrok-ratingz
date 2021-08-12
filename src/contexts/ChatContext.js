import React, { createContext, useState, useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';


export const ChatContext = createContext();

const ChatContextProvider = (props) => {
    const [msgs, setMsgs] = useState([]);

	useEffect(() => {
		projectFirestore.collection('messages')
			.orderBy('date', 'desc')
            .limit(50)
			.onSnapshot((snap) => {
				let messages = [];
				snap.forEach(doc => {
					messages.push({...doc.data(), id:doc.id})
				})
				setMsgs(messages)
			})
	}, [])

	const addMsg = (text, author, userId) => {
		const collectionRef = projectFirestore.collection('messages');

		// const date = new Date();

		collectionRef.add({
			text: text,
			author: author,
            userId: userId,
			date: timestamp()
		})
	}


    const value = {
        msgs,
        addMsg
    }

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
     );
}

export default ChatContextProvider;