import { FieldInputProps, FieldMetaState } from "react-final-form";

export type fieldType = {
  label?: string;
  placeholder: string;
  img?: string[];
  name: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  disable?: boolean;
};
