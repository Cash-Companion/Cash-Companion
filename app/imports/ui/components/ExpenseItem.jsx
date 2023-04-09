import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Expenses } from '../../api/expense/ExpenseCollection';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ExpenseItem = ({ expense }) => (
  <Card style={{ width: '18rem', backgroundColor: 'white' }}>
    <Card.Header>{expense.name}</Card.Header>
    <Card.Body>
      <Card.Title>{expense.date}</Card.Title>
      <Card.Subtitle>Category: {expense.category}</Card.Subtitle>
      <Card.Title>${expense.amount}</Card.Title>
      <Card.Text>{expense.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Button class="btn btn-outline-dark" className={COMPONENT_IDS.LIST_EXPENSE_EDIT} to={`/edit-expense/${expense._id}`}> Edit</Button>
      <Button class="btn btn-outline-danger"
        onClick={() => {
          swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Spending',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                const collectionName = Expenses.getCollectionName();
                const instance = expense._id;
                removeItMethod.callPromise({ collectionName, instance })
                  .catch(error => swal('Error', error.message, 'error'))
                  .then(() => {
                    swal('Success', 'Spending has been deleted!', 'success');
                  });
              } else {
                swal("Don't Worry", 'Your spending data is safe!', 'info');
              }
            });
        }}
      >
        Delete
      </Button>
    </Card.Footer>
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
