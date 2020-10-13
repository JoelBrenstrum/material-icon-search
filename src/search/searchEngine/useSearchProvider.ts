import { useState, useRef, useEffect } from "react";
import engines, { SearchEngines } from "./searchEngines";
import SearchProvider from "./SearchProvider";



export const useSearchProvider = (icons, defaultProvider?) => {
    const [searchProviderName, setSearchProviderName] = useState<SearchEngines>(defaultProvider || SearchEngines.AccurateSearch);

    useEffect(() => {
        SearchProvider.setProvider(engines[searchProviderName]);
    }, [searchProviderName]);

    useEffect(() => {
        const engine = SearchProvider.getEngine();
        if (engine) {
            engine.setData(icons);
        }
    }, [icons, searchProviderName]);



    return [SearchProvider.search, searchProviderName, setSearchProviderName] as const
}