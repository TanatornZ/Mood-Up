import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminLayout from "../../components/layout/AdminLayout";
import { db } from "../../firebase/firebaseConfig";

export default function Manage() {
  const router = useRouter();
  const admin = useSelector((state: any) => state.adminAuth);

  useEffect(() => {
    if (admin.adminId === "") {
      // router.push("/admin");
    }
  });

  const getCompanyName = async () => {
    const querySnapshot = await getDocs(collection(db, "company"));
    querySnapshot.forEach((doc) => {
      if (doc.id === admin.companyId) {
        console.log(doc.data().name);
      }
    });
  };

  getCompanyName();

  return <div>{admin.adminId}</div>;
}

Manage.getLayout = function getLayout(manage: ReactElement) {
  return <AdminLayout>{manage}</AdminLayout>;
};
