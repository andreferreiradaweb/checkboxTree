import { useEffect, useRef } from "react";
import { CheckBoxProps } from "./checkbox.types";
import styles from "./checkbox.module.scss";
import classnames from "classnames";

export const Checkbox = ({
  label,
  isChecked,
  onClick,
  isIndeterminate,
}: CheckBoxProps) => {

  return (
    <>
      <span
        className={classnames(styles.checkbox, {
          [styles.isChecked]: isChecked,
          [styles.isIndeterminate]: isIndeterminate,
        })}
        onClick={onClick}
      />
      {label}
    </>
  );
};
