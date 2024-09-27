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

  transition: all var(--transition-speed-slow) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex-direction: column;
  }
`;

const DesktopTriggerWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Trigger = styled.div<{
  $isActive: boolean;
  $pointerEventsNone: boolean;
}>`
  pointer-events: ${(props) => (props.$pointerEventsNone ? "none" : "all")};
  white-space: pre;
  text-align: center;
  padding: 0 ${pxToRem(64)};
  cursor: pointer;
  position: relative;

  transition: all var(--transition-speed-slow) var(--transition-ease);

  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 128px);
    height: 4px;
    background: var(--colour-yellow);
    border: 1px solid var(--colour-black);
    opacity: 0;

    transition: all var(--transition-speed-default) var(--transition-ease);

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      height: 2.5px;
      border: 0.5px solid var(--colour-black);
    }
  }

  &:hover {
    &::after {
      opacity: 1;
    }
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
    height: "auto",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  visible: {
    width: "50vw",
    height: "50vh",
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
  isActive: boolean;
};

const Title = (props: Props) => {
  const {
    peopleIsActive,
    placesIsActive,
    setPeopleIsActive,
    setPlacesIsActive,
    setReadyToInteract,
    isActive,
  } = props;

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
            onClick={() => {
              setPeopleIsActive(!peopleIsActive);
              setPlacesIsActive(false);
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
            onClick={() => {
              setPlacesIsActive(!placesIsActive);
              setPeopleIsActive(false);
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
