import classnames from "classnames";

import { CheckBoxProps } from "./checkbox.types";
import styles from "./checkbox.module.scss";

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
