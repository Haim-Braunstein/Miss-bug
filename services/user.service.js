import fs from 'fs'
import Cryptr from 'cryptr'
import { utilService } from './utils.service.js'

const cryptr = new Cryptr(process.env.SECRET1 || 'secret-hh-1234')
const users = utilService.readJsonFile('data/user.json')

export const userService = {
    getLoginToken,
    validateToken,
    checkLogin,
    query,
    getById,
    remove,
    save,
    _saveUsersToFile
}

function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptStr = cryptr.encrypt(str)
    return encryptStr
}

function validateToken(token) {
    const str = cryptr.decrypt(token)
    const user = JSON.parse(str)
    return user
}

function checkLogin({ username, password }) {
    let user = users.find(user => user.username === username)
    if (user) {
        user = {
            _id: user._id,
            fullname: user.fullname,
            isAdmin: user.isAdmin,
        }
    }
    return Promise.resolve(user)
}

function query() {
    return Promise.resolve(users)
}

function getById(userId) {
    const user = users.find(user => user._id = userId)
    if (!userId) return Promise.reject('user not found!')
    return Promise.resolve(user)
}

function remove(userId) {
    users = users.filter(user => user._id !== userId)
    return _saveUsersToFile()
}

function save(user) {
    user._id = utilService.makeId()

    users.unshift(user)
    return _saveUsersToFile().then(() => user)
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        const usersStr = JSON.stringify(users, null, 2)
        fs.writeFile('data/user.json', usersStr, (err) => {
            if (err) {
                return console.error(err);
            }
            resolve()
        })
    })
}



