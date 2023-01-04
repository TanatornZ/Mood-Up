import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import DateField from "../components/inputField/DateField";
import TextField from "../components/inputField/TextField";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../firebase/firebaseConfig";


function Register() {
  const userContext = useContext(AuthContext);
  const [error, setError] = useState("");
  const register = async (values: any): Promise<void> => {
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      date_of_birth: values.date,
      job_position: values.job,
      line_id: userContext?.user,
      company: values.company,
      gender: values.gender,
    };

    try {
      const docRef = await addDoc(collection(db, "user"), {
        ...data,
        accept_company: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วนและสมัครอีกครั้ง");
    }
  };

  const [company, setCompany] = useState<any>([]);

  const getCompany = async () => {
    const querySnapshot = await getDocs(collection(db, "company"));
    const arrayCompany: { id: string; name: string }[] = [];
    querySnapshot.forEach((doc) => {
      let id = doc.id;
      let name: string = doc.get("name");
      arrayCompany.push({ id, name });
    });

    setCompany(arrayCompany);
  };

  const genderOption = ["ชาย", "หญิง"];
  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div className="flex justify-center flex-col p-7">
      <h1 className="mx-auto text-2xl">กรุณากรอกข้อมูลเบื้องต้น</h1>
      <Form
        onSubmit={register}
        // validate={validationRegister}
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
                    key={"first_name"}
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
                    key={"last_name"}
                    label={"สกุล"}
                    input={input}
                    placeholder="สกุล"
                    meta={meta}
                  />
                )}
              </Field>
              <p className="mt-4  py-2 px-2 text-xl ">เพศ</p>
              <Field
                key={"gender"}
                name="gender"
                component="select"
                className="w-full rounded-xl p-3 bg-white border-2"
              >
                <option />
                {genderOption.map((option: any) => {
                  return (
                    <>
                      <option value={option}>{option}</option>
                    </>
                  );
                })}
              </Field>
              <Field name="date" key={"date"}>
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
                    key={"job"}
                    label={"ตำแหน่งงาน"}
                    input={input}
                    placeholder="ตำแหน่งงาน"
                    meta={meta}
                  />
                )}
              </Field>
              <p className="mt-4  py-2 px-2 text-xl ">บริษัท</p>
              <Field
                key={"company"}
                name="company"
                component="select"
                className="w-full rounded-xl p-3 bg-white border-2"
              >
                <option />
                {company.map((option: any) => {
                  return (
                    <>
                      <option value={option.id}>{option.name}</option>
                    </>
                  );
                })}
              </Field>
              {error && (
                <h1 className="text-center mt-4 text-red-600">{error}</h1>
              )}
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
