//merges in with the default search tags

import materialIconsJson from './materialIcons.json'
import { customTags } from './customSearchIndex'
const request = require('request');

export type IconType = {
    name: string,
    version: number,
    unsupported_families: Array<string>,
    categories: Array<string>
    tags: Array<string>
}

function mergeIcons(array: Array<IconType>, tagsToMerge: typeof customTags) {
    const newArray: any = [];
    for (let i = 0; i < array.length; i++) {
        const key = array[i]['name']
        const tagsArray = tagsToMerge[key] ? tagsToMerge[key].tags || [] : [];
        const categoriesArray = tagsToMerge[key] ? tagsToMerge[key].categories || [] : [];

        newArray.push({
            ...array[i],
            tags: [...array[i].tags, ...tagsArray, ...array[i].name.split('_')],
            categories: [...array[i].categories, ...categoriesArray]
        } as IconType);
    }
    return newArray as Array<IconType>
}

const URL = 'https://fonts.google.com/metadata/icons';

// read icons from google, dump into json file


export const getIcons = async () => {
    return new Promise<Array<IconType>>(async (resolve, reject) => {
        let materialIcons;
        try {
            const response = await fetch(URL)
            //, {
            // method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            // credentials: 'same-origin', // include, *same-origin, omit
            // headers: {
            //   'Content-Type': 'application/json'
            //   // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
            //});
            // }
            // request(URL, { json: true }, (err, res, body) => {
            // if (err) { return console.log(err); }
            let body = await response.json()
            if (body.startsWith(')]}\'')) body = body.slice(4);
            materialIcons = JSON.parse(body)
        } catch (ex) {
            materialIcons = materialIconsJson
        }
        resolve(mergeIcons(materialIcons, customTags));
    });
}
