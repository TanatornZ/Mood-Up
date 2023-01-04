import React from "react";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const TeamMood = () => {
  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    //get data
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <div>
      <h1>Teammood </h1>
      <button onClick={addData}>click to add </button>
      <button onClick={getData}>click to get </button>
    </div>
  );
};

export default TeamMood;
