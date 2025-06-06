const Filter = ({filterValue, onFilterChange}) => {
    return (
        <form>
            current filter: <input value={filterValue} onChange={onFilterChange}></input>
        </form>
    )
}

export default Filter
