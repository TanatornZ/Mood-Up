import { addDoc, collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import DateField from "../components/inputField/DateField";
import TextField from "../components/inputField/TextField";
import { db } from "../firebase/firebaseConfig";
import { RootState } from "../store";
import { setUser } from "../store/user-slice";
import { setLineUser } from "../store/auth-slice";

interface Company {
  id: string;
  name: string;
}
function Register() {
  const lineAuth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [company, setCompany] = useState<Company[]>([]);

  const register = async (values: any): Promise<void> => {
    let position;
    if (values.Anoter_position) {
      position = values.Anoter_position;
    } else {
      position = values.job;
    }
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      date_of_birth: values.date,
      job_position: position,
      line_id: lineAuth.userId,
      company_id: values.company,
      gender: values.gender,
      accept_company: false,

      pictureUrl: lineAuth.pictureUrl,
    };

    try {
      const docRef = await addDoc(collection(db, "user"), {
        ...data,
        accept_company: false,
      });

      dispatch(
        setUser({
          firstName: values.first_name,
          lastName: values.last_name,
          pictureUrl: lineAuth.pictureUrl,
          userId: docRef.id,
        })
      );
      Router.push("/");
    } catch (e) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วนและสมัครอีกครั้ง");
    }
  };

  const getCompany = async () => {
    const querySnapshot = await getDocs(collection(db, "company"));
    const arrayCompany: Company[] = [];
    querySnapshot.forEach((doc) => {
      let id = doc.id;
      let name: string = doc.get("name");
      arrayCompany.push({ id, name });
    });

    setCompany(arrayCompany);
  };

  const genderOption = ["ชาย", "หญิง"];
  const jobOption = [
    "Fornt-end developer",
    "Back-end developer",
    "Project Manager",
    "Tester",
    "Ux/Ui designer",
    "Fullstack developer",
    "Software Engineer",
    "HR",
    "Anoter",
  ];

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div className="flex justify-center flex-col p-7">
      <h1 className="mx-auto text-2xl">กรุณากรอกข้อมูลเบื้องต้น</h1>
      <div className="relative w-32 h-32 mt-3 mx-auto rounded-full overflow-hidden">
        <Image
          src={lineAuth.pictureUrl}
          layout="fill"
          objectFit="cover"
          alt="user"
        />
      </div>
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
              <Field name="line_id">
                {({ input, meta }) => (
                  <TextField
                    name="line_id"
                    key={"line_id"}
                    label={"line_id"}
                    input={input}
                    placeholder={lineAuth.userId}
                    meta={meta}
                    disable={true}
                  />
                )}
              </Field>
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
                      <option value={option} key={option}>
                        {option}
                      </option>
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
              <p className="mt-4  py-2 px-2 text-xl ">ตำแหน่งงาน</p>
              <Field
                key={"job"}
                name="job"
                component="select"
                className="w-full rounded-xl p-3 bg-white border-2"
              >
                <option />
                {jobOption.map((option: any) => {
                  return (
                    <>
                      <option value={option} key={option}>
                        {option}
                      </option>
                    </>
                  );
                })}
              </Field>
              {values.job === "Anoter" ? (
                <Field name="Anoter_position">
                  {({ input, meta }) => (
                    <TextField
                      name="Anoter_position"
                      key={"Anoter_position"}
                      label={"โปรดระบุ"}
                      input={input}
                      placeholder="โปรดระบุ"
                      meta={meta}
                    />
                  )}
                </Field>
              ) : (
                ""
              )}
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
