import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ExpenseItem = ({ expense }) => (
  <Card bg="light" style={{ width: '18rem' }}>
    <Card.Header>{expense.name}</Card.Header>
    <Card.Body>
      <Card.Title>{expense.date}</Card.Title>
      <Card.Title>{expense.category}</Card.Title>
      <Card.Subtitle>${expense.amount}</Card.Subtitle>
      <Card.Text>{expense.description}</Card.Text>
    </Card.Body>
    <Link className={COMPONENT_IDS.LIST_EXPENSE_EDIT} to={`/edit-expense/${expense._id}`}> Edit</Link>
  </Card>

);

// Require a document to be passed to this component.
ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ExpenseItem;
