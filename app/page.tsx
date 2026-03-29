import { RootGallery } from "@/app/RootGallery";
import { CarLibrary } from "@/lib/CarLibrary";
import Image from "next/image";

export default async function Home() {
  const library = await CarLibrary.instance();

  return (
    <div className="h-lvh flex flex-col items-center gap-4 px-6 py-8 text-center md:py-8 lg:py-20 xl:gap-4">
      <Image src="/icon.png" width={100} height={100} alt="carspecthai icon" />
      <h1 className="leading-tighter text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
        เปรียบเทียบสเปกรถที่ขายในไทย
      </h1>
      <p className="max-w-3xl text-base text-balance text-muted-foreground sm:text-lg pb-6">
        carspecthai เพจเดียวที่ให้คุณเปรียบเทียบรถยนต์จากทุกค่าย ทุกยี่ห้อ
        ที่วางขายในเมืองไทย อย่างเจาะลึก ไม่ว่าจะน้ำมัน อีวี กระบะ ไฮบริด
      </p>
      <RootGallery gallery={library.gallery} />
    </div>
  );
}
