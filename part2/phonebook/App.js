import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Contacts = ({contacts, deleteHandler}) => {
  return (
    <div>
      {contacts.map(contact => {
        return (
          <p key={contact.id}>{contact.name}: {contact.number}
            <button 
              onClick={() => deleteHandler(contact.id)}>Delete
            </button>
          </p>
        )
      })}
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.className}>
      {message.text}
    </div>
  )
}

const Filter = ({newFilter, filterHandler}) => {
  return (
    <div>
      filter shown with <input
                          value={newFilter}
                          onChange={filterHandler}
                        />
    </div>
  )
};

const PersonForm = ({submitHandler, newName, nameInputHandler, newNumber, numberInputHandler}) => {
  return (
    <form onSubmit={submitHandler}>
    <div>
      name: <input 
              value={newName}
              onChange={nameInputHandler}
            />
    </div>
    <div>
      number: <input
                value={newNumber}
                onChange={numberInputHandler}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '123456789', id:0 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    personsService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  function changeMessage(text, className) {
    setMessage({
      text,
      className,
    });

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const personsToShow = newFilter === '' ? persons : 
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  const nameInputHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberInputHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (Object.values(persons).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {name: newName, number: newNumber, id: persons.length + 1};

      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons].concat(returnedPerson));
          changeMessage(`Successfully added ${returnedPerson.name}`, 'success');
        })
        .catch(error => {
          changeMessage(`An error occured: ${error}`, 'error');
        })
    }
    setNewName('');
    setNewNumber('');
  };

  const filterHandler = (e) => {
    setNewFilter(e.target.value);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      const person = persons.filter(person => person.id === id)[0]
      personsService
        .remove(id)
        .then( _ => {
          const newPersons = persons.filter(person => person.id !== id);
          setPersons(newPersons);
          changeMessage(`Successfully deleted ${person.name}`, 'success');
        });
    }
  };

  return (
    <div>
      <Notification message={message}/>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} filterHandler={filterHandler}/>
      <h2>Add a new</h2>
      <PersonForm 
        submitHandler={submitHandler} 
        newName={newName} 
        nameInputHandler={nameInputHandler}
        newNumber={newNumber}
        numberInputHandler={numberInputHandler}/>
      <h2>Numbers</h2>
      <Contacts 
        contacts={personsToShow}
        deleteHandler={deleteHandler}
      />
    </div>
  )
}

export default App