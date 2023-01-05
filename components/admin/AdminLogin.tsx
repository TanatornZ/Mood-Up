import Image from "next/image";
import React from "react";
import { Field, Form } from "react-final-form";
import TextField from "../inputField/TextField";

function AdminLogin() {
  const Login = (values: any) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    console.log(data);
  };

  return (
    <div className="bg-secondary h-screen flex  items-center flex-col">
      <div className="w-52 h-60 relative mt-10">
        <Image src="/images/logo.png" layout="fill" alt="mood" />
      </div>
      <div className="bg-white w-2/6 p-5 rounded-xl shadow-xl mt-3">
        <h1 className="text-3xl text-center">เข้าสู่ระบบ</h1>
        <Form
          onSubmit={Login}
          render={({ handleSubmit, form, submitting, errors, values }) => {
            return (
              <form
                onSubmit={async (event) => {
                  await handleSubmit(event);
                }}
              >
                <Field name="email">
                  {({ input, meta }) => (
                    <TextField
                      name="email"
                      key={"email"}
                      label={"อีเมล"}
                      input={input}
                      placeholder="อีเมล"
                      meta={meta}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ input, meta }) => (
                    <TextField
                      name="password"
                      key={"password"}
                      label={"รหัสผ่าน"}
                      input={input}
                      placeholder="รหัสผ่าน"
                      meta={meta}
                    />
                  )}
                </Field>

                <button
                  className={`mx-auto mt-8 flex rounded-md bg-paybtn py-3 px-8 border-2 hover:bg-slate-100`}
                  type="submit"
                >
                  เข้าสู่ระบบ
                </button>
              </form>
            );
          }}
        ></Form>
      </div>
    </div>
  );
}

export default AdminLogin;
