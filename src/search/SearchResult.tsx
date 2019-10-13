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

const group = (results: Array<IconType>): { [key: string]: Array<IconType> } => {
  const result: { [key: string]: Array<IconType> } = {};
  results.forEach(r => {
    r.categories.forEach(c => {
      if (!result[c]) {
        result[c] = [];
      }
      result[c].push(r);
    })

  });
  return result;
};

const SearchResult: React.FC<SearchResultProps> = (props: SearchResultProps) => {
  const { results } = props;
  const groups = group(results);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {Object.keys(groups).map(g => (
          <>
          {g}
          {groups[g].map(r => (
            <>
              <IconResult icon={r}
              //   onChange={setSearchTerm}
              />
            </>
          ))}
          </>
  )
      )}


    </div>

  );
}

export default SearchResult;
