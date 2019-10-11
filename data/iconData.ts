//merges in with the default search tags
import materialIconsJson from './materialIcons.json'
import { customTags } from './customSearchIndex'
type Icon = {
    name: string,
    version: number,
    unsupported_families: Array<string>,
    categories: Array<string>
    tags: Array<string>
}


function mergeIcons<T extends Icon>(array: Array<T>, tagsToMerge: typeof customTags) {
    const normalizedObject: any = {}
    for (let i = 0; i < array.length; i++) {
        const key = array[i]['name']
        const tagsArray = tagsToMerge[key] ? tagsToMerge[key].tags || [] : [];

        normalizedObject[key] = {
            ...array[i],

            tags: [...array[i].tags, ...tagsArray]
        }
    }
    return normalizedObject as { [key: string]: T }
}

export const icons = mergeIcons(materialIconsJson, customTags);