const { useState, useEffect } = React


export function BugFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log('value', value);
        console.log('field', field);
        if (type === 'number') value = +value
        setFilterByToEdit((prevFilterBy) => ({...prevFilterBy, [field]: value}))

    }

    const { title , minSeverity } = filterByToEdit

    return <section className="bug-filter">
        <h2>Filter our Bugs</h2>
        {console.log(filterByToEdit)
        }
        <form onSubmit={onFilter}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleChange}
                placeholder="By title"
            />

            <label htmlFor="minSeverity">severity</label>
            <input
                type="number"
                name="minSeverity"
                id="minSeverity"
                value={minSeverity}
                onChange={handleChange}
                placeholder="By severity"
            />

            <label htmlFor="labels">Labels</label>
            <select name="labels"
                onChange={handleChange}
            >
                <option value="critical">Critical</option>
                <option value="need-CR">Need CR</option>
                <option value="dev-branch">Dev branch</option>

            </select>

        </form>
    </section>



}

