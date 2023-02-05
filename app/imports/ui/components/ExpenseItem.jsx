import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ExpenseItem = ({ expense }) => (
  <tr>
    <td>{expense.name}</td>
    <td>{expense.amount}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_EXPENSE_EDIT} to={`/edit-expense/${expense._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ExpenseItem;
