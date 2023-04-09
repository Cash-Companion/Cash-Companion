import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Chart from 'chart.js/auto';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Expenses } from '../../api/expense/ExpenseCollection';
import ExpenseItem from '../components/ExpenseItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const MySpending = () => {

  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, expenses } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Expenses.subscribeStuff();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const expenseItems = Expenses.find({}, { sort: { date: 1 } }).fetch();
    return {
      expenses: expenseItems,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ready && expenses.length > 0) {
      const categories = {};
      expenses.forEach(expense => {
        if (categories[expense.category]) {
          categories[expense.category] += expense.amount;
        } else {
          categories[expense.category] = expense.amount;
        }
      });

      const chartData = {
        labels: Object.keys(categories),
        datasets: [
          {
            data: Object.values(categories),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#E7E9ED',
              '#4BC0C0',
              '#FF8C9D',
              '#6A2135',
              '#BDD7EA',
              '#C3C3E6',
              '#FDB813',
            ],
          },
        ],
      };

      const options = {
        responsive: false,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'My Report',
        },
      };

      if (chart === null) {
        const newChart = new Chart(chartRef.current, {
          type: 'pie',
          data: chartData,
          options: options,
        });
        setChart(newChart);
      } else {
        chart.data = chartData;
        chart.options = options;
        chart.update();
      }
    }
  }, [ready, expenses, chart]);

  return (ready ? (
    <Container id={PAGE_IDS.LIST_EXPENSE} className="py-3">
      <Col className="text-center">
        <h2>My Spending</h2>
      </Col>
      <Row className="justify-content-center">
        {expenses.map((expense) => <ExpenseItem key={expense._id} expense={expense} />)}
      </Row>
      <Row className="justify-content-center" style={{ paddingTop: '20px' }}>
        <canvas ref={chartRef} width={500} height={600} />
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Expense" />);
};

export default MySpending;
