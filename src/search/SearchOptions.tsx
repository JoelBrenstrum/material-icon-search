import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    
  },
}));

type SearchOptionsProps = {
} & Pick<TextFieldProps, 'onChange'>

const SearchOptions: React.FC<SearchOptionsProps> = (props) => {
  const classes = useStyles();
  return (<></>
    //   <div className={classes.root}>
    //     <TextField
    //       onChange={props.onChange}
    //     />
    //   </div>  

  );
}

export default SearchOptions;
