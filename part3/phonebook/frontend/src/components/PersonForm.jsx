const PersonForm = ({ addNameFn, nameValue, numberValue, onNameChange, onPhoneChange }) => {
    return (
        <form onSubmit={addNameFn}>
            <div>
                name: <input value={nameValue} onChange={onNameChange} />
            </div>
            <div>
                number:<input value={numberValue} onChange={onPhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
