import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";

export const getUserInCompany = async (companyId: string) => {
  //get data
  console.log(companyId);
  const querySnapshot = await getDocs(collection(db, "user"));
  const userId: any[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().company_id === companyId) {
      userId.push(doc.data().line_id);
    }
  });
  return userId;
};

export const getArrayEmotionWithDate = async (userArray: any[], date: Date) => {
  const querySnapshot = await getDocs(collection(db, "emotion"));
  const emotionArray: emotion[] = [];
  querySnapshot.forEach((doc) => {
    // check id.secconds * 1000.secconds * 1000
    if (userArray.includes(doc.data().line_id)) {
      let ed = new Date(doc.data().date.seconds * 1000);
      console.log(ed);
      if (ed.toISOString().split("T")[0] === date.toISOString().split("T")[0]) {
        emotionArray.push(doc.data() as emotion);
      }
    }
  });
  return emotionArray;
};

export const findAvrEmotion = (emotionArray: emotion[]) => {
  let sumEmotion = emotionArray.reduce(function (prev, curr) {
    return prev + curr.emotion;
  }, 0);

  let avr = sumEmotion / emotionArray?.length;

  return Math.floor(avr);
};