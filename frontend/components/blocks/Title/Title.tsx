import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const TitleWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  pointer-events: none;
`;

const TriggerWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
`;

const Trigger = styled.button<{ $readyToInteract: boolean }>`
  white-space: pre;
  text-align: center;
  pointer-events: ${(props) => (props.$readyToInteract ? "all" : "none")};
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "linear",
    },
  },
  visible: {
    opacity: [0, 0, 1, 1],
    transition: {
      times: [0, 0.5, 0.5, 1],
      duration: 1,
      ease: "linear",
      repeat: 2,
    },
  },
};

type Props = {
  peopleIsActive: boolean;
  placesIsActive: boolean;
  setPeopleIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPlacesIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Title = (props: Props) => {
  const {
    peopleIsActive,
    placesIsActive,
    setPeopleIsActive,
    setPlacesIsActive,
  } = props;

  const [readyToInteract, setReadyToInteract] = useState(false);

  return (
    <TitleWrapper>
      <TriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setReadyToInteract(true)}
      >
        {!placesIsActive && (
          <Trigger
            className="type-h1 outline-text"
            onMouseOver={() => setPeopleIsActive(true)}
            onMouseOut={() => setPeopleIsActive(false)}
            $readyToInteract={readyToInteract}
          >
            People,{" "}
          </Trigger>
        )}
      </TriggerWrapper>
      <TriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
      >
        {!peopleIsActive && (
          <Trigger
            className="type-h1 outline-text"
            onMouseOver={() => setPlacesIsActive(true)}
            onMouseOut={() => setPlacesIsActive(false)}
            $readyToInteract={readyToInteract}
          >
            Places
          </Trigger>
        )}
      </TriggerWrapper>
    </TitleWrapper>
  );
};

export default Title;
