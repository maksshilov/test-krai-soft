/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { LegacyRef, MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import Draggable, { ControlPosition, DraggableData, DraggableEvent } from "react-draggable";
import { AppContainer } from "./AppContainer";
import { linearInterpolate } from "./utils";
import Lottie, { LottieRef } from "lottie-react";
import useWindowDimensions from "./hooks/useWindowsDimensions";

function App() {
  const boundsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [isReachBound, setIsReachBound] = useState<number>(0);
  const [defaultPosition, setDefaultPosition] = useState<ControlPosition>({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState<boolean>(false);
  const [styleDrag, setStyleDrag] = useState<string>("drag-stop");
  const [orient, setOrient] = useState<boolean>(window.matchMedia("(orientation: landscape)").matches);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const isDeviceLandscape = width > height;
    setOrient(() => isDeviceLandscape);
  }, [width]);

  const isMobile = height > 500 ? 0.1 : 0.2;
  const dragItemSize = window.innerWidth * isMobile;

  const eventHandler = (e: DraggableEvent, data: DraggableData) => {
    const BALL_ANCHOR_COORD_X_MIN = 0;
    const BALL_ANCHOR_COORD_Y_MIN = 0;

    const ballAnchorCoordXMax = Math.round(boundsRef.current.offsetWidth - dragItemSize);
    const ballAnchorCoordYMax = Math.round(boundsRef.current.offsetHeight - dragItemSize);

    const coordX = Math.round(linearInterpolate(BALL_ANCHOR_COORD_X_MIN, ballAnchorCoordXMax, 0, 100, data.x));
    const coordY = Math.round(linearInterpolate(BALL_ANCHOR_COORD_Y_MIN, ballAnchorCoordYMax, 0, 100, data.y));

    const inputXMin = coordX < 50 ? 25 : 75;
    const inputXMax = coordX < 50 ? 0 : 100;
    const inputYMin = coordY < 50 ? 25 : 75;
    const inputYMax = coordY < 50 ? 0 : 100;

    const distanceX = linearInterpolate(inputXMin, inputXMax, 0, 100, coordX);
    const distanceY = linearInterpolate(inputYMin, inputYMax, 0, 100, coordY);

    const _isReachBound = distanceX > distanceY ? distanceX : distanceY;

    setIsReachBound(() => _isReachBound);
  };

  useLayoutEffect(() => {
    if (orient) {
      const x = Math.round(boundsRef.current.offsetWidth / 2 - dragItemSize / 2);
      const y = Math.round(boundsRef.current.offsetHeight / 2 - dragItemSize / 2);

      setDefaultPosition(() => ({ x, y }));
    }
  }, [isReady]);

  useEffect(() => setIsReady(() => true), []);

  const lottieRef = useRef() as LottieRef;
  const LOTTIE_WIDTH = 15 * isMobile * 10;
  const LOTTIE_HEIGHT = 15 * isMobile * 10;

  const handleOnStart = () => {
    setStyleDrag(() => "drag-start");
    setTimeout(() => lottieRef.current!.playSegments([150, 416]), 300);
  };

  const handleOnStop = () => {
    setStyleDrag(() => "drag-stop");
    setTimeout(() => {
      lottieRef.current!.playSegments([0, 416]);
      lottieRef.current!.goToAndStop(0, true);
    }, 150);
  };

  return (
    <AppContainer isReachBound={isReachBound}>
      {orient ? (
        <div className="bounds" ref={boundsRef}>
          {isReady ? (
            <Draggable bounds="parent" onStart={handleOnStart} onDrag={eventHandler} onStop={handleOnStop} defaultPosition={defaultPosition}>
              <div className="drag-item">
                <div className={`ball green ${styleDrag}`} />
                <div className={`ball tomato ${styleDrag}`} />
                <div className="lottie-container">
                  <Lottie
                    // @ts-ignore
                    path="/lottie/lottie-kraisoft.json"
                    lottieRef={lottieRef}
                    style={{
                      width: `${LOTTIE_WIDTH}vw`,
                      height: `${LOTTIE_HEIGHT}vw`,
                    }}
                    autoPlay={false}
                  />
                </div>
              </div>
            </Draggable>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="warning-orient">Please, rotate your device</div>
      )}
    </AppContainer>
  );
}

export default App;
