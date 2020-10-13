import * as JsSearch from 'js-search';
import { stemmer } from 'porter-stemmer';
import { SearchEngine } from './SearchProvider';
import { IconType } from '../../data/iconData';

export default class JsSearchEngine extends SearchEngine {
    private searchProvider: JsSearch.Search

    public constructor() {
        super()
        this.searchProvider = new JsSearch.Search('name');
        this.searchProvider.tokenizer =
            new JsSearch.StemmingTokenizer(
                stemmer, // Function should accept a string param and return a string
                new JsSearch.SimpleTokenizer());
        // search.addIndex('categories'); //todo add a category filter 
        this.searchProvider.addIndex('tags')
        this.searchProvider.addIndex('categories')
    }
    search(string: any) {
        return this.searchProvider.search(string) as Array<IconType>
    };

    public setData = (data) => {
        super.setData(data);
        this.searchProvider.addDocuments(data);
    }
}
