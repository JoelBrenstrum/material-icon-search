// import { icons } from '../../data/iconData';
import Fuse from 'fuse.js';

// search.addDocuments(icons);


var options = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [{
        name: 'categories',
        weight: 0.1
    }, {
        name: 'tags',
        weight: 0.4
    }, {
        name: 'name',
        weight: 0.5
    }]
};
// var fuse = new Fuse(icons, options); // "list" is the item array

// export { fuse };
