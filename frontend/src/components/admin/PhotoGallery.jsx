import React, { useState, useEffect } from "react";
import { fetchPartners, uploadPhoto, deletePhoto } from "../../lib/api";

export default function PhotoGallery() {
  const [partners, setPartners] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await fetchPartners();
    setPartners(data || []);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Choose an image");
    setUploading(true);
    const res = await uploadPhoto(file);
    setUploading(false);
    if (res?.url) {
      alert("Uploaded");
      load();
    } else {
      alert("Upload failed");
    }
  }

  async function handleDelete(path) {
    if (!confirm("Delete this image?")) return;
    await deletePhoto(path);
    load();
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Photo Gallery</h2>

      <form onSubmit={handleUpload} className="flex gap-2 items-center">
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
        <button disabled={uploading} className="bg-blue-600 text-white px-4 py-2 rounded">{uploading ? "Uploading..." : "Upload"}</button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {partners.map(p => (
          <div key={p.id} className="border p-2 rounded">
            <img src={p.photoUrl || "/default-image.png"} className="w-full h-40 object-cover rounded" alt={p.name} />
            <div className="mt-2 flex justify-between items-center">
              <div className="text-sm">{p.name}</div>
              <button className="text-red-600 text-sm" onClick={()=>handleDelete(p.photoPath)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
