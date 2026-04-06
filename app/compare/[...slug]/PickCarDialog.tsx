import { CarGallery } from "@/components/gallery/CarGallery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
      <DialogTrigger
        render={<Button variant="outline">เพิ่มรุ่นเปรียบเทียบ</Button>}
      />
      <DialogContent className="sm:max-w-2xl h-9/10">
        <DialogHeader>
          <DialogTitle>เพิ่มรุ่นรถเพื่อนำมาใช้เปรียบเทียบ</DialogTitle>
        </DialogHeader>
        <FieldGroup className="overflow-auto">
          <CarGallery
            gallery={gallery}
            onClick={onCarPick}
            disabledCars={disabledCars}
            className="overflow-auto"
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">ปิด</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
