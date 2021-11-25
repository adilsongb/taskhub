import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
// import { serverTimestamp, doc, setDoc, updateDoc, getDocs,  getDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase'; 

function Forms() {
  const initialUser = {
    firstName: '',
    lastName: '',
    age: '',
  }
  const [user, setUser] = useState(initialUser);

  async function saveInDB(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dataBase, 'users'), user);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async function viewDb(e) {
    e.preventDefault();
    /* const querySnapshot = await getDocs(collection(dataBase, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    }); */
    /* await setDoc(doc(dataBase, 'users', 'teste'), {
      object: { a: 1, b: 2 },
    }, { merge: true }); */
    /* await updateDoc(doc(dataBase, 'users', 'teste'), {
      timestamp: serverTimestamp(),
    }); */
    /* const docSnap = await getDoc(doc(dataBase, 'users', 'teste'));
    console.log(docSnap.data()); */
  }

  function handleChange({ target }) {
    setUser({ ...user, [target.name]: target.value });
  }

  return(
    <form>
      <input
        type="text"
        name="firstName"
        placeholder="Primeiro Nome"
        onChange={ handleChange }
      />
      <input
        type="text"
        name="lastName"
        onChange={ handleChange }
        placeholder="Segundo Nome"
      />
      <input
        type="number"
        name="age"
        onChange={ handleChange }
        placeholder="Idade"
      />
      <button onClick={ saveInDB }>Salvar</button>
      <button onClick={ viewDb }>Ver no console</button>
    </form>
  );
}

export default Forms;
