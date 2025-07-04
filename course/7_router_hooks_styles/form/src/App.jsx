import { useState } from 'react'

// custom hook to manage a single field of the form
const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return { type, value, onChange }
}

const App = () => {
    // each field is a custom hook, managing its own state
    const name = useField('text')
    const born = useField('date')
    const height = useField('number')

    return (
        <div>
            {/* Use spread syntax <input {... name} /> since we have the correct number of variables
                identical to <input type={name.type} value={name.value} onChange={name.onChange} />
            */}
            <form>
                name:
                <input {...name} />
                <br />
                birthdate:
                <input {...born} />
                <br />
                height:
                <input {...height} />
            </form>
            <div>
                {name.value} {born.value} {height.value}
            </div>
        </div>
    )
}


export default App
