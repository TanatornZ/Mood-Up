import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import React from "react";
import { Form, Field } from "react-final-form";
import InputField from "../components/InputField";

function Register() {
  const register = async (values: any): Promise<void> => {
    console.log(values);
  };

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
                  <InputField
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
                  <InputField
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
                  <InputField
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
                  <InputField
                    name="job"
                    label={"ตำแหน่งงาน"}
                    input={input}
                    placeholder="ตำแหน่งงาน"
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="company">
                {({ input, meta }) => (
                  <InputField
                    name="company"
                    label={"บริษัท"}
                    input={input}
                    placeholder="บริษัท"
                    meta={meta}
                  />
                )}
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
