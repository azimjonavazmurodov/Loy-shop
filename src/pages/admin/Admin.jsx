import React from "react";
import { useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export function Admin() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}
