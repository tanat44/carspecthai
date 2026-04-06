import { Header } from "@/components/Header";
import { TopMenuBar } from "@/components/TopMenuBar";
import { CarLibrary } from "@/lib/CarLibrary";
import { RootGallery } from "./RootGallery";

export default async function Home() {
  const library = await CarLibrary.instance();

  return (
    <div className="w-full h-full p-4 sm:p-10 flex flex-col gap-4">
      <Header className="">
        <h1 className="tracking-tight">เปรียบเทียบสเปกรถในไทย</h1>
        <p className="text-sm text-muted-foreground sm:text-lg ">
          carspecthai.com เพจเดียวที่ให้คุณเปรียบเทียบรถยนต์จากทุกค่ายทุกรุ่น
          รถน้ำมัน รถอีวี รถไฮบริด กระบะ
        </p>
      </Header>
      <TopMenuBar />
      <RootGallery gallery={library.gallery} className="flex-1" />
    </div>
  );
}
