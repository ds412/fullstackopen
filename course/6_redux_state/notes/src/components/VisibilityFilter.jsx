import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
    const dispatch = useDispatch()
    return (
        <div>
            {/* Radio button group (name 'filter' identical for all) */}
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))} />
            all
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))} />
            important
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
            unimportant
        </div>
    )
}

export default VisibilityFilter
