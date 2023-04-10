import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Button, Table, Container } from 'react-bootstrap';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';

// React component to edit and delete users
const ManageAccounts = () => {
  const { ready, userProfiles } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const rdy = subscription.ready();
    const users = UserProfiles.find({}).fetch();
    return {
      ready: rdy,
      userProfiles: users,
    };
  }, []);
  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  function handleDelete(profileID) {
    const collectionName = UserProfiles.getCollectionName();
    swal({
      title: 'Delete this user?',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const instance = profileID;
          removeItMethod.callPromise({ collectionName, instance })
            .catch(error => swal('Error', error.message, 'error'))
            .then(() => swal('Success', 'User Removed Successfully', 'success'));
        } else {
          swal('The user is safe!');
        }
      });
  }
  return (ready ? (
    <Container>
      <Table responsive id={PAGE_IDS.MANAGE_ACCOUNTS}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { userProfiles.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td><Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner />);
};

export default ManageAccounts;
