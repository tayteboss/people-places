import styled from "styled-components";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";

const TitleWrapper = styled.div<{ $isActive: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  pointer-events: none;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  transition: all var(--transition-speed-slow) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex-direction: column;
  }
`;

const DesktopTriggerWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const Trigger = styled.button<{
  $isActive: boolean;
  $pointerEventsNone: boolean;
}>`
  pointer-events: ${(props) => (props.$pointerEventsNone ? "none" : "all")};
  white-space: pre;
  text-align: center;
  padding: 0 ${pxToRem(64)};
  color: ${(props) => props.$isActive && "transparent"} !important;
  -webkit-text-stroke-color: ${(props) =>
    props.$isActive && "var(--colour-yellow)"} !important;

  transition: all var(--transition-speed-slow) var(--transition-ease);

  &:hover {
    color: var(--colour-yellow) !important;
    -webkit-text-stroke-color: var(--colour-black) !important;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(16)};
`;

const wrapperVariants = {
  hidden: {
    width: "auto",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  visible: {
    width: "50vw",
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: 1.5,
    },
  },
};

type Props = {
  peopleIsActive: boolean;
  placesIsActive: boolean;
  setPeopleIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPlacesIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setReadyToInteract: React.Dispatch<React.SetStateAction<boolean>>;
  readyToInteract: boolean;
  isActive: boolean;
};

const Title = (props: Props) => {
  const {
    peopleIsActive,
    placesIsActive,
    setPeopleIsActive,
    setPlacesIsActive,
    setReadyToInteract,
    readyToInteract,
    isActive,
  } = props;

  console.log("peopleIsActive", peopleIsActive);
  console.log("placesIsActive", placesIsActive);

  return (
    <TitleWrapper $isActive={isActive}>
      <DesktopTriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setReadyToInteract(true)}
      >
        <Inner>
          <Trigger
            className={`${peopleIsActive || placesIsActive} type-h1 outline-text`}
            onMouseEnter={() => {
              setPeopleIsActive(true);
            }}
            onMouseOut={() => {
              setPeopleIsActive(false);
            }}
            $isActive={peopleIsActive || placesIsActive}
            $pointerEventsNone={!isActive}
          >
            People
          </Trigger>
        </Inner>
      </DesktopTriggerWrapper>
      <DesktopTriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
      >
        <Inner>
          <Trigger
            className={`${peopleIsActive || placesIsActive} type-h1 outline-text`}
            onMouseEnter={() => {
              setPlacesIsActive(true);
            }}
            onMouseOut={() => {
              setPlacesIsActive(false);
            }}
            $isActive={peopleIsActive || placesIsActive}
            $pointerEventsNone={!isActive}
          >
            Places
          </Trigger>
        </Inner>
      </DesktopTriggerWrapper>
    </TitleWrapper>
  );
};

export default Title;
