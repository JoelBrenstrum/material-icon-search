import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    
  },
}));

type SearchProps = {
} & Pick<TextFieldProps, 'onChange'>
const SearchBar: React.FC<SearchProps> = (props: SearchProps) => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <TextField
          onChange={props.onChange}
        />
      </div>  

  );
}

export default SearchBar;
