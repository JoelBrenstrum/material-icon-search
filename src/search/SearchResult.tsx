import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { TextField } from '@material-ui/core';
import IconResult from './IconResult';
import { IconType } from '../data/iconData'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    
  },
}));

interface SearchResultProps {
  results: Array<IconType>
}
const SearchResult: React.FC<SearchResultProps> = (props: SearchResultProps) => {
  const { results } = props;
  const classes = useStyles();
  return (
      <div className={classes.root}>
        {results.map(r => (
          <>
          {r.name}
          <IconResult icon={r}
          //   onChange={setSearchTerm}
          />
          </>
        ))}
       
        
      </div>  

  );
}

export default SearchResult;
