import fs from 'fs'

import { utilService } from './utils.service.js'

export const bugService = {
    query,
    getById,
    remove,
    save
}

const bugs = utilService.readJsonFile('data/bug.json')

function query(filterBy = { title: '', minSeverity: 0 }) {
    let bugsToReturn = bugs
    if (filterBy.title) {
        console.log('filterBy', filterBy);
        console.log('filterBy.title', filterBy.title);
        const regex = new RegExp(filterBy.title, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regex.test(bug.title))
        console.log('bugsToReturn', bugsToReturn);
        // return Promise.resolve(bugsToReturn)
    }

    if (filterBy.minSeverity) {
        bugsToReturn = bugsToReturn.filter(bug => bug.severity >= filterBy.minSeverity)
    }

    if (filterBy.labels.length !== 0) {
        console.log('!!!@@@@@@@$#, ', filterBy.labels);
        bugsToReturn = bugsToReturn.some(bug =>
            filterBy.labels.some(label => bug.labels.includes(label))
        )
    }
    console.log('bugsToReturn', bugsToReturn);

    return Promise.resolve(bugsToReturn)
}

function getById(id) {
    const bug = bugs.find(bug => bug._id === id)
    if (!bug) return Promise.reject('Bug does not exist!')
    return Promise.resolve(bug)
}

function remove(id) {
    const bugIdx = bugs.findIndex(bug => bug._id === id)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()

}


function save(bug) {
    console.log(bug);
    if (bug._id) {
        const bugIdx = bugs.findIndex(_bug => _bug._id === bug._id)
        bugs[bugIdx] = bug
    } else {
        bug._id = utilService.makeId()
        // bug.desc = utilService.makeLorem()
        bugs.unshift(bug)
    }
    return _saveBugsToFile().then(() => bug)
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve()
        })
    })
}