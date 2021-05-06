import { animated } from "@react-spring/web";

const ScrollThumb = ({ thumbRadius, ...rest }) => {
  return (
    <animated.circle
      cx="50"
      cy="0"
      r={thumbRadius}
      fill="white"
      stroke="black"
      strokeWidth="1"
      {...rest}
    />
  );
};

export default ScrollThumb;
