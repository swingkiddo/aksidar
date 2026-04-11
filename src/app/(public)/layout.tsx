import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}