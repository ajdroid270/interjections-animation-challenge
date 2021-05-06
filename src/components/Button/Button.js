import { animated } from "@react-spring/web";
import styles from "./Button.module.css";
const Button = ({
  variant = "default",
  title,
  onClick = () => {},
  onRelease = () => {},
  ...rest
}) => {
  return (
    <animated.button
      className={styles[variant]}
      onMouseDownCapture={onClick}
      onMouseUpCapture={onRelease}
      {...rest}
    >
      {title}
    </animated.button>
  );
};
export default Button;
