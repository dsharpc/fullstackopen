
const PersonsDisplay = ({persons, personRemover}) => {
    return (
      persons.map(person => <p key={person.name}>{person.name} - {person.number} <button onClick={() => personRemover(person.id)}>delete</button></p>)
    )

}

export default PersonsDisplay