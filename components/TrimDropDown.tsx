import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car } from "@/lib/Car";
import Link from "next/link";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  car: Car;
};

export function TrimDropDown({ children, car }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={children} />
      <DropdownMenuContent className="w-50">
        <DropdownMenuGroup>
          <DropdownMenuLabel>รุ่นย่อย</DropdownMenuLabel>
          {Array.from(car.trims.values()).map((trim) => (
            <Link href={`compare/${car.filename}/${trim.name}`} key={trim.name}>
              <DropdownMenuItem>
                <div className="flex flex-row w-full items-end">
                  <div>{trim.name}</div>
                  <div className="flex-grow text-right text-xs text-muted-foreground">
                    {trim.priceText}
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
