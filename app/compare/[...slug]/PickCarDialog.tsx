import { CarGallery } from "@/components/CarGallery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Gallery } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";

type Props = {
  gallery: Gallery;
  disabledCars: ModelTrimSlug[];
  onCarPick: (trim: ModelTrimSlug) => void;
};

export function PickCarDialog({ gallery, disabledCars, onCarPick }: Props) {
  return (
    <Dialog>
      <DialogTrigger render={<Button>เลือกรุ่น</Button>} />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>เลือกรุ่น</DialogTitle>
          <DialogDescription>
            เพิ่มรุ่นรถเพื่อนำมาใช้เปรียบเทียบ
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <CarGallery
            gallery={gallery}
            onClick={onCarPick}
            disabledCars={disabledCars}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">ปิด</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
