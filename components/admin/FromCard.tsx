import React, { FC } from "react";

interface Props {
  children: JSX.Element;
}
const FromCard: FC<Props> = ({ children }) => {
  return (
    <div className=" w-64 justify-center items-center p-5 bg-white rounded-xl">
      {children}
    </div>
  );
};

export default FromCard;
