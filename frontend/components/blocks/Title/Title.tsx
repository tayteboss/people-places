import styled from "styled-components";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";

const TitleWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  pointer-events: none;

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

const Trigger = styled.button<{ $readyToInteract: boolean }>`
  white-space: pre;
  text-align: center;
  pointer-events: ${(props) => (props.$readyToInteract ? "all" : "none")};
`;

const Comma = styled.span`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(16)};
`;

const MuteHint = styled.p`
  text-align: center;
  color: var(--colour-yellow);
`;

const wrapperVariants = {
  hidden: {
    width: "auto",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    width: "50vw",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 1,
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
};

const Title = (props: Props) => {
  const {
    peopleIsActive,
    placesIsActive,
    setPeopleIsActive,
    setPlacesIsActive,
    setReadyToInteract,
    readyToInteract,
  } = props;

  return (
    <TitleWrapper>
      <DesktopTriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setReadyToInteract(true)}
        onClick={() => {
          setPeopleIsActive(true);
          setPlacesIsActive(false);
        }}
      >
        {!placesIsActive && (
          <Inner>
            <Trigger
              className="type-h1 outline-text"
              onMouseOver={() => setPeopleIsActive(true)}
              onMouseOut={() => setPeopleIsActive(false)}
              $readyToInteract={readyToInteract}
            >
              People<Comma>,</Comma>{" "}
            </Trigger>
          </Inner>
        )}
      </DesktopTriggerWrapper>
      <DesktopTriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
      >
        {!peopleIsActive && (
          <Inner>
            <Trigger
              className="type-h1 outline-text"
              onMouseOver={() => setPlacesIsActive(true)}
              onMouseOut={() => setPlacesIsActive(false)}
              $readyToInteract={readyToInteract}
            >
              Places
            </Trigger>
          </Inner>
        )}
      </DesktopTriggerWrapper>
    </TitleWrapper>
  );
};

export default Title;
