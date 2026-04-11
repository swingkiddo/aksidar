"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Brand { id: string; name: string; slug: string; }

export default function AdminBrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });

  useEffect(() => {
    fetch("/api/admin/check").then(r => r.status === 401 && router.push("/admin/login"));
    loadData();
  }, []);

  const loadData = async () => {
    setBrands(await (await fetch("/api/admin/brands")).json());
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/brands", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { id: editing.id, ...formData } : formData) });
    setDialogOpen(false);
    loadData();
    resetForm();
  };

  const handleEdit = (brand: Brand) => { setEditing(brand); setFormData(brand); setDialogOpen(true); };
  const handleDelete = async (id: string) => { if (!confirm("Удалить?")) return; await fetch(`/api/admin/brands?id=${id}`, { method: "DELETE" }); loadData(); };
  const generateSlug = (n: string) => n.toLowerCase().replace(/[^а-яa-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const resetForm = () => { setEditing(null); setFormData({ name: "", slug: "" }); };

  if (loading && !brands.length) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold">Бренды</h1><Button onClick={() => { resetForm(); setDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" />Добавить</Button></div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Название</TableHead><TableHead>Slug</TableHead><TableHead className="w-[100px]"></TableHead></TableRow></TableHeader>
          <TableBody>{brands.map(b => (
            <TableRow key={b.id}><TableCell className="font-medium">{b.name}</TableCell><TableCell>{b.slug}</TableCell><TableCell><div className="flex gap-2"><Button variant="ghost" size="icon" onClick={() => handleEdit(b)}><Pencil className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button></div></TableCell></TableRow>
          ))}</TableBody>
        </Table>
      </CardContent></Card>

      {dialogOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">{editing ? "Редактировать" : "Новый"} бренд</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-sm">Название</label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: generateSlug(e.target.value)})} required /></div>
            <div><label className="text-sm">Slug</label><Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required /></div>
            <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button><Button type="submit">Сохранить</Button></div>
          </form>
        </div>
      </div>}
    </div>
  );
}