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
} from "@material-ui/core";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { getJSSearch as search } from "./searchEngine/searchEngine";
import { googledictionary as API } from "./api/api";
import { fade } from "@material-ui/core/styles";
import { getIcons, IconType } from "../data/iconData";
import debounce from "debounce";
import uuid from "uuid/v4";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        app: {
            height: "100%",
            position: "relative",
            overflow: "hidden",
        },
        body: {
            padding: 10,
            overflowY: "scroll",
            height: "100%",
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
        },
        title: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        search: {
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
    const loadingId = useRef<string>();
    const [icons, setIcons] = useState<Array<IconType>>([]);

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

    const debounced = useCallback(
        debounce(async (v: string) => {
            setSearch(v);
            if (synonymize) {
                synonymizeWord(v);
            } else {
                setSearchTerms([v]);
            }
        }, 300),
        [synonymize]
    );
    useEffect(() => {
        debounced(searchString);
    }, [debounced, searchString, synonymize]);
    useEffect(() => {
        (async () => {
            setIcons(await getIcons());
            setLoading(false);
        })();
    }, []);
    let searchResult: Set<IconType> = new Set<IconType>();
    if (!searchTerms || searchTerms.length < 1 || (searchTerms.length == 1 && !searchTerms[0])) {
        searchResult = new Set<IconType>(icons);
    } else {
        for (var i = 0, length = searchTerms.length; i < length; i++) {
            searchResult = new Set<IconType>([
                ...Array.from(searchResult),
                ...(search(icons).search(searchTerms[i]) as Array<IconType>),
            ]);
        }
    }
    return (
        <div className={classes.app}>
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
                    <Typography className={classes.title} variant="h6" noWrap>
                        total-icons: {searchResult.size}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.body}>
                <Typography variant="h6" noWrap>
                    {searchTerms.join(", ")}
                </Typography>
                <SearchResult results={Array.from(searchResult)} />
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
