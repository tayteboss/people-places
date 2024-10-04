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
`;

const Trigger = styled.div`
  pointer-events: none;
  white-space: pre;
  text-align: center;
  padding: 0 ${pxToRem(64)};
  cursor: pointer;
  position: relative;
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
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    width: "50vw",
    height: "50vh",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 1.5,
    },
  },
};

type Props = {
  setReadyToInteract: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
};

const Title = (props: Props) => {
  const { setReadyToInteract, isActive } = props;

  return (
    <TitleWrapper $isActive={isActive}>
      <DesktopTriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setReadyToInteract(true)}
      >
        <Inner>
          <Trigger className={`type-h1 outline-text`}>People</Trigger>
        </Inner>
      </DesktopTriggerWrapper>
      <DesktopTriggerWrapper
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
      >
        <Inner>
          <Trigger className={`type-h1 outline-text`}>Places</Trigger>
        </Inner>
      </DesktopTriggerWrapper>
    </TitleWrapper>
  );
};

export default Title;
