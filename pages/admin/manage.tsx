import React, { ReactElement } from "react";
import AdminLayout from "../../components/layout/AdminLayout";

export default function Manage() {
  return <div>Manage</div>;
}

Manage.getLayout = function getLayout(manage: ReactElement) {
  return <AdminLayout>{manage}</AdminLayout>;
};


