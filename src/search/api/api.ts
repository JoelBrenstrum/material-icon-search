import datamuse from './datamuse';
import googledictionary from './googledictionary';

export interface ISynonymResult {
    words: Array<string>,
    requestId: string
}

export interface IOptions {

}

export interface APIInterface {
    getSynonym: (value: string, requestId: string, options?: IOptions) => Promise<ISynonymResult>
    apiName: SearchAPI
    getOptions: () => IOptions
    setOptions: (IOptions) => void
}
export function pushArray(arr, arr2) {
    arr.push.apply(arr, arr2);
}

export { datamuse, googledictionary }

export const getAPI = (api: SearchAPI): APIInterface => {
    switch (api) {
        case SearchAPI.datamuse:
            return datamuse;
        case SearchAPI.googledictionary:
            return googledictionary;
        default:
            return datamuse;
    }
}

export enum SearchAPI {
    datamuse,
    googledictionary
}