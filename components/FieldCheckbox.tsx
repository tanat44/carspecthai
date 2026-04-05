import { Checkbox } from "./ui/checkbox";
import { Field } from "./ui/field";
import { Label } from "./ui/label";

type Props = {
  title: string;
  onCheckedChange: (value: boolean) => void;
};

export function FieldCheckbox({ title, onCheckedChange }: Props) {
  return (
    <Field orientation="horizontal">
      <Checkbox
        id={`${title}-checkbox"`}
        name="terms-checkbox"
        onCheckedChange={(value) => onCheckedChange(value)}
      />
      <Label htmlFor={`${title}-checkbox"`}>{title}</Label>
    </Field>
  );
}
