import AccurateSearch from 'accurate-search';

import { SearchEngine } from './SearchProvider';
import { IconType } from '../../data/iconData';


export default class AccurateSearchEngine extends SearchEngine {
    private searchProvider: AccurateSearch

    public constructor() {
        super();
        this.searchProvider = new AccurateSearch();
    }
    public search(search: string) {
        const indexes = this.searchProvider.search(search) as Array<number>
        const result: Array<IconType> = [];
        for (let index of indexes) result.push(this.icons[index])
        return result;
    };

    public setData = (data) => {
        super.setData(data);
        //Add data
        for (let i = 0; i < data.length; i++) {
            const icon = data[i];
            this.searchProvider.addText(i, `${icon.name} ${icon.tags.join(' ')} ${icon.categories.join(' ')}`)
            // for (let j = 0; j < icon.tags.length; j++) {
            //     this.searchProvider.addText(i, icon.tags[j])
            // }
        }
    }
}
