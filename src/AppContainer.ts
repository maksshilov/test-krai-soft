import styled from "styled-components";

interface IAppContainerProps {
  isReachBound: number;
}

export const AppContainer = styled.div<IAppContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  & .bounds {
    width: 80vw;
    height: 80vh;
    background-color: darkcyan;
    position: relative;

    & .drag-item {
      width: 10vw;
      height: 10vw;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      & .ball {
        position: absolute;
        width: 10vw;
        height: 10vw;
        border-radius: 100%;

        &.green {
          z-index: 1;
          background-color: greenyellow;
        }
        &.tomato {
          z-index: 2;
          background-color: tomato;
          opacity: ${({ isReachBound }) => (1 * isReachBound) / 100};
        }
        &.drag-stop {
          animation-name: drag-stop;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-delay: 0s;
          animation-direction: alternate;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          animation-play-state: running;

          @keyframes drag-stop {
            0% {
              transform: scale(0);
            }
            30% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
        }
        &.drag-start {
          animation-name: drag-start;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-delay: 0s;
          animation-direction: alternate;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          animation-play-state: running;

          @keyframes drag-start {
            0% {
              transform: scale(1);
            }
            30% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(0);
            }
          }
        }
        &.lottie-container {
          position: absolute;
        }
      }
    }
  }

  & .warning-orient {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    font-size: 10vw;
    text-align: center;
    color: black;

    animation-name: rotate;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-delay: 0.3s;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(90deg);
      }
    }
  }

  @media (max-height: 500px) {
    & .bounds {
      & .drag-item {
        width: 20vw;
        height: 20vw;
        & .ball {
          width: 20vw;
          height: 20vw;
        }
      }
    }
  }
`;
