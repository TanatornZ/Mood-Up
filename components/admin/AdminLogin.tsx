import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import TextField from "../inputField/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import PasswordField from "../inputField/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setCompany } from "../../store/adminAuth-slice";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { ROUTES_MANIFEST } from "next/dist/shared/lib/constants";

function AdminLogin() {
  const router = useRouter();
  const auth = getAuth();

  const [error, setError] = useState<boolean>(false);

  const adminAuth = useSelector((state: any) => state.adminAuth.adminId);
  const companyId = useSelector((state: any) => state.adminAuth.companyId);
  const dispatch = useDispatch();

  const getCompanyName = async () => {
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      console.log("pass to get company " + adminAuth);
      //check id
      if (doc.data().UID === adminAuth) {
        console.log("company id " + doc.data().company_id);
        dispatch(setCompany(doc.data().company_id));
        // console.log(companyId);
      }
    });
  };

  const Login = (values: any) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // keep admin Id
        dispatch(setAdmin(user.uid));

        await getCompanyName();

        router.push("/admin/manage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
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

export default AdminLogin;
