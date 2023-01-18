import React from "react";

interface Props {
  information: any;
  docId: any;
}
function EmployeeList(props: Props) {
  const information = props.information;
  return (
    <div className="p-5  flex justify-between px-20">
      <div className="">
        <h1>
          {information.first_name} {information.last_name}
        </h1>
        <h1 className="mt-2">position : {information.job_position}</h1>
      </div>
      <div className="p-3 bg-slate-600 text-center rounded-xl cursor-pointer text-white">
        <h1 className="text-lg">edit</h1>
      </div>
    </div>
  );
}

export default EmployeeList;
