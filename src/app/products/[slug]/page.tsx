import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import SchemaOrg from "@/components/SchemaOrg";

export const dynamic = "force-static";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found | La Crispo",
    };
  }

  return {
    title: `${product.name} | La Crispo Premium Snacks`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://lacrispo.com${product.image}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "La Crispo",
    },
    offers: {
      "@type": "Offer",
      url: `https://lacrispo.com/products/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.replace("$", ""),
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews.toString(),
    },
  };

  return (
    <>
      <SchemaOrg schema={productSchema} />
      <main className="bg-black min-h-screen text-white selection:bg-[#EAD0A1] selection:text-black pt-32 pb-24">
        <ProductDetailClient product={product} />
      </main>
    </>
  );
}
