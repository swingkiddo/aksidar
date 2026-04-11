import { prisma } from "@/lib/prisma";
import CertificatesClient from "./page.client";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany();

  return <CertificatesClient certificates={certificates} />;
}