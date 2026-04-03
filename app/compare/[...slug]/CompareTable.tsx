"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car } from "@/lib/Car";
import { CarLibrary } from "@/lib/CarLibrary";
import { MAX_COMPARE_COUNT } from "@/lib/consts";
import { Gallery } from "@/lib/Gallery";
import { Trim } from "@/lib/Trim";
import { ModelTrimSlug } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { PickCarDialog } from "./PickCarDialog";
import { FrontCompare } from "@/components/dimension/FrontCompare";
import { SideCompare } from "@/components/dimension/SideCompare";
import { WheelBaseCompare } from "@/components/dimension/WheelBaseCompare";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

type Props = {
  gallery: Gallery;
  queryTrimSlugs: ModelTrimSlug[];
  plainCars: object[];
};

function getTitle(trims: Trim[]): string {
  let text = "";
  for (let i = 0; i < trims.length; ++i) {
    text += trims[i].fullName;
    if (i + 1 === trims.length - 1) text += " และ ";
    else if (i < trims.length - 1 && trims.length > 1) text += " , ";
  }
  return text;
}

export function CompareTable({ gallery, queryTrimSlugs, plainCars }: Props) {
  const path = usePathname();
  const router = useRouter();
  function handleCarPick(trim: ModelTrimSlug) {
    router.push(`${path}/${trim.modelSlug}/${trim.trimSlug}`);
  }

  const cars = plainCars.map((data) => Car.parse(data));
  const library = CarLibrary.fromCars(cars);
  const trims: Trim[] = [];
  for (const query of queryTrimSlugs) {
    const trim = library.findTrim(query.modelSlug, query.trimSlug);
    if (trim) trims.push(trim);
  }

  const referenceTrim = trims[0];

  return (
    <div className="h-lvh flex flex-col items-center px-6 py-8 text-center md:py-8 lg:py-20 xl:gap-4">
      <h1 className="leading-tighter text-2xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-2xl xl:tracking-tighter max-w-4xl">
        เปรียบเทียบ
      </h1>{" "}
      <p className="max-w-3xl text-base text-balance text-muted-foreground sm:text-lg ">
        {getTitle(trims)}
      </p>
      {queryTrimSlugs.length < MAX_COMPARE_COUNT && (
        <PickCarDialog
          gallery={gallery}
          onCarPick={handleCarPick}
          disabledCars={queryTrimSlugs}
        />
      )}
      <div className="pt-4"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ฟีเจอร์</TableHead>
            {trims.map((trim) => (
              <TableHead key={trim.slug}>
                {trim.car?.manufacture} {trim.car?.name} ({trim.name})
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">พลังงาน</TableCell>
            {trims.map((trim) => (
              <TableHead key={trim.slug}>
                {trim.engine && "ไฮบริด "}
                {trim.engine?.fuelType}
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">มิติด้านหน้า</TableCell>
            {trims.map((trim) => (
              <TableHead key={trim.slug}>
                <FrontCompare
                  trim={trim}
                  referenceTrim={referenceTrim}
                  showReference={trim !== referenceTrim}
                />
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">มิติด้านข้าง</TableCell>
            {trims.map((trim) => (
              <TableHead key={trim.slug}>
                <SideCompare
                  trim={trim}
                  referenceTrim={referenceTrim}
                  showReference={trim !== referenceTrim}
                />
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ระยะฐานล้อ</TableCell>
            {trims.map((trim) => (
              <TableHead key={trim.slug}>
                <WheelBaseCompare trim={trim} referenceTrim={referenceTrim} />
              </TableHead>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
