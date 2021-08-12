import React, { useContext, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { motion, AnimatePresence } from 'framer-motion'

const Chat = ({ closeModal }) => {
    const { currentUser } = useAuth();
    const { addMsg, msgs } = useContext(ChatContext);
    const msgRef = useRef();

    const handleCloseModal = (e) => {
        if (e.target.classList.contains('chat-container')) {
            document.body.style.overflow = 'auto'
            closeModal(false);
        }
    }

    const handleMsgSubmit = (e) => {
        e.preventDefault();

        if (msgRef.current.value) {
            addMsg(msgRef.current.value, currentUser.displayName, currentUser.uid)
            msgRef.current.value = ''
        }
    }

    return ( 
        <AnimatePresence>
            <motion.div onClick={handleCloseModal} className="chat-container"
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
            >
                <motion.div className='chat'
                    initial={{ y: '-150%'}}
                    animate={{ y: 0}}
                    transition={{ type: 'spring', delay: 0.2}}
                >
                    <form onSubmit={handleMsgSubmit} className='add-msg-form'>
                        <input className='add-msg-input' type="text" placeholder='New chat message...' ref={msgRef}/>
                        <button className='btn btn--add-msg'>Add</button>
                    </form>
                    <ul className="chat-msgs">
                        <div className="chat-msgs-inner">
                            {msgs.map((msg) => {
                                return (
                                    <li className={`${currentUser.uid === msg.userId ? 'user-msg' : 'other-msg'}`} key={msg.id}>
                                        <strong>{msg.author}:</strong> {msg.text}
                                    </li>
                                )
                            })}
                        </div>
                    </ul>
                </motion.div>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default Chat;