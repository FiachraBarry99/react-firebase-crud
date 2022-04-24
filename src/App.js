import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [newName, setName] = useState("");
  const [newAge, setAge] = useState(0);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const newFields = { age: age + 1 };

    await updateDoc(doc(db, "users", id), newFields);
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "users"), orderBy("age", "desc"));
      onSnapshot(q, (querySnapshot) => {
        setUsers(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <div class="create-user-inputs">
        <input
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button onClick={createUser}>Create User</button>
      </div>
      {users.map((user) => {
        return (
          <div class="user-card">
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
            </div>
            <div class="buttons-section">
              <button class="update-user"
                onClick={() => {
                  updateUser(user.id, user.age);
                }}
              >
                Increase Age
              </button>

              <button class="delete-user"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
