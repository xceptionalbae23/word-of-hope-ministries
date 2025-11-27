import React, { useState } from "react";
import { registerSermon } from "../../lib/api";

export default function SermonManager() {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    setLoading(true);
    await registerSermon({ title, speaker, date });
    setLoading(false);
    setTitle(""); setSpeaker(""); setDate("");
    alert("Added (for demo, data stored where your backend implements it)");
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Sermon Manager</h2>
      <form onSubmit={handleAdd} className="space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border px-3 py-2 rounded" />
        <input value={speaker} onChange={e=>setSpeaker(e.target.value)} placeholder="Speaker" className="w-full border px-3 py-2 rounded" />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : "Add Sermon"}</button>
      </form>
    </div>
  );
}
