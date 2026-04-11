"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Certificate { id: string; name: string; image: string; }

export default function AdminCertificatesPage() {
  const router = useRouter();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({ name: "", image: "" });

  useEffect(() => {
    fetch("/api/admin/check").then(r => r.status === 401 && router.push("/admin/login"));
    loadData();
  }, []);

  const loadData = async () => {
    setCerts(await (await fetch("/api/admin/certificates")).json());
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/certificates", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { id: editing.id, ...formData } : formData) });
    setDialogOpen(false);
    loadData();
    resetForm();
  };

  const handleEdit = (cert: Certificate) => { setEditing(cert); setFormData(cert); setDialogOpen(true); };
  const handleDelete = async (id: string) => { if (!confirm("Удалить?")) return; await fetch(`/api/admin/certificates?id=${id}`, { method: "DELETE" }); loadData(); };
  const resetForm = () => { setEditing(null); setFormData({ name: "", image: "" }); };

  if (loading && !certs.length) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold">Сертификаты</h1><Button onClick={() => { resetForm(); setDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" />Добавить</Button></div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Название</TableHead><TableHead>Изображение</TableHead><TableHead className="w-[100px]"></TableHead></TableRow></TableHeader>
          <TableBody>{certs.map(c => (
            <TableRow key={c.id}><TableCell className="font-medium">{c.name}</TableCell><TableCell className="text-sm text-gray-500">{c.image}</TableCell><TableCell><div className="flex gap-2"><Button variant="ghost" size="icon" onClick={() => handleEdit(c)}><Pencil className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button></div></TableCell></TableRow>
          ))}</TableBody>
        </Table>
      </CardContent></Card>

      {dialogOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">{editing ? "Редактировать" : "Новый"} сертификат</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-sm">Название</label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
            <div><label className="text-sm">Путь к изображению</label><Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="/images/..." required /></div>
            <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button><Button type="submit">Сохранить</Button></div>
          </form>
        </div>
      </div>}
    </div>
  );
}