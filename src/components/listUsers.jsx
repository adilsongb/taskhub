import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { dataBase } from '../services/firebase';

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dataBase, 'users'), (querySnapshot) => {
      const array = [];
      querySnapshot.forEach((user) => {
        console.log(user.id);
        array.push(user.data());
      });
      console.log(array);
      setUsers(array);
    });
  }, [])

  return (
    <ul>
      { users.map((user, i) => <li key={ i }>{ `${user.firstName} ${user.lastName}` }</li>) }
    </ul>
  );
}

export default ListUsers;
