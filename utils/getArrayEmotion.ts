import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/emotion";

export const getArrayEmotion = async (lineId: string) => {
  // const querySnapshot = await getDocs(collection(db, "emotion"));

  const querySnapshot = await getDocs(
    query(collection(db, "emotion"), orderBy("date"),)
  );

  const emotionArray: emotion[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().line_id === lineId) {
      emotionArray.push(doc.data() as emotion);
    }
  });

  return emotionArray;
};
