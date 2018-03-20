declare var require:any

import all from './allsurah.json'
import trans from './quranen.json'
export function allSurah() {
    return all
}

export function Translation(number) {   
    var surah = trans.data.surahs[number]
    console.log(surah)
    return surah
}
export function singleSurah (number) {
    console.log(number)
    var surah = require(`./surah/surah${number}.json`)
    return surah.data
}