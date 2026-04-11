"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
}

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "", sortOrder: 0 });

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/admin/check");
    if (res.status === 401) router.push("/admin/login");
  };

  const loadData = async () => {
    const res = await fetch("/api/admin/categories");
    setCategories(await res.json());
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = editing ? "PUT" : "POST";
    await fetch("/api/admin/categories", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { id: editing.id, ...formData } : formData) });
    setDialogOpen(false);
    loadData();
    resetForm();
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description || "", sortOrder: cat.sortOrder });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить?")) return;
    await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
    loadData();
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^а-яa-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

  const resetForm = () => { setEditing(null); setFormData({ name: "", slug: "", description: "", sortOrder: 0 }); };

  if (loading && !categories.length) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Категории</h1>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" />Добавить</Button>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Название</TableHead><TableHead>Slug</TableHead><TableHead>Описание</TableHead><TableHead className="w-[100px]"></TableHead></TableRow></TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>{cat.slug}</TableCell>
                <TableCell className="max-w-xs truncate">{cat.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>

      {dialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editing ? "Редактировать" : "Новая"} категория</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-sm">Название</label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value, slug: generateSlug(e.target.value)})} required /></div>
              <div><label className="text-sm">Slug</label><Input value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required /></div>
              <div><label className="text-sm">Описание</label><textarea className="w-full p-2 border rounded" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} /></div>
              <div><label className="text-sm">Сортировка</label><Input type="number" value={formData.sortOrder} onChange={(e) => setFormData({...formData, sortOrder: +e.target.value})} /></div>
              <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button><Button type="submit">Сохранить</Button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}