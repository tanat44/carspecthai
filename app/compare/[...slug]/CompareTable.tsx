"use client";

import { Delta, DeltaUnit } from "@/components/Delta";
import { FrontCompare } from "@/components/dimension/FrontCompare";
import { SideCompare } from "@/components/dimension/SideCompare";
import { WheelBaseCompare } from "@/components/dimension/WheelBaseCompare";
import { Header } from "@/components/Header";
import { RangeCompare } from "@/components/performance/RangeCompare";
import { ZeroToHundredCompare } from "@/components/performance/ZeroToHundredCompare";
import { ReferenceBadge } from "@/components/ReferenceBadge";
import { TrimPopover } from "@/components/TrimPopover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { generateCompareUrl } from "@/lib/utils";
import { Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PickCarDialog } from "./PickCarDialog";

type Props = {
  gallery: Gallery;
  queryModels: string[];
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

export function CompareTable({ gallery, queryModels, plainCars }: Props) {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryTrimSlugs: ModelTrimSlug[] = [];
  for (let i = 0; i < queryModels.length; ++i) {
    let text: string | null | undefined = searchParams.get(i.toFixed(0));
    if (text === null) text = undefined;
    queryTrimSlugs.push({
      modelSlug: queryModels[i],
      trimSlug: text,
    });
  }

  const cars = plainCars.map((data) => Car.parse(data));
  const library = CarLibrary.fromCars(cars);
  const trims: Trim[] = [];
  for (const query of queryTrimSlugs) {
    const trim = library.findTrim(query.modelSlug, query.trimSlug);
    if (trim) trims.push(trim);
  }

  const referenceTrim = trims[0];

  function handleCarPick(newTrim: ModelTrimSlug) {
    const path = generateCompareUrl([...queryTrimSlugs, newTrim]);
    router.push(path);
  }

  function deleteTrim(deleteTrim: Trim) {
    const newTrims = [...trims];
    const index = newTrims.indexOf(deleteTrim);
    newTrims.splice(index, 1);

    const query = newTrims.map((trim) => trim.modelTrimSlug);
    const path = generateCompareUrl(query);
    router.push(path);
  }

  return (
    <div className="w-full h-full p-10 flex flex-col">
      <Header className="flex flex-row gap-2 items-center">
        <h1 className="leading-tighter text-2xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-2xl xl:tracking-tighter max-w-4xl m-auto">
          เปรียบเทียบสเปก {getTitle(trims)}
        </h1>
        {queryTrimSlugs.length < MAX_COMPARE_COUNT && (
          <PickCarDialog
            gallery={gallery}
            onCarPick={handleCarPick}
            disabledCars={queryTrimSlugs}
          />
        )}
      </Header>
      <Separator className="mt-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ฟีเจอร์</TableHead>
            {trims.map((trim) => (
              <TableHead key={trim.slug}>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <TrimPopover
                    title={
                      <Button variant="ghost">
                        {trim.car?.manufacture} {trim.car?.name} ({trim.name})
                      </Button>
                    }
                    trim={trim}
                    isReference={trim === referenceTrim}
                  />
                  {trims.length > 0 && trim === referenceTrim && (
                    <ReferenceBadge />
                  )}
                  {trims.length > 1 && (
                    <Button
                      variant="destructive"
                      onClick={() => deleteTrim(trim)}
                    >
                      <Trash size={16} />
                    </Button>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left">ราคา</TableCell>
            {trims.map((trim) => {
              return (
                <TableCell key={trim.slug} className="text-center">
                  <div className="flex flex-row gap-2 justify-center">
                    {trim.priceText}
                    {trim !== referenceTrim && (
                      <Delta
                        value={trim.price ?? 0}
                        referenceValue={referenceTrim.price ?? 0}
                        unit={DeltaUnit.Baht}
                        reverse={true}
                      />
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">พลังงาน</TableCell>
            {trims.map((trim) => (
              <TableCell key={trim.slug} className="text-center">
                {trim.engineText}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              ระยะทาง WLTP
            </TableCell>
            {trims.map((trim) => (
              <TableCell key={trim.slug}>
                <RangeCompare trim={trim} referenceTrim={referenceTrim} />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              อัตราเร่ง 0-100
            </TableCell>
            {trims.map((trim) => (
              <TableCell key={trim.slug}>
                <ZeroToHundredCompare
                  trim={trim}
                  referenceTrim={referenceTrim}
                />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              ขนาดด้านหน้า
            </TableCell>
            {trims.map((trim) => (
              <TableCell key={trim.slug}>
                <FrontCompare
                  trim={trim}
                  referenceTrim={referenceTrim}
                  showReference={trim !== referenceTrim}
                />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              ขนาดด้านข้าง
            </TableCell>
            {trims.map((trim) => (
              <TableCell key={trim.slug}>
                <SideCompare
                  trim={trim}
                  referenceTrim={referenceTrim}
                  showReference={trim !== referenceTrim}
                />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">ระยะฐานล้อ</TableCell>
            {trims.map((trim) => (
              <TableCell key={trim.slug}>
                <WheelBaseCompare trim={trim} referenceTrim={referenceTrim} />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
