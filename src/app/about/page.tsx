import { Metadata } from "next";
import AboutClient from "./AboutClient";
import SchemaOrg from "@/components/SchemaOrg";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us | Taste The Tradition | La Crispo",
  description:
    "Discover the story of La Crispo — a premium snack brand from Hebron Group bringing traditional South Indian flavours and artisan crisps to the world with uncompromising quality, health-first ingredients, and mission-driven craftsmanship.",
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About La Crispo",
    description:
      "La Crispo is a premium snack brand from Hebron Group providing healthier traditional South Indian snacks and artisan crisps.",
    url: "https://lacrispo.com/about",
    parentOrganization: {
      "@type": "Organization",
      name: "Hebron Consumables Enterprises",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pettah",
        addressLocality: "Trivandrum",
        addressRegion: "Kerala",
        postalCode: "695024",
        addressCountry: "IN",
      },
      telephone: "+91 999 55 66 396",
      email: "info@hebrongroup.com",
    },
  };

  return (
    <>
      <SchemaOrg schema={aboutSchema} />
      <main className="bg-[#070809] min-h-screen text-[#F2F2F0] selection:bg-[#E5A855] selection:text-black">
        <AboutClient />
      </main>
    </>
  );
}
