import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from './theme';



const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // background: theme.pa,
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>

      </div>  
    </ThemeProvider>

  );
}

export default App;
