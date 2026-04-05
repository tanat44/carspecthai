import { AboutButton } from "@/components/AboutButton";
import { Header } from "@/components/Header";
import { CarLibrary } from "@/lib/CarLibrary";
import { RankingLinks } from "./RankingLinks";
import { RootGallery } from "./RootGallery";
import { VisualLinks } from "./VisualLinks";

export default async function Home() {
  const library = await CarLibrary.instance();

  return (
    <div className="w-full h-full p-10 flex flex-col">
      <AboutButton />
      <Header className="flex flex-col gap-2 justify-center">
        <h1 className="leading-tighter text-2xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:tracking-tighter">
          เปรียบเทียบสเปกรถที่ขายในไทย
        </h1>
        <p className="text-sm text-muted-foreground sm:text-lg ">
          carspecthai.com เพจเดียวที่ให้คุณเปรียบเทียบรถยนต์จากทุกค่าย ทุกยี่ห้อ
          ที่วางขายในเมืองไทย อย่างเจาะลึก ไม่ว่าจะน้ำมัน อีวี กระบะ ไฮบริด
        </p>
      </Header>
      <RootGallery gallery={library.gallery} className="flex-1" />
      <VisualLinks />
      <RankingLinks />
    </div>
  );
}
