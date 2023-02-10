import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Expenses } from '../../api/expense/ExpenseCollection';
import ExpenseItem from '../components/ExpenseItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListExpense = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, expenses } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Expenses.subscribeStuff();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const expenseItems = Expenses.find({}, { sort: { name: 1 } }).fetch();
    return {
      expenses: expenseItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_EXPENSE} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Expense</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => <ExpenseItem key={expense._id} expense={expense} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Expense" />);
};

export default ListExpense;
