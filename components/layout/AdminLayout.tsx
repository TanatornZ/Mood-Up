import AdminNavber from "../admin/AdminNavber";
import React, { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <AdminNavber />
      <main>{children}</main>
      <AdminNavber />
    </>
  );
}
