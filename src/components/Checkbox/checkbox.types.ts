import { InputHTMLAttributes } from "react";

export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onClick(): void;
};
