import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from './theme';
import Search from './search/Search';



const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // background: theme.palette.secondary.main,
    fontSize: 16,
    // color: 'white',
    height: '100%',
  },
}));


const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Search />
      </div>
    </ThemeProvider>

  );
}

export default App;
