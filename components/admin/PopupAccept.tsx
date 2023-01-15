import React from "react";

interface Props {
  showAccept: boolean;
}
function PopupAccept(props: Props) {

  //list check user 
  

  return (
    <div
      className={`bg-white border border-3 p-3  w-96 absolute top-16 right-5 rounded-lg transition-all origin-[90%] delay-200 ${
        props.showAccept ? "scale-100	" : "scale-0	"
      }`}
    >
      <h1 className="text-xl text-center">คำร้อง</h1>
    </div>
  );
}

export default PopupAccept;
