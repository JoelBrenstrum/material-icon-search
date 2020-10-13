// import { fuse } from './fuse'
import JsSearchEngine from './JsSearchEngine'
import AccurateSearchEngine from './AccurateSearchEngine'


export enum SearchEngines {
    JSSearch = 'Js Search',
    AccurateSearch = 'Accurate Search'
}
const engines = {
    [SearchEngines.JSSearch]: new JsSearchEngine(),
    [SearchEngines.AccurateSearch]: new AccurateSearchEngine()
}
export default engines

