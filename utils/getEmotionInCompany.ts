import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";

export const getUserInCompany = async (companyId: string) => {
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
    if (userArray.includes(doc.data().line_id)) {
      let ed = new Date(doc.data().date.seconds * 1000);

      console.log(ed);
      if (splitDate(ed) === splitDate(date)) {
        console.log("pass");
        emotionArray.push(doc.data() as emotion);
      }
    }
  });
  return emotionArray;
};

export const splitDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const findAvrEmotion = (emotionArray: emotion[]) => {
  let sumEmotion = emotionArray.reduce(function (prev, curr) {
    return prev + curr.emotion;
  }, 0);

  const getAvr = () => {
    return sumEmotion / emotionArray?.length;
  };

  return Math.floor(getAvr());
};
