import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fieldType } from "../../interface/fieldInterface";

function TextField({
  label,
  placeholder,
  input,
  meta,
  name,
  disable,
}: fieldType) {
  return (
    <div className="w-full">
      {label && <p className="mt-4  py-2 px-2 text-xl ">{label}</p>}
      <div className="relative">
        <input
          type="text"
          {...input}
          className={`w-full rounded-xl p-3 ${disable ? 'bg-secondary' : 'bg-white'}  border-2`}
          placeholder={placeholder}
          disabled={disable}
        />
      </div>
      {meta.error && meta.touched && (
        <p className="  p-2 text-error-600">{meta.error}</p>
      )}
    </div>
  );
}

export default TextField;
