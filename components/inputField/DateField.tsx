import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { fieldType } from "../../interface/fieldInterface";

function DateField({ label, placeholder, input, meta }: fieldType) {
  return (
    <div className="flex items-center mt-5">
      {label && <p className="py-2 px-2 text-xl grow ">{label}</p>}
      <div className="relative">
        <input
          type="date"
          {...input}
          className={`rounded-xl p-3 bg-white border-2`}
          placeholder={placeholder}
          id="date"
        />
      </div>
      {/* <div className="absolute right-12">
            <AiOutlineCalendar />
          </div> */}

      {meta.error && meta.touched && (
        <p className="  p-2 text-error-600">{meta.error}</p>
      )}
    </div>
  );
}

export default DateField;
