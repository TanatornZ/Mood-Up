import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FieldInputProps, FieldMetaState } from "react-final-form";
import { AiOutlineCalendar } from "react-icons/ai";

type Props = {
  label?: string;
  placeholder: string;
  img?: string[];
  name: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
};

function InputField({ label, placeholder, input, meta, name }: Props) {
  if (name === "date") {
    return (
      <div className="flex items-center mt-5">
        {label && <p className="py-2 px-2 text-xl grow ">{label}</p>}
        <div className="relative">
          <input
            type="date"
            {...input}
            className={`rounded-xl p-3 bg-white border-2`}
            placeholder={placeholder}
            id='date'
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
  return (
    <div className="w-full">
      {label && <p className="mt-4  py-2 px-2 text-xl ">{label}</p>}
      <div className="relative">
        <input
          type="text"
          {...input}
          className={`w-full rounded-xl p-3 bg-white border-2`}
          placeholder={placeholder}
        />
      </div>
      {meta.error && meta.touched && (
        <p className="  p-2 text-error-600">{meta.error}</p>
      )}
    </div>
  );
}

export default InputField;
