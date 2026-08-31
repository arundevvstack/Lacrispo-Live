import { Metadata } from "next";
import ContactClient from "./ContactClient";
import SchemaOrg from "@/components/SchemaOrg";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Get In Touch | La Crispo",
  description: "Contact La Crispo for wholesale, retail distribution, partnerships, or general culinary inquiries.",
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact La Crispo",
    description: "Get in touch with La Crispo for inquiries, wholesale partnerships, and collaborations.",
    url: "https://lacrispo.com/contact",
  };

  return (
    <>
      <SchemaOrg schema={contactSchema} />
      <main className="bg-[#070809] min-h-screen text-[#F2F2F0] selection:bg-[#E5A855] selection:text-black">
        <ContactClient />
      </main>
    </>
  );
}
