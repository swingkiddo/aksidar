"use client";

import { usePathname, useRouter } from "next/navigation";
import { Package, FolderOpen, Tag, Award, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/categories", label: "Категории", icon: FolderOpen },
  { href: "/admin/brands", label: "Бренды", icon: Tag },
  { href: "/admin/certificates", label: "Сертификаты", icon: Award },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-green-deep">Дар Косметик</h1>
          <p className="text-sm text-gray-500">Админ-панель</p>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-green-mid text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}