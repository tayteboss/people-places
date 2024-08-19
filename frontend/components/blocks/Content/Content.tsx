import styled from "styled-components";
import { PeopleType, PlacesType } from "../../../shared/types/types";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import { useState } from "react";

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const TriggerWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Trigger = styled.button<{ $readyToInteract: boolean }>`
  white-space: pre;
  text-align: center;
  pointer-events: ${(props) => (props.$readyToInteract ? "auto" : "none")};
`;

const TaglineWrapper = styled.div`
  position: absolute;
  bottom: ${pxToRem(32)};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

const Tagline = styled.p`
  text-align: center;
  width: 80vw;
  padding: 0 ${pxToRem(32)};
  margin: 0 auto;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 100%;
  }
`;

const wrapperVariants = {
  hidden: {
    width: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    width: "50vw",
    transition: {
      duration: 0.5,
      delay: 2,
      ease: "easeInOut",
    },
  },
};

type Props = {
  peopleTagline: PeopleType["peopleTagline"];
  placesTagline: PlacesType["projectTagline"];
  peopleIsActive: boolean;
  placesIsActive: boolean;
  setPeopleIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPlacesIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Content = (props: Props) => {
  const {
    peopleTagline,
    placesTagline,
    peopleIsActive,
    placesIsActive,
    setPeopleIsActive,
    setPlacesIsActive,
  } = props;

  const [readyToInteract, setReadyToInteract] = useState(false);

  return (
    <ContentWrapper>
      <TriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setReadyToInteract(true)}
      >
        <Trigger
          className="type-h1"
          onMouseOver={() => setPeopleIsActive(true)}
          onMouseOut={() => setPeopleIsActive(false)}
          $readyToInteract={readyToInteract}
        >
          People,{" "}
        </Trigger>
      </TriggerWrapper>
      <TriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
      >
        <Trigger
          className="type-h1"
          onMouseOver={() => setPlacesIsActive(true)}
          onMouseOut={() => setPlacesIsActive(false)}
          $readyToInteract={readyToInteract}
        >
          Places
        </Trigger>
      </TriggerWrapper>
      <TaglineWrapper>
        {peopleIsActive && (
          <Tagline className="type-h3">{peopleTagline || ""}</Tagline>
        )}
        {placesIsActive && (
          <Tagline className="type-h3">{placesTagline || ""}</Tagline>
        )}
      </TaglineWrapper>
    </ContentWrapper>
  );
};

export default Content;
