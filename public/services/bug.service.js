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
}

function query() {

    return axios.get(BASE_URL)
        .then(res => res.data)
        .catch(err => console.log('Can\'t load the bugs', err))
    // return fetch(BASE_URL)
    //     .then(res => res.json()) 
    //     .then(data => {
    //         return data
    //     })
    //    
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => console.log('Cant get bug id', err))
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove')
        .then(res => res.data)
        .catch(err => console.log('Cannot remove bug', err))

}

function save(bug) {
    console.log(bug);
    const url = BASE_URL + '/save'
    let queryParams = `title=${bug.title}&severity=${bug.severity}`
    if (bug._id) {
        queryParams += `&des=${bug.description}&_id=${bug._id}`
    }
    return axios.get(url + queryParams).then(res => res.data)

}

function getFilterFromParams(searchParams = {}) {
    // const defaultFilter = getDefaultFilter()
    return {
        title: searchParams.get('title') ,
        severity: searchParams.get('severity') ,
        description: searchParams.get('description') ,
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
