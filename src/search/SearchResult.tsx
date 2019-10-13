import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { TextField, Grid, Typography } from '@material-ui/core';
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
    <Grid container>
      {Object.keys(groups).map(g => (
        <React.Fragment key={g}>
          <Grid>
            <Typography variant='h5'>
              {g}
            </Typography>
          </Grid>
          <Grid container>
            {groups[g].map(r => (
              <Grid key={r.name}>
                <IconResult icon={r}
                />
              </Grid>
            ))}
          </Grid>
        </ React.Fragment >
      )
      )}


    </Grid>

  );
}

export default SearchResult;
