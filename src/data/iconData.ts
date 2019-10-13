//merges in with the default search tags
import materialIconsJson from './materialIcons.json'
import { customTags } from './customSearchIndex'
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

export const icons = mergeIcons(materialIconsJson, customTags);