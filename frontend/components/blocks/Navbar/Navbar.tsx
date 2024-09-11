import React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: ${pxToRem(16)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuItems = styled.ul`
  display: flex;
  gap: ${pxToRem(16)};
`;

const MenuItem = styled.li`
  list-style: none;
`;

const MenuButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  color: var(--colour-yellow);
  font-family: var(--font-default);
  transition: all var(--transition-speed-slow) var(--transition-ease);

  &:hover {
    opacity: 1;
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--colour-yellow);
`;

const SoundTriggerWrapper = styled.div`
  display: flex;
`;

const Span = styled.span`
  font-family: var(--font-default);
  color: var(--colour-yellow);
  white-space: pre;
`;

const SoundTrigger = styled.button<{ $isActive: boolean }>`
  position: relative;
  font-family: var(--font-default);
  color: var(--colour-yellow);
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};

  transition: all var(--transition-speed-slow) var(--transition-ease);
`;

type Props = {
  setSoundIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  soundIsActive: boolean;
  setTabActive: React.Dispatch<React.SetStateAction<string>>;
  tabActive: string;
};

const Navbar = (props: Props) => {
  const { setSoundIsActive, soundIsActive, setTabActive, tabActive } = props;

  return (
    <NavbarWrapper>
      <MenuItems>
        <MenuItem>
          <MenuButton
            onClick={() => setTabActive("home")}
            $isActive={tabActive === "home"}
          >
            Home
            {tabActive === "home" && (
              <Underline
                layoutId="underline"
                initial={false}
                animate={{ backgroundColor: "var(--colour-yellow)" }}
              />
            )}
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton
            onClick={() => setTabActive("information")}
            $isActive={tabActive === "information"}
          >
            Information
            {tabActive === "information" && (
              <Underline
                layoutId="underline"
                initial={false}
                animate={{ backgroundColor: "var(--colour-yellow)" }}
              />
            )}
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton
            onClick={() => setTabActive("contact")}
            $isActive={tabActive === "contact"}
          >
            Contact
            {tabActive === "contact" && (
              <Underline
                layoutId="underline"
                initial={false}
                animate={{ backgroundColor: "var(--colour-yellow)" }}
              />
            )}
          </MenuButton>
        </MenuItem>
      </MenuItems>
      <SoundTriggerWrapper>
        <Span>Sound: </Span>
        <SoundTrigger
          $isActive={soundIsActive}
          onClick={() => setSoundIsActive(!soundIsActive)}
        >
          On
          {soundIsActive && (
            <Underline
              layoutId="audio-underline"
              initial={false}
              animate={{ backgroundColor: "var(--colour-yellow)" }}
            />
          )}
        </SoundTrigger>
        <Span> / </Span>
        <SoundTrigger
          $isActive={!soundIsActive}
          onClick={() => setSoundIsActive(!soundIsActive)}
        >
          Off
          {!soundIsActive && (
            <Underline
              layoutId="audio-underline"
              initial={false}
              animate={{ backgroundColor: "var(--colour-yellow)" }}
            />
          )}
        </SoundTrigger>
      </SoundTriggerWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
