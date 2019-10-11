import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    
  },
}));

const Icons: React.FC = () => {
  const classes = useStyles();
  return (
      <div className={classes.root}>

      </div>  

  );
}

export default Icons;
