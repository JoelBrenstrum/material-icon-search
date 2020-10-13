import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ThemeProvider, makeStyles, createStyles } from "@material-ui/styles";
import { Theme, theme } from "../theme";
import {
    TextField,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Icon,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    FormHelperText,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from "@material-ui/core";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import Engines, { SearchEngines } from "./searchEngine/searchEngines";
import { googledictionary as API } from "./api/api";
import { fade } from "@material-ui/core/styles";
import { getIcons, IconType } from "../data/iconData";
import debounce from "debounce";
import uuid from "uuid/v4";
import SearchProvider, { SearchEngine } from "./searchEngine/SearchProvider";
import { useSearchProvider } from "./searchEngine/useSearchProvider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        app: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            overflow: "hidden",
        },
        body: {
            padding: 10,
            overflowY: "scroll",
            flex: 1,
        },
        header: {
            flex: 0,
        },
        loadingMask: {
            zIndex: 1,
            padding: 0,
            top: 64,
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            opacity: 0.8,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
        },
        grow: {
            flexGrow: 1,
            display: "flex",
            height: 32,
        },
        title: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        formField: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(3),
                width: "auto",
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        selectInput: {
            color: "#fff",
            marginLeft: theme.spacing(2),
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: 200,
            },
        },
    })
);

const Search: React.FC = () => {
    const classes = useStyles();
    const [searchString, setSearch] = useState("");
    const [searchTerms, setSearchTerms] = useState([""]);
    const [loading, setLoading] = useState(true);
    const [synonymize, setSynonymize] = useState(true);
    const [grouped, setGrouped] = useState(true);
    const loadingId = useRef<string>();
    const searchTextRef = useRef<string>("");

    const [icons, setIcons] = useState<Array<IconType>>([]);
    const [search, searchProviderName, setSearchProviderName] = useSearchProvider(icons);

    //should make this a hook
    const synonymizeWord = (value: string) => {
        if (!value) {
            setSearchTerms([value]);
            return;
        }
        const localUuid = uuid();
        loadingId.current = localUuid;
        setLoading(true);
        API.getSynonym(value, localUuid, { noun: true, adjective: true, verb: true })
            .then((res) => {
                if (loadingId.current != localUuid) {
                    return;
                }
                setSearchTerms(res.words);
            })
            .finally(() => {
                if (loadingId.current == localUuid) {
                    setLoading(false);
                }
            });
    };

    const updateSearch = (v: string) => {
        setSearch(v);
        searchTextRef.current = v;
    };
    const debounced = useCallback(
        debounce(async () => {
            if (synonymize) {
                synonymizeWord(searchTextRef.current);
            } else {
                setSearchTerms([searchTextRef.current]);
            }
        }, 300),
        [synonymize]
    );

    useEffect(() => {
        debounced();
    }, [debounced, searchString, synonymize, searchProviderName]);

    useEffect(() => {
        (async () => {
            setIcons(await getIcons());
            setLoading(false);
        })();
    }, []);

    const searchResult = useMemo<Set<IconType>>(() => {
        let searchResult: Set<IconType> = new Set<IconType>();
        if (!searchTerms || searchTerms.length < 1 || (searchTerms.length == 1 && !searchTerms[0])) {
            searchResult = new Set<IconType>(icons);
        } else {
            for (var i = 0, length = searchTerms.length; i < length; i++) {
                searchResult = new Set<IconType>([...Array.from(searchResult), ...(search(searchTerms[i]) || [])]);
            }
        }
        return searchResult;
    }, [icons, search, searchTerms]);

    const renderTitleBar = useMemo(
        () => (
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <div className={classes.grow}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            material-icon-search (total-icons: {searchResult.size})
                        </Typography>
                    </div>
                    <div className={classes.grow}>
                        <FormControl className={classes.formField}>
                            <Select
                                classes={{
                                    select: classes.selectInput,
                                }}
                                disableUnderline
                                value={searchProviderName}
                                onChange={(event) => {
                                    setSearchProviderName(event.target.value as any);
                                }}
                            >
                                {Object.values(SearchEngines).map((k) => (
                                    <MenuItem value={k}>{k}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className={classes.formField}>
                            <div className={classes.searchIcon}>
                                <Icon>search</Icon>
                            </div>
                            <InputBase
                                onChange={(e) => updateSearch(e.target.value)}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={synonymize}
                                    onChange={() => {
                                        setSynonymize(!synonymize);
                                    }}
                                />
                            }
                            label="Synonymize"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={grouped}
                                    onChange={() => {
                                        setGrouped(!grouped);
                                    }}
                                />
                            }
                            label="Group"
                        />
                    </div>

                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
        ),
        [
            classes.header,
            classes.grow,
            classes.title,
            classes.formField,
            classes.selectInput,
            classes.searchIcon,
            classes.inputRoot,
            classes.inputInput,
            searchResult.size,
            searchProviderName,
            synonymize,
            grouped,
            setSearchProviderName,
        ]
    );
    const renderSearchResult = useMemo(() => <SearchResult grouped={grouped} results={Array.from(searchResult)} />, [
        grouped,
        searchResult,
    ]);
    return (
        <div className={classes.app}>
            {renderTitleBar}
            <div className={classes.body}>
                <Typography variant="h6" noWrap>
                    {searchTerms.join(", ")}
                </Typography>
                {renderSearchResult}
            </div>
            {loading && (
                <div className={classes.loadingMask}>
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};

export default Search;
