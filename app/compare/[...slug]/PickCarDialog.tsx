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
  onCarPick: (trim: ModelTrimSlug) => void;
};

export function PickCarDialog({ gallery, onCarPick }: Props) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">เพิ่มรถ</Button>} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>เลือกรุ่น</DialogTitle>
          <DialogDescription>
            เพิ่มรุ่นรถเพื่อนำมาใช้เปรียบเทียบ
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <CarGallery gallery={gallery} onClick={onCarPick} />
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">ปิด</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
