import fs from 'fs'

import { utilService } from './utils.service.js'

export const bugService = {
    query,
    // getById,
    // remove,
    // save
}

const bugs = utilService.readJsonFile('data/bug.json')


function query() {
    return Promise.resolve(bugs)
}













// function _saveBugsToFile() {
//     return new Promise((resolve, reject) => {
//         const data = JSON.stringify(bugs, null, 4)
//         fs.writeFile('data/bug.json', data, (err) => {
//             if (err) {
//                 console.log(err)
//                 return reject(err)
//             }
//             resolve()
//         })
//     })
// }