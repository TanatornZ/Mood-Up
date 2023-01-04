import React, { useContext, useEffect, useState } from "react";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { AuthContext } from "../context/AuthProvider";
import { Line } from "react-chartjs-2";

const TeamMood = () => {
  const userContext = useContext(AuthContext);
  const [register, setRegister] = useState(false);
  // const addData = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  const checkRegister = async (Line_id: string | undefined) => {
    //get data
    let status = false;
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
      if (doc.data().line_id === Line_id) {
        status = true;
        return;
      } else {
        status = false;
      }
    });

    return status;
  };

  useEffect(() => {
    console.log(userContext?.user)
    checkRegister(userContext?.user).then((value) => {
      setRegister(value);
      // console.log(`value ${value}`);
    });
  });

  console.log(register);

  const getData = async () => {
    //get data
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data().first_name);
      console.log(`${doc.id} => ${doc}`);
    });
  };

  return <div>{register ? <h1>pass</h1> : <h1>error</h1>}</div>;
};

export default TeamMood;
