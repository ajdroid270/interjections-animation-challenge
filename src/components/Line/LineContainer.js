import { animated } from "@react-spring/web";

const LineContainer = ({
  totalHeight,
  children,
  showCenter = true,
  ...rest
}) => {
  return (
    <div className="line-container">
      <svg width="100" height={totalHeight} style={{ overflow: "visible" }}>
        {children}
        {showCenter && (
          <animated.circle
            cx="50"
            cy="50%"
            r="3"
            fill="white"
            stroke="black"
            strokeWidth="1"
            {...rest}
          />
        )}
      </svg>
    </div>
  );
};
export default LineContainer;
