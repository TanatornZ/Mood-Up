import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";

export const makeChartData = (emotionArray: emotion[]) => {
  let data = [
    { emotion: 1, count: 0, color: "rgb(230, 76, 60)" },
    { emotion: 2, count: 0, color: "rgb(240, 196, 25)" },
    { emotion: 3, count: 0, color: "rgb(59, 151, 211)" },
    { emotion: 4, count: 0, color: "rgb(151, 242, 177)" },
    { emotion: 5, count: 0, color: "rgb(79, 186, 111)" },
  ];

  emotionArray.map((emotion) => {
    for (let dataItem in data) {
      if (data[dataItem].emotion === emotion.emotion) {
        data[dataItem].count += 1;
      }
    }
  });

  return data;
};



function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const addEmotion = async () => {
  addDoc(collection(db, "emotion"), {
    date: new Date(),
    emotion: randomIntFromInterval(1, 5),
    line_id: "U03b155b3f617330ebe19fd13038964eb",
  });
};

