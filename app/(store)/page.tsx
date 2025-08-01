import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Image from "next/image";

export default async function Home() {
  const products = await getAllProducts();
  return (
   <div>
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
    <ProducrsView  products={products}/>
    </div>
   </div>
  );
}
