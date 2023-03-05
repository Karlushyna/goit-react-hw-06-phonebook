import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import  Section  from "./Section/Section";
import   ContactForm    from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { getContacts, getFilter } from "redux/selectors";
import { addContact, removeContact } from "redux/actions";
import { useDispatch } from "react-redux";


export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const [firstFlag, setFirstFlag] = useState(true);



  useEffect(() => {
    if (firstFlag) {
      const localStorageContacts = localStorage.getItem('contactList');

      if (localStorageContacts !== 'undefined') {
        const parsedContacts = JSON.parse(localStorageContacts);

        if (parsedContacts) {
          // setContacts(parsedContacts);
        }
      }
      setFirstFlag(false);
    } else {
      localStorage.setItem('contactList', JSON.stringify(contacts));
    }
  }, [contacts, firstFlag]);

    const handleSubmit = e => {
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact(name, number));
    }
};

const handleDelete = e => {
  dispatch(removeContact(e));
}

const getFilteredContacts = () => {
  const filterContactsList = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  return filterContactsList;
};

  return (
    <Section>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2> Contacts</h2>
      <Filter />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={handleDelete}
      />
    </Section>
  );

}


// export const App = () => {
//   const [contacts, setContacts] = useState([
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);

//   const [firstFlag, setFirstFlag] = useState(true);

//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     if (firstFlag) {
//       const localStorageContacts = localStorage.getItem('contactList');

//       if (localStorageContacts !== 'undefined') {
//         const parsedContacts = JSON.parse(localStorageContacts);

//         if (parsedContacts) {
//           setContacts(parsedContacts);
//         }
//       }
//       setFirstFlag(false);
//     } else {
//       localStorage.setItem('contactList', JSON.stringify(contacts));
//     }
//   }, [contacts, firstFlag]);

//   const handleChange = e => {
//     const { value } = e.target;
//     setFilter(value);
//   };

//   const handleSubmit = e => {
//     const id = nanoid();
//     const name = e.name;
//     const number = e.number;
//     const contactsLists = [...contacts];

//     if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
//       alert(`${name} is already in contacts.`);
//     } else {
//       contactsLists.push({ id, name, number });
//     }

//     setContacts(contactsLists);
//   };

//   const handleDelete = e => {
//     setContacts(contacts.filter(contact => contact.id !== e));
//   };

//   const getFilteredContacts = () => {
//     const filterContactsList = contacts.filter(contact => {
//       return contact.name.toLowerCase().includes(filter.toLowerCase());
//     });
//     return filterContactsList;
//   };

//   return (
//     <Section>
//       <h1>Phonebook</h1>
//       <ContactForm handleSubmit={handleSubmit} />
//       <h2> Contacts</h2>
//       <Filter filter={filter} handleChange={handleChange} />
//       <ContactList
//         contacts={getFilteredContacts()}
//         handleDelete={handleDelete}
//       />
//     </Section>
//   );
// };
