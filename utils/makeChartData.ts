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
    switch (emotion.emotion) {
      case 1:
        data[0].count += 1;
        break;
      case 2:
        data[1].count += 1;
        break;
      case 3:
        data[2].count += 1;
        break;
      case 4:
        data[3].count += 1;
        break;
      case 5:
        data[4].count += 1;
        break;
    }
  });

  return data;
};
