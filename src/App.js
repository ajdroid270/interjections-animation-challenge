// position based
import { useSpring } from "@react-spring/core";
import { useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Card from "./components/Card";
import { Line, LineContainer } from "./components/Line";
import ScrollThumb from "./components/ScrollThumb";
import {
  clearence,
  strokeWidth,
  thumbRadius,
  totalHeight,
  totalTime,
} from "./config";

const App = () => {
  const [{ thumbPosition, duration }] = useSpring(() => ({
    thumbPosition: 0,
    duration: totalTime,
    config: {
      easing: (n) => n,
    },
  }));

  const [sections, setSections] = useState([
    {
      start: duration.to((v) => 0),
      end: duration.to((v) => totalHeight),
      startTime: duration.to(() => 0),
      endTime: duration,
      stroke: "black",
    },
  ]);

  const durationInterval = useRef();

  const onStart = () => {
    thumbPosition.start({
      from: 0,
      to: totalHeight,
      config: {
        duration: duration.to(() => duration.to((v) => v).get()).get(),
      },
    });
  };

  const addClearence = (value, end) => {
    return value + (end ? -1 : 1) * clearence;
  };

  const onInterject = () => {
    let yAtInterjection = thumbPosition.get();
    let duratoinAtInterjection = duration.get();

    let timeElapsed = (yAtInterjection * duratoinAtInterjection) / totalHeight;

    let prevState = sections.slice();

    let lastSection = prevState.pop();

    const part1EndPart2Start = (end) =>
      duration.to((val) =>
        addClearence((yAtInterjection * duratoinAtInterjection) / val, end)
      );
    const part2EndPart3Start = (end) =>
      duration.to((val) =>
        thumbPosition.to((val) => addClearence(val, end)).get()
      );

    let parts = [
      {
        start: lastSection.start,
        end: part1EndPart2Start(true),
        stroke: "black",
      },
      {
        start: part1EndPart2Start(false),
        end: part2EndPart3Start(true),
        interjection: true,
        stroke: "blue",
      },
      {
        start: part2EndPart3Start(false),
        end: lastSection.end,
        stroke: "black",
      },
    ];

    const newState = [...prevState, ...parts];
    setSections(newState);

    thumbPosition.pause();
    durationInterval.current = setInterval(() => {
      timeElapsed += 16;
      duration.set(duration.get() + 16);

      const rateOfThumbAdvance =
        16 *
        ((totalHeight - thumbPosition.get()) / totalHeight) *
        (duratoinAtInterjection / duration.get());

      thumbPosition.advance(rateOfThumbAdvance);
      thumbPosition.start({
        from: thumbPosition.get(),
        to: totalHeight,
        config: {
          duration: duration.get() - timeElapsed,
        },
      });
    }, 16);
  };

  const onRelease = () => {
    thumbPosition.resume();
    console.log("Duration: " + duration.get());

    let prevState = sections.slice();
    let currentY = thumbPosition.get();
    let currentDuration = duration.get();

    prevState[prevState.length - 2].end = duration.to(
      (val) => (currentY * currentDuration) / val - clearence
    );
    prevState[prevState.length - 1].start = duration.to(
      (val) => (currentY * currentDuration) / val + clearence
    );

    setSections(prevState);
    clearInterval(durationInterval.current);
  };

  const onRestart = () => {
    setTimeout(() => {
      thumbPosition.set(0);
      duration.set(totalTime);
    }, 0);
    setSections([
      {
        start: duration.to((v) => 0),
        end: duration.to((v) => totalHeight),
        startTime: duration.to(() => 0),
        endTime: duration,
        stroke: "black",
      },
    ]);
  };

  return (
    <div className="App">
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button title="GO" variant="circle" onClick={onStart} />
          <Button
            title="interjection"
            onClick={onInterject}
            onRelease={onRelease}
          />
          <Button title="RESTART" onClick={onRestart} />
          <Button
            title="Pause"
            onClick={() => {
              thumbPosition.pause();
            }}
          />
          <Button
            title="Resume"
            onClick={() => {
              thumbPosition.resume();
            }}
          />
        </div>
        <LineContainer totalHeight={totalHeight} showCenter={false}>
          {sections.map((section, i) => (
            <Line {...section} key={i} strokeWidth={strokeWidth} />
          ))}
          <ScrollThumb cy={thumbPosition} thumbRadius={thumbRadius} />
        </LineContainer>
      </Card>
    </div>
  );
};

export default App;
