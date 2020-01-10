import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import styles from './App.module.css';
import slideLeftAppear from './transition/slideLeftAppear.module.css';
import fideTransition from './transition/fide.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));

    if (storageContacts !== null) {
      this.setState({ contacts: storageContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = obj => {
    const { contacts } = this.state;

    const isResult = contacts.filter(
      contact =>
        contact.name.toLocaleLowerCase() === obj.name.toLocaleLowerCase(),
    );

    if (isResult.length > 0) {
      toast.error('Сontact exists!');
    } else {
      this.setState(prevState => ({
        contacts: [obj, ...prevState.contacts],
      }));
    }
  };

  handleFilterChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    this.setState({
      [name]: value,
    });
  };

  deleteContact = id => {
    const { contacts } = this.state;

    this.setState({ contacts: contacts.filter(contact => contact.id !== id) });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredFriends = contacts.filter(friend =>
      friend.name.toLocaleLowerCase().includes(filter),
    );

    return (
      <div className={styles.container}>
        <ToastContainer />
        <CSSTransition in timeout={500} classNames={slideLeftAppear} appear>
          <h1 className={styles.logo}>Phonebook</h1>
        </CSSTransition>
        <ContactForm onSubmitContact={this.addContact} />

        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={fideTransition}
          unmountOnExit
        >
          <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        </CSSTransition>

        {contacts.length > 0 && (
          <ContactList
            contacts={filteredFriends}
            onDelete={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
