import React, { useState, useEffect } from 'react';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { TextField, AppBar, Toolbar, IconButton, Typography, InputBase, Icon, Checkbox, FormControlLabel, CircularProgress } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { jssearch as search } from './searchEngine/searchEngine'
import {googledictionary as API} from './api/api';
import { fade } from '@material-ui/core/styles';
import { icons, IconType } from '../data/iconData';
import debounce from 'debounce'
import uuid from 'uuid/v4'

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
    const [searchString, setSearch] = useState('');
    const [searchTerms, setSearchTerms] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [synonymize, setSynonymize] = useState(true);

    useEffect(() => {
        debounced(searchString);
    }, [synonymize]);
    let loadingId = ''
    const synonymizeWord = (value: string) => {
        if(!value){
            setSearchTerms([value]);
            return;
        }
        const localUuid = uuid();
        loadingId = localUuid;
        setLoading(true);
        API.getSynonym(value, localUuid, {noun: true, adjective: true, verb: true}).then((res) => {
            if (loadingId != localUuid) {
                return;
            }
            setSearchTerms(res.words);
        }).finally(() => {
            if (loadingId == localUuid) {
                setLoading(false);
            }
        });
    }
    const debounced = debounce(async (v: string) => {
        setSearch(v);
        if (synonymize) {
            synonymizeWord(v);
        } else {
            setSearchTerms([v])
        }
    }, 300);


    let searchResult: Set<IconType> = new Set<IconType>();
    if (!searchTerms || searchTerms.length < 1 || (searchTerms.length == 1 && !searchTerms[0])) {
        searchResult = new Set<IconType>(icons);
    } else {
        for (var i = 0, length = searchTerms.length; i < length; i++) {
            searchResult = new Set<IconType>([...Array.from(searchResult), ...(search.search(searchTerms[i]) as Array<IconType>)]);
        }
    }
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={synonymize}
                                onChange={() => { setSynonymize(!synonymize) }} />
                        }
                        label="Synonymize"
                    />

                </Toolbar>
            </AppBar>
            <div className={classes.body}>
                {loading && <CircularProgress />}
                <Typography variant="h6" noWrap>
                    {searchTerms.join(', ')}
                </Typography>
                <SearchResult results={Array.from(searchResult)}
                />
            </div>
        </>
    );
}

export default Search;
