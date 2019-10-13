import React, { useState } from 'react';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { TextField, AppBar, Toolbar, IconButton, Typography, InputBase, Icon } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { jssearch as search } from './searchEngine/searchEngine'
import { fade } from '@material-ui/core/styles';
import { icons } from '../data/iconData';
import debounce from 'debounce'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            padding: 10,
            height: '100%'
        },
        grow: {
            flexGrow: 1,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
    }),
);

const Search: React.FC = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const debounced = debounce((v) => {
        setSearchTerm(v)
    }, 300);
    const searchResult = searchTerm ? search.search(searchTerm) : icons;
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        material-icon-search
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Icon>search</Icon>
                        </div>
                        <InputBase
                            onChange={(e) => debounced(e.target.value)}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.body}>
                <SearchResult results={searchResult as any}
                />
            </div>
        </>
    );
}

export default Search;
