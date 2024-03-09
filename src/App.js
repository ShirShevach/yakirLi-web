import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import TopBar from "./components/Head/TopBar";
import Title from "./components/Head/Title";
import Body from "./components/Body/Body";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { db } from "./config-firebase";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
} from "firebase/firestore";

function App() {
  const [userId, setUserId] = useState("");
  const [persons, setPersons] = useState([]);
  const [counterLitCandles, setCounterLitCandles] = useState("-");
  const [isComputer, setIsComputer] = useState(false);

  // Firestore collections references
  const personsCollection = collection(db, "persons");
  const counterCollection = collection(db, "counter");

  // Fetch user ID, persons data, and counter data on initial render
  useEffect(() => {
    getUser();
    getPersons();
    getCounterLitCandles();
  }, []);

  // Update the 'isComputer' state based on the current screen height
  const updateHeight = () => {
    const device = window.innerWidth < 600 ? false : true;
    setIsComputer(device);
  };

  // Set up event listener for screen resize
  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Function to get or generate user ID
  const getUser = () => {
    // Check if the user has a userId stored in local storage
    let storageUserId = localStorage.getItem("userId");

    // If the user doesn't have a userId, generate a new one and store it in local storage
    if (!storageUserId) {
      storageUserId = uuidv4();
      localStorage.setItem("userId", storageUserId);
    }
    setUserId(storageUserId);
  };

  // Function to fetch persons data from Firestore
  const getPersons = useCallback(async () => {
    try {
      // Create a query to order documents by the "timestamp" field in descending order
      const q = query(personsCollection, orderBy("timestamp", "desc"));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPersons([...filteredData]);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  });

  // Function to fetch counter data from Firestore
  const getCounterLitCandles = useCallback(async () => {
    try {
      const counterDocRef = doc(counterCollection, "1");
      const docSnapshot = await getDoc(counterDocRef);
      setCounterLitCandles(docSnapshot.data().numLit);
    } catch (err) {
      console.log(err);
    }
  });

  // Function to add a new person to Firestore
  const addPerson = async (newPerson) => {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    try {
      await addDoc(personsCollection, {
        ...newPerson,
        users: [],
        timestamp: timestamp,
      });
    } catch (err) {
      console.error(err);
    }
    getPersons(); // Refresh persons data after adding a new person
  };

  // Function to handle click event on Candle
  const clickCandle = async (event) => {
    const personId = event.target.id;
    const currentPerson = doc(db, "persons", personId);

    // update users list in personId
    try {
      const docSnapshot = await getDoc(currentPerson);
      const currentUsers = docSnapshot.data().users || [];
      const updatedUsers = [...currentUsers, userId];
      await updateDoc(currentPerson, { users: updatedUsers });
    } catch (err) {
      console.error(err);
    }

    // increment NumLit
    try {
      const counterDocRef = doc(counterCollection, "1");
      await updateDoc(counterDocRef, {
        numLit: increment(1),
      });
    } catch (err) {
      console.error(err);
    }

    // Refresh persons data and counter data after updating
    getPersons();
    getCounterLitCandles();
  };

  return (
    <div style={{ fontFamily: "Rubik" }}>
      <TopBar />
      <Title counter={counterLitCandles} isComputer={isComputer} />
      <Body
        userId={userId}
        isComputer={isComputer}
        personList={persons}
        clickCandle={clickCandle}
        addPersonToData={addPerson}
      />
    </div>
  );
}

export default App;
