import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Contact from './Contact/Contact';
import styles from './ContactList.module.css';
import slideLeft from './transition/slideLeft.module.css';

const ContactList = ({ contacts, onDelete }) => (
  <TransitionGroup component="ul">
    {contacts.map(contact => {
      const { name, number, id } = contact;
      return (
        <CSSTransition key={name} timeout={250} classNames={slideLeft}>
          <li className={styles.item}>
            <Contact
              name={name}
              number={number}
              onDelete={() => onDelete(id)}
            />
          </li>
        </CSSTransition>
      );
    })}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
