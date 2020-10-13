import * as JsSearch from 'js-search';
import { stemmer } from 'porter-stemmer';
import { IconType } from '../../data/iconData';

export abstract class SearchEngine {
    protected icons: Array<IconType> = []
    abstract search(search: string): Array<IconType>
    setData(icons) {
        this.icons = icons;
    }
}

export default class SearchProvider {
    private static instance: SearchProvider;
    private searchEngine: SearchEngine | null = null

    private constructor() {
    }

    public static getInstance(): SearchProvider {
        if (!SearchProvider.instance) {
            SearchProvider.instance = new SearchProvider();
        }
        return SearchProvider.instance;
    }
    public static getEngine(): SearchEngine | null {
        return SearchProvider.getInstance().searchEngine;
    }

    static setProvider(engine: SearchEngine) {
        SearchProvider.getInstance().searchEngine = engine
        return this
    }

    static search(search: string) {
        const searchProvider = SearchProvider.getInstance();
        if (!searchProvider.searchEngine) {
            console.error('you must provide a search engine')
            return;
        }
        return searchProvider.searchEngine.search(search)
    }
}
