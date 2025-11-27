import React, { useEffect, useState } from "react";
import { fetchPartners, registerPartner } from "../../lib/api";

export default function PartnerForm() {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await fetchPartners();
    setPartners(data || []);
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!name) return alert("Provide name");
    setLoading(true);
    await registerPartner({ name, photoUrl });
    setLoading(false);
    setName(""); setPhotoUrl("");
    load();
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Register Partner</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input placeholder="Partner name" value={name} onChange={e=>setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <input placeholder="Photo URL (optional)" value={photoUrl} onChange={e=>setPhotoUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : "Save partner"}</button>
      </form>

      <h3 className="mt-6 font-medium">Existing partners</h3>
      <ul className="mt-3 space-y-2">
        {partners.map((p) => (
          <li key={p.id} className="flex items-center gap-4 border p-2 rounded">
            <img src={p.photoUrl || "/default-image.png"} alt="" className="w-16 h-16 object-cover rounded" />
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-500">ID: {p.id}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
