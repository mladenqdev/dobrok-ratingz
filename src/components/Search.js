import React, { useContext } from 'react';
import { MealsContext } from '../contexts/MealsContext';
import classes from './Search.module.css';
import { MdSearch } from 'react-icons/md';
import { motion } from 'framer-motion'

const Search = () => {
    const { setSearchTitle } = useContext(MealsContext);
    return(
        <motion.div className={classes.search}
            initial={{ x: '-100vw'}}
            animate={{ x: 0}}
            transition={{ type: 'spring', delay: 0.1}}
        >
            <MdSearch className={classes['search-icons']} size='1.3em' />
            <input 
                onChange={(event) => setSearchTitle(event.target.value)} 
                type="text"
                placeholder="type to search..."
             />
        </motion.div>
    )
}

export default Search;