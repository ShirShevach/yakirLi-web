import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import TopBar from "./components/Head/TopBar";
import Title from "./components/Head/Title";
import Body from "./components/Body/Body";

function App() {
  const baseURL = "http://localhost:3080";
  const [userId, setUserId] = useState("");
  const [persons, setPersons] = useState([]);
  const [counterLitCandles, setCounterLitCandles] = useState("-");
  const [isComputer, setIsComputer] = useState(false);

  const getPersons = useCallback(() => {
    axios
      .get(`${baseURL}/persons`)
      .then((res) => {
        setPersons([...res.data["Persons"]]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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
    // Check if the user has a userId stored in local storage
    let storageUserId = localStorage.getItem("userId");

    // If the user doesn't have a userId, generate a new one and store it in local storage
    if (!storageUserId) {
      storageUserId = uuidv4();
      localStorage.setItem("userId", storageUserId);
    }
    setUserId(storageUserId);
  };

  const getCounterLitCandles = useCallback(() => {
    axios
      .get(`${baseURL}/counterLitCandles`)
      .then((res) => {
        setCounterLitCandles(res.data.counterLitCandles);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getUser();
    getPersons();
    getCounterLitCandles();
  }, []);

  const addPerson = (newPerson) => {
    const uniqueId = uuidv4();
    axios
      .post(`${baseURL}/persons`, { ...newPerson, id: uniqueId })
      .then((res) => {
        getPersons();
      })
      .catch((error) => {
        console.error("Failed adding person:", error);
      });
  };

  const clickCandle = (event) => {
    const personId = event.target.id;
    axios
      .put(`${baseURL}/persons/${personId}&${userId}`, {})
      .then((res) => {
        getPersons();
        getCounterLitCandles();
      })
      .catch((error) => {
        console.log(error.message);
      });
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
