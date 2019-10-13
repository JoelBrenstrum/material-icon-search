import * as JsSearch from 'js-search';
import { icons } from '../../data/iconData';
import { stemmer } from 'porter-stemmer';


var jssearch = new JsSearch.Search('name');
jssearch.tokenizer =
    new JsSearch.StemmingTokenizer(
        stemmer, // Function should accept a string param and return a string
        new JsSearch.SimpleTokenizer());
// search.addIndex('categories'); //todo add a category filter 
jssearch.addIndex('tags')

jssearch.addDocuments(icons);

export { jssearch };