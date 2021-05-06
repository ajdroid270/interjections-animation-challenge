import { animated } from "@react-spring/web";

const Line = ({ start, end, stroke = "black", ...rest }) => {
  return (
    <animated.line
      x1="50"
      y1={start}
      x2="50"
      y2={end}
      strokeLinecap="round"
      stroke={stroke}
      {...rest}
    />
  );
};

export default Line;
