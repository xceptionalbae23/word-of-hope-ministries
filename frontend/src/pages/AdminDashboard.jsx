import React, { useState } from "react";
import AdminLogin from "../components/admin/Login";
import PartnerForm from "../components/admin/PartnerForm";
import PhotoGallery from "../components/admin/PhotoGallery";
import SermonManager from "../components/admin/SermonManager";

export default function AdminDashboard() {
  const [view, setView] = useState("photos");
  const [authed, setAuthed] = useState(localStorage.getItem("admin_token") ? true : false);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button className="btn" onClick={() => setView("photos")}>Photos</button>
            <button className="btn" onClick={() => setView("partners")}>Partners</button>
            <button className="btn" onClick={() => setView("sermons")}>Sermons</button>
            <button className="btn-danger" onClick={() => { localStorage.removeItem("admin_token"); window.location.reload(); }}>Logout</button>
          </div>
        </header>

        <main>
          {view === "photos" && <PhotoGallery />}
          {view === "partners" && <PartnerForm />}
          {view === "sermons" && <SermonManager />}
        </main>
      </div>
    </div>
  );
}
