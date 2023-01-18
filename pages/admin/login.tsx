import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import PasswordField from "../../components/inputField/PasswordField";
import TextField from "../../components/inputField/TextField";
import { db } from "../../firebase/firebaseConfig";
import { AuthAdmin, setAdmin } from "../../store/adminAuth-slice";

interface AuthEmail {
  email: string;
  password: string;
}
function Login() {
  const router = useRouter();
  const auth = getAuth();
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const getAdminId = async (user: string) => {
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      // check id
      if (doc.data().UID === user) {
        dispatch(setAdmin({ admin: user, company: doc.data().company_id }));
      }
    });
  };

  const Login = async (values: AuthEmail) => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        getAdminId(user.uid);
        router.push("/admin");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="bg-gray-100 h-screen flex  items-center flex-col">
      <div className="w-60 h-72  relative mt-10">
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
                    <PasswordField
                      name="password"
                      key={"password"}
                      label={"รหัสผ่าน"}
                      input={input}
                      placeholder="รหัสผ่าน"
                      meta={meta}
                    />
                  )}
                </Field>
                {error && (
                  <h1 className="text-red-500 text-center mt-3">{error}</h1>
                )}
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

export default Login;
