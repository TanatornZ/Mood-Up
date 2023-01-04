import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import React from "react";
import { Form, Field } from "react-final-form";
import DateField from "../components/inputField/DateField";
import TextField from "../components/inputField/TextField";

function Register() {
  const register = async (values: any): Promise<void> => {
    console.log(values);
  };

  const roleOptions = ["test", "test1"];

  return (
    <div className="flex justify-center flex-col p-7">
      <h1 className="mx-auto text-2xl">กรุณากรอกข้อมูลเบื้องต้น</h1>
      <Form
        onSubmit={register}
        // initialValues={{ stooge: "larry", employed: false }}
        render={({ handleSubmit, form, submitting, errors, values }) => {
          return (
            <form
              onSubmit={async (event) => {
                await handleSubmit(event);
              }}
            >
              <Field name="first_name">
                {({ input, meta }) => (
                  <TextField
                    name="first_name"
                    label={"ชื่อ"}
                    input={input}
                    placeholder="ชื่อ"
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="last_name">
                {({ input, meta }) => (
                  <TextField
                    name="last_name"
                    label={"สกุล"}
                    input={input}
                    placeholder="สกุล"
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="date">
                {({ input, meta }) => (
                  <DateField
                    name="date"
                    label={"วัน/เดือน/ปีเกิด"}
                    input={input}
                    placeholder="23/12/2000"
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="job">
                {({ input, meta }) => (
                  <TextField
                    name="job"
                    label={"ตำแหน่งงาน"}
                    input={input}
                    placeholder="ตำแหน่งงาน"
                    meta={meta}
                  />
                )}
              </Field>
              <p className="mt-4  py-2 px-2 text-xl ">บริษัท</p>
              <Field
                name="company"
                component="select"
                className="w-full rounded-xl p-3 bg-white border-2"
              >
                <option />
                {roleOptions.map((option) => {
                  return (
                    <>
                      <option value={option}>{option}</option>
                    </>
                  );
                })}
              </Field>
              <button
                className={`mx-auto mt-8 flex rounded-md bg-paybtn py-3 px-8 border-2 `}
                type="submit"
              >
                สมัคร
              </button>
            </form>
          );
        }}
      ></Form>
    </div>
  );
}

export default Register;
