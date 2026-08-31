import fs from "fs";
import path from "path";
import { Metadata } from "next";
import PageClient from "./PageClient";
import SchemaOrg from "@/components/SchemaOrg";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  // Read frames dynamically on the server
  let frameUrls: string[] = [];
  
  try {
    const publicHomeDir = path.join(process.cwd(), "public", "home");
    
    // Check if directory exists
    if (fs.existsSync(publicHomeDir)) {
      const files = fs.readdirSync(publicHomeDir);
      
      // Filter for image files (assuming webp, jpg, png)
      const imageFiles = files.filter(file => 
        /\.(webp|jpg|jpeg|png)$/i.test(file)
      );

      // Sort naturally so 0001 comes before 0002, 10 comes after 9, etc.
      imageFiles.sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      });

      frameUrls = imageFiles.map(file => `/home/${file}`);
    } else {
      console.warn("Directory public/home does not exist. Please add image frames for the sequence.");
    }
  } catch (error) {
    console.error("Failed to read image frames directory:", error);
  }

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "La Crispo Home",
    "description": "Experience the crunch of La Crispo premium snacks.",
    "url": "https://lacrispo.com"
  };

  const productGroupSchema = {
    "@context": "https://schema.org/",
    "@type": "ProductGroup",
    "name": "La Crispo Premium Snacks",
    "description": "A collection of artisan potato crisps.",
    "brand": {
      "@type": "Brand",
      "name": "La Crispo"
    },
    "hasVariant": [
      {
        "@type": "Product",
        "name": "Classic Tomato",
        "description": "An explosive burst of zesty tomato and authentic spices."
      },
      {
        "@type": "Product",
        "name": "Spicy Masala",
        "description": "A bold fusion of Indian spices for those who crave heat."
      },
      {
        "@type": "Product",
        "name": "Cream & Onion",
        "description": "Smooth, velvety cream balanced with sharp spring onion."
      },
      {
        "@type": "Product",
        "name": "Truffle Cheese",
        "description": "Premium aged cheese elevated with rich black truffle."
      }
    ]
  };

  return (
    <>
      <SchemaOrg schema={webpageSchema} />
      <SchemaOrg schema={productGroupSchema} />
      <main className="bg-[#0B0C0E] min-h-screen text-[#F2F2F0] selection:bg-[#C7CBD1] selection:text-[#0B0C0E]">
        <PageClient frameUrls={frameUrls} />
      </main>
    </>
  );
}
