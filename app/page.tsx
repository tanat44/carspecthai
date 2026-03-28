import { CarGallery } from "@/components/CarGallery";

export default function Home() {
  return (
    <div className="h-lvh flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
      <h1 className="leading-tighter text-3xl font-semibold tracking-tight text-balance text-primary lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
        car-spec-thai
      </h1>
      <p className="max-w-4xl text-base text-balance text-foreground sm:text-lg pb-5">
        เปรียบเทียบข้อมูลรถแบบเข้าใจง่ายๆ มีทุกรุ่น ทุกยี่ห้อ ไม่ว่าจะน้ำมัน
        อีวี กระบะ ไฮบริด
      </p>
      <CarGallery />
    </div>
  );
}
