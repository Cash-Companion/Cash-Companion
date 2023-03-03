import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Expenses } from '../../api/expense/ExpenseCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  date: {
    type: Date,
    defaultValue: today,
  },
  name: String,
  category: {
    type: String,
    allowedValues: ['Housing', 'Transportation', 'Food', 'Utilities', 'Insurance', 'Medical & Healthcare', 'Income'],
    defaultValue: 'Income',
  },
  amount: Number,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddExpense = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    const validDate = (date) => pattern.test(date);
    if (validDate(data.date)) {
      const { date, name, category, amount, description } = data;
      const owner = Meteor.user().username;
      const collectionName = Expenses.getCollectionName();
      const definitionData = { date, name, category, amount, description, owner };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        });
    } else {
      swal('Error', 'Please enter a correct format for date MM/DD/YYYY', 'error');
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ADD_EXPENSE} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Expense</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" placeholder="name" />
                <TextField name="date" placeholder={today} />
                <SelectField name="category" />
                <NumField name="amount" decimal />
                <TextField name="description" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddExpense;
