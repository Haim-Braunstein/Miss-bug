const { Link, useSearchParams } = ReactRouterDOM


import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { utilService } from '../services/util.service.js'

const { useState, useEffect, useRef } = React

export function BugIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [bugs, setBugs] = useState(null)
    const [filterBy, setFilterBy] = useState(bugService.getFilterFromParams(searchParams))
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    console.log(filterBy);

    useEffect(() => {
        setSearchParams(filterBy)
        loadBugs()


    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate',fieldsToUpdate);
        setFilterBy(prevFilter => {

            console.log(prevFilter);
            return { ...prevFilter, ...fieldsToUpdate }

        })
    }
    

    function loadBugs() {
        bugService.query(filterBy).then(bugs => {
            setBugs(bugs)
        })
    }

    function onRemoveBug(bugId) {
        bugService
            .remove(bugId)
            .then(() => {
                console.log('Deleted Succesfully!')
                const bugsToUpdate = bugs.filter((bug) => bug._id !== bugId)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug removed')
            })
            .catch((err) => {
                console.log('Error from onRemoveBug ->', err)
                showErrorMsg('Cannot remove bug')
            })
    }

    function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            description: prompt('Bug description'),
            severity: +prompt('Bug severity?'),
        }
        bugService
            .save(bug)
            .then((savedBug) => {
                console.log('Added Bug', savedBug)
                setBugs([...bugs, savedBug])
                showSuccessMsg('Bug added')
            })
            .catch((err) => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
            })
    }

    function onEditBug(bug) {
        console.log(bug);
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        bugService
            .save(bugToSave)
            .then((savedBug) => {
                console.log('Updated Bug:', savedBug)
                const bugsToUpdate = bugs.map((currBug) => {
                    return currBug._id === savedBug._id ? savedBug : currBug
                })
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug updated')
            })
            .catch((err) => {
                console.log('Error from onEditBug ->', err)
                showErrorMsg('Cannot update bug')
            })
    }
    if (!bugs) return <div>loading...</div>
    return (
        <main>
            <h3>Bugs App</h3>
            <main>
            {/* {console.log(debounceOnSetFilter)} */}

                <BugFilter
                    onSetFilter={debounceOnSetFilter.current}
                    filterBy={filterBy}
                />
                <button onClick={onAddBug}>Add Bug ⛐</button>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </main>
    )
}
