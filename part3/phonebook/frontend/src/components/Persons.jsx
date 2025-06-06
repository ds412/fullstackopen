const Persons = ({ persons, removeHandler }) => {
    return (
        <> {
            persons.map(person =>
                <p key={person.id}>
                    {person.name} {person.number}
                     &nbsp;
                    <button onClick={() => removeHandler(person)}>delete</button>
                </p>
            )
        }
        </>
    )
}
export default Persons
