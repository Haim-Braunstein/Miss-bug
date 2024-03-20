import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    getFilterFromParams,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter(), sortBy) {
    const queryParams = { ...filterBy, ...sortBy }

    return axios.get(BASE_URL, { params: queryParams })
        .then(res => res.data)
        .catch(err => console.log('Can\'t load the bugs', err))
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => console.log('Cant get bug id', err))
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => console.log('Cannot remove bug', err))

}

function save(bug) {

    if (bug._id) {
        return axios.put(BASE_URL, bug)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug)
            .then(res => res.data)
    }

}

function getDefaultFilter() {
    return { title: '', minSeverity: 0, labels: '' }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        title: searchParams.get('title') || defaultFilter.title,
        minSeverity: searchParams.get('minSeverity') || defaultFilter.minSeverity,
        labels: searchParams.get('labels') || defaultFilter.labels
    }
}





function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (!bugs || !bugs.length) {
        bugs = [
            {
                title: "Infinite Loop Detected",
                severity: 4,
                _id: "1NF1N1T3"
            },
            {
                title: "Keyboard Not Found",
                severity: 3,
                _id: "K3YB0RD"
            },
            {
                title: "404 Coffee Not Found",
                severity: 2,
                _id: "C0FF33"
            },
            {
                title: "Unexpected Response",
                severity: 1,
                _id: "G0053"
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, bugs)
    }



}
