import styled from "styled-components";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import { useState } from "react";

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
  $readyToInteract: boolean;
  $isInActive: boolean;
}>`
  white-space: pre;
  text-align: center;
  pointer-events: ${(props) => (props.$readyToInteract ? "all" : "none")};
  padding: 0 ${pxToRem(64)};
  color: ${(props) =>
    props.$isInActive ? "transparent" : "var(--colour-yellow)"};
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

  const [isHovered, setIsHovered] = useState(false);

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
            className="type-h1 outline-text"
            onMouseOver={() => {
              setPeopleIsActive(true);
              setIsHovered(true);
            }}
            onMouseOut={() => {
              setPeopleIsActive(false);
              setIsHovered(false);
            }}
            $readyToInteract={readyToInteract}
            $isInActive={!peopleIsActive && isHovered}
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
            className="type-h1 outline-text"
            onMouseOver={() => {
              setPlacesIsActive(true);
              setIsHovered(true);
            }}
            onMouseOut={() => {
              setPlacesIsActive(false);
              setIsHovered(false);
            }}
            $readyToInteract={readyToInteract}
            $isInActive={!placesIsActive && isHovered}
          >
            Places
          </Trigger>
        </Inner>
      </DesktopTriggerWrapper>
    </TitleWrapper>
  );
};

export default Title;
