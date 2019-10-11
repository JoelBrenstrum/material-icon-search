import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { TextField } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import {search} from './searchEngine/searchEngine'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    
  },
}));

interface SearchProps {
  }
const Search: React.FC = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
const searchResult = search.search(searchTerm);
  return (
      <div className={classes.root}>
        <SearchBar
           onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchResult results={searchResult as any}
        //   onChange={setSearchTerm}
        />
      </div>  

  );
}

export default Search;
