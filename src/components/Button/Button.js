import { motion } from "framer-motion";
import styles from "./Button.module.css";
const Button = ({
  variant = "default",
  title,
  onClick = () => {},
  onRelease = () => {},
  ...rest
}) => {
  return (
    <motion.button
      className={styles[variant]}
      onMouseDownCapture={onClick}
      onMouseUpCapture={onRelease}
      {...rest}
    >
      {title}
    </motion.button>
  );
};
export default Button;
