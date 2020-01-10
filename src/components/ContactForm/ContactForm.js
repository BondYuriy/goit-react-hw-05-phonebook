import React, { Component } from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const inputId = { inputName: v4(), inputNumber: v4() };

export default class ContactForm extends Component {
  static propTypes = {
    onSubmitContact: PropTypes.func.isRequired,
  };

  state = { ...INITIAL_STATE };

  handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    this.setState({
      [name]: value,
    });
  };

  submitForm = evt => {
    evt.preventDefault();

    const { name, number } = this.state;

    const { onSubmitContact } = this.props;

    /* id - только для работы функционала */
    const id = v4();

    onSubmitContact({ name, number, id });

    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.form} onSubmit={this.submitForm}>
        <label className={styles.label} htmlFor={inputId.inputName}>
          <p>Name</p>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            id={inputId.inputName}
          />
        </label>
        <label className={styles.label} htmlFor={inputId.inputNumber}>
          <p>Number</p>
          <input
            className={styles.input}
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
            id={inputId.inputNumber}
          />
        </label>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
