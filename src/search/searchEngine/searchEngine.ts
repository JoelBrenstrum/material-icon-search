import * as JsSearch from 'js-search';
import { icons } from '../../data/iconData';


var search = new JsSearch.Search('name');
// search.addIndex('categories'); //todo add a category filter 
search.addIndex('tags')

search.addDocuments(icons);

export { search };