import { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import SchemaOrg from "@/components/SchemaOrg";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Products | La Crispo",
  description: "Explore our complete collection of artisan premium snacks.",
};

export default function ProductsPage() {
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Products | La Crispo",
    "description": "Explore our complete collection of artisan premium snacks.",
    "url": "https://lacrispo.com/products"
  };

  return (
    <>
      <SchemaOrg schema={webpageSchema} />
      <main className="bg-black min-h-screen text-white selection:bg-[#EAD0A1] selection:text-black pt-32 pb-24">
        <ProductsClient />
      </main>
    </>
  );
}
