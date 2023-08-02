import React from 'react';
import { useState, useEffect } from 'react';
import { ContactList } from './contactList/contactList';
import { ContactForm } from './contactForm/contactForm';
import { Layout } from './layout/layout';
import { Filter } from './filter/filter';

const LS_KEY = "contacts-phonebook";

export const App = () => {
const [contacts, setContacts] = useState([]);
const [filter, setFilter] = useState('');
  
useEffect(() => {
    const contacts = localStorage.getItem(LS_KEY);
    if(contacts && Array.isArray(JSON.parse(contacts)) && JSON.parse(contacts).length > 0) {
      setContacts(JSON.parse(contacts));
    }
}, []);

useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts])

  const handleSubmit = newContact => {
    const { name } = newContact;
    const contactExists = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    
    if(contactExists) {
      alert(`${newContact.name} is already in contact`);
    } else {
      setContacts([...contacts, newContact]);
    }
    };

  const handleFilter = e => {
   setFilter(e.currentTarget.value);
  };

  const handleContactDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const getVisibleContacts = () => {
    const filterNormalized = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterNormalized));
  };

return (
    <Layout>
    <h1>Phonebook</h1>
    <ContactForm onSave={handleSubmit} />
    <h2>Contacts</h2>
    <Filter onChange={handleFilter} value={filter} />
    <ContactList contacts={getVisibleContacts()} onDelete={handleContactDelete} />
    </Layout>
    );
}
