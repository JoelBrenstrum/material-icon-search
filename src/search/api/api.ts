import datamuse from './datamuse';
import googledictionary from './googledictionary';

export interface ISynonymResult {
    words: Array<string>,
    requestId: string
}

export interface IOptions {
    verb: boolean,
    noun: boolean,
    adjective: boolean
}

export interface APIInterface {
    getSynonym: (value: string, requestId: string, options?: IOptions) => Promise<ISynonymResult>
}
export function pushArray(arr, arr2) {
    arr.push.apply(arr, arr2);
}

export { datamuse, googledictionary }