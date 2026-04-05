import { ButtonLink } from "@/components/ButtonLink";
import { Metadata } from "next";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-full p-10 flex flex-col items-center">
      <Link href="/">
        <img
          src="/icon.png"
          alt="carspecthai.com"
          className="object-contain h-20"
        />
      </Link>
      <div className="flex flex-col gap-2 pt-10 max-w-xl">
        <h1 className="text-2xl">ทำไปทำไม?</h1>
        <h2>
          เราเป็นกลุ่มคนที่มีความสนใจรถยนต์เป็นงานอดิเรก
          อยากสร้างฐานข้อมูลรถยนต์ในเมืองไทยที่มีคุณภาพ
        </h2>
        <ul className="bullet">
          <li>รวบรวมข้อมูลจากทุกผู้ผลิต</li>
          <li>เปรียบเทียบ จัดลำดับ ฟีเจอร์ต่างๆ อย่าง dynamic</li>
          <li>
            เบื่อโซเชียลที่มีแต่ infographic ที่ไม่ได้เปรียบเทียบรุ่นที่เราสนใจ
          </li>
          <li>
            วีดีโอรีวิวจำนวนมากในยูทูปเป็น sponsored review
            และมีความยาวเกินสิบนาที
            คนดูต้องเสียเวลาจำนวนมากเพื่อค้นหาข้อมูลที่สนใจ
          </li>
          <li>
            Social media เน้นที่จะดึงดูดความสนใจมากกว่านำเสนอข้อมูลที่แท้จริง
          </li>
        </ul>

        <h2>Opensource</h2>
        <ul className="bullet">
          <li>
            Source code อยู่ใน
            <ButtonLink
              variant="link"
              href="https://github.com/tanat44/carspecthai"
            >
              github
            </ButtonLink>
            เป็น public
          </li>
          <li>
            <ButtonLink
              variant="link"
              href="https://github.com/tanat44/carspecthai/tree/main/data/cars"
            >
              ข้อมูลรถทั้งหมด
            </ButtonLink>
            ถูกทำการ normalize และบันทึกในรูปแบบ yaml
            เพื่อให้สามารถนำไปใช้วิเคราะห์ เปรียบเทียบ และนำเสนอได้ในหลายรูปแบบ
          </li>
        </ul>
        <h2>สนใจติดต่อ</h2>
        <p className=" text-sm text-muted-foreground">
          ร่วมเขียนโคัด ทำข้อมูลรถ สนับสนุนต่างๆ อีเมลมาที่{" "}
          <Link href="mailto:hello@carspecthai.com">hello@carspecthai.com</Link>
        </p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    template: `About | %s`,
    default: "About carspecthai.com",
  },
  description:
    "เกี่ยวกับ carspecthai.com เราทำเว็บไซค์นี้มาทำไม อยากร่วมงานกับเรา หรือ อยากสนับสนุนเรา",
};
