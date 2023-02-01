import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";

export const getArrayEmotion = async (lineId: string) => {
  const querySnapshot = await getDocs(collection(db, "emotion"));
  const emotionArray: emotion[] = [];
  querySnapshot.forEach((doc) => {
    // check id
    if (doc.data().line_id === lineId) {
      emotionArray.push(doc.data() as emotion);
      // console.log(doc.data())
    }
  });

  return emotionArray;
};
