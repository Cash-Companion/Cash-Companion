import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Expenses } from '../../api/expense/ExpenseCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addExpense(data) {
  console.log(`  Adding Expense: ${data.name} (${data.owner})`);
  Expenses.define(data);
}

// Initialize the StuffsCollection if empty.
if (Expenses.count() === 0) {
  if (Meteor.settings.defaultExpense) {
    console.log('Creating default data.');
    Meteor.settings.defaultExpense.map(data => addExpense(data));
  }
}
