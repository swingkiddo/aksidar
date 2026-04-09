"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-green-mist/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", isScrolled ? "bg-white" : "bg-white/20 backdrop-blur-sm")}>
              <img
                src="/logo.png"
                alt="Дар Косметик"
                className="w-16 h-16 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === item.href
                    ? isScrolled
                      ? "text-green-deep font-semibold"
                      : "text-white font-semibold"
                    : isScrolled
                      ? "text-ink/80 hover:text-green-mid"
                      : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+78001234567"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                isScrolled ? "text-ink/80 hover:text-green-mid" : "text-white/70 hover:text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              8 (800) 123-45-67
            </a>
            <Link href="/contacts">
              <Button className={isScrolled ? "bg-green-mid hover:bg-green-deep text-white" : "bg-white text-green-deep hover:bg-green-mist"}>
                Запросить прайс
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/contacts">
              <Button size="sm" className={isScrolled ? "bg-green-mid hover:bg-green-deep text-white" : "bg-white text-green-deep hover:bg-green-mist"}>
                Прайс
              </Button>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <Button variant="ghost" size="icon" className={isScrolled ? "text-ink" : "text-white"}>
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-cream">
                <SheetTitle className="sr-only">Навигация</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <span className="font-display text-xl font-bold text-green-deep">
                      Меню
                    </span>
                  </div>

                  <nav className="flex flex-col gap-1 py-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                          pathname === item.href
                            ? "bg-green-mist text-green-deep"
                            : "text-ink/80 hover:bg-green-mist/50"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto py-6 border-t border-border space-y-4">
                    <a
                      href="tel:+78001234567"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink/80"
                    >
                      <Phone className="w-4 h-4" />
                      8 (800) 123-45-67
                    </a>
                    <Link href="/contacts" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-green-mid hover:bg-green-deep text-white">
                        Запросить прайс-лист
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
