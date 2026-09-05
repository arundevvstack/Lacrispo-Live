import { Metadata } from "next";
import ProductsClient from "../products/ProductsClient";
import SchemaOrg from "@/components/SchemaOrg";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Collection | La Crispo",
  description: "Explore our complete collection of artisan premium snacks.",
};

export default function CollectionPage() {
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Collection | La Crispo",
    "description": "Explore our complete collection of artisan premium snacks.",
    "url": "https://lacrispo.com/collection"
  };

  return (
    <>
      <SchemaOrg schema={webpageSchema} />
      <main className="bg-[#08090B] min-h-screen text-[#F2F2F0] selection:bg-[#EAD0A1] selection:text-black pt-28 sm:pt-36 pb-12 relative overflow-hidden">
        {/* Subtle Ambient Studio Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(229,168,85,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute top-[40%] right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(201,111,50,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(229,168,85,0.05),transparent_70%)] pointer-events-none" />

        <ProductsClient />
      </main>
      <Footer />
    </>
  );
}
