import "./App.css";
import { useState, useEffect, useCallback } from "react";
import * as Realm from "realm-web";
import { v4 as uuidv4 } from "uuid";
import TopBar from "./components/Head/TopBar";
import Title from "./components/Head/Title";
import Body from "./components/Body/Body";

function App() {
  const [userId, setUserId] = useState("");
  const [persons, setPersons] = useState([]);
  const [counterLitCandles, setCounterLitCandles] = useState("-");
  const [isComputer, setIsComputer] = useState(false);

  const [app, setApp] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [user, setUser] = useState(null);

  const initializeRealm = async () => {
    const app1 = new Realm.App({ id: "application-0-ninrd" });
    const credentials1 = Realm.Credentials.anonymous();
    const user1 = await app1.logIn(credentials1);
    setApp(app1);
    setCredentials(credentials1);
    setUser(user1);
  };

  useEffect(() => {
    // initializeRealm();
  }, []);

  const getPersons = async () => {
    try {
      const data = await user.functions.getAllPersons();
      setPersons([...data.result]);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  const updateHeight = () => {
    const device = window.innerWidth < 600 ? false : true;
    setIsComputer(device);
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const getUser = () => {
    // const cookie = document.cookie;
    // var index = cookie.indexOf("userId=");
    // var userIdString = cookie.slice(index + "userId=".length);
    // if (userIdString === "") {
    //   // cookie is empty, try another way to identify the user
    //   userIdString = navigator.userAgent;
    // }
    // setUserId(userIdString);

    // Check if the user has a userId stored in local storage
    let storageUserId = localStorage.getItem("userId");
    // If the user doesn't have a userId, generate a new one and store it in local storage
    if (!storageUserId) {
      storageUserId = uuidv4();
      localStorage.setItem("userId", storageUserId);
    }
    setUserId(storageUserId);
  };

  const getCounterLitCandles = async () => {
    try {
      const data = await user.functions.getCounterLitCandles();
      setCounterLitCandles(data.result.counter);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  useEffect(() => {
    if (app && credentials && user) {
      getPersons();
      getUser();
      getCounterLitCandles();
    }
  }, [getPersons, getUser, getCounterLitCandles, persons]);

  const addPerson = async (newPerson) => {
    const uniqueId = uuidv4();
    newPerson = { ...newPerson, id: uniqueId };
    try {
      const data = await user.functions.addPerson(newPerson);
      getPersons();
    } catch (err) {
      console.error("Failed in addPerson", err);
    }
  };

  const clickCandle = async (event) => {
    const personId = event.target.id;
    console.log(userId);
    console.log(personId);
    try {
      const data = await user.functions.clickCandle(personId, userId);
      console.log(data.result);
    } catch (err) {
      console.error("Failed in clickCandle", err);
    }
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
