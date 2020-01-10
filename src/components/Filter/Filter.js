import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filter, onFilterChange }) => (
  <div className={styles.filter}>
    <p>Find contacts by name</p>
    <input
      className={styles.input}
      type="text"
      name="filter"
      value={filter}
      onChange={onFilterChange}
    />
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
