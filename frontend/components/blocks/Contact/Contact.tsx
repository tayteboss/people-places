import styled from "styled-components";
import { ContactType, SiteSettingsType } from "../../../shared/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import pxToRem from "../../../utils/pxToRem";

const ContactWrapper = styled(motion.section)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: 0 ${pxToRem(16)};
    gap: ${pxToRem(16)};
  }
`;

const PeopleWrapper = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
`;

const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.h4`
  color: var(--colour-yellow);
  text-transform: uppercase;
  position: relative;
  font-family: var(--font-default);
  margin-bottom: ${pxToRem(10)};

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--colour-yellow);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  isActive: boolean;
  socials: SiteSettingsType["socials"];
  contacts: SiteSettingsType["contacts"];
};

const Contact = (props: Props) => {
  const { isActive, socials, contacts } = props;

  const hasContacts = contacts.length > 0;
  const hasSocials = socials.length > 0;

  return (
    <AnimatePresence>
      {isActive && (
        <ContactWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <PeopleWrapper>
            {hasContacts &&
              contacts.map((contact, i) => (
                <Section
                  name={contact?.name}
                  email={contact?.email}
                  location={contact?.location}
                  phone={contact?.phone}
                  role={contact?.role}
                  timezone={contact?.timezone}
                  key={i}
                />
              ))}
          </PeopleWrapper>
          <SocialWrapper>
            <SectionTitle className="type-p">Socials</SectionTitle>
            {hasSocials &&
              socials.map(
                (social, i) =>
                  social?.link && (
                    <ItemLink
                      className="type-p"
                      key={i}
                      href={social.link}
                      target="_blank"
                    >
                      {social?.name || ""} {social?.tag || ""}
                    </ItemLink>
                  )
              )}
          </SocialWrapper>
        </ContactWrapper>
      )}
    </AnimatePresence>
  );
};

const SectionWrapper = styled.div`
  min-width: ${pxToRem(220)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    min-width: ${pxToRem(170)};
  }
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.p`
  font-family: var(--font-default);
  color: var(--colour-yellow);
`;

const ItemLink = styled.a`
  font-family: var(--font-default);
  color: var(--colour-yellow);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Section = (props: ContactType) => {
  const { name, email, location, phone, role, timezone } = props;

  return (
    <SectionWrapper>
      {name && <SectionTitle className="type-p">{name}</SectionTitle>}
      <SectionContent>
        {role && <Item className="type-p">{role}</Item>}
        {email && (
          <ItemLink className="type-p" href={`mailto:${email}`}>
            E. {email}
          </ItemLink>
        )}
        {phone && (
          <ItemLink className="type-p" href={`tel:${phone}`}>
            T. {phone}
          </ItemLink>
        )}
        <Item className="type-p">–</Item>
        {location && <Item className="type-p">{location}</Item>}
        {timezone && <Time timezone={timezone} />}
      </SectionContent>
    </SectionWrapper>
  );
};

const Time = (props: { timezone: string }) => {
  const { timezone } = props;

  const [time, setTime] = useState({ hour: "00", minute: "00", period: "AM" });
  const [showColon, setShowColon] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const checkIfOffline = (hours: number) => {
    const checkIfBefore9amOrAfter530pm = (hours: number) => {
      console.log("hours", hours);

      return hours < 9 || hours > 17.5;
    };

    const checkIfWeekend = () => {
      const date = new Date();
      const day = date.getDay();
      return day === 0 || day === 6;
    };

    const offline = checkIfBefore9amOrAfter530pm(hours) || checkIfWeekend();
    setIsOffline(offline);
  };

  useEffect(() => {
    const updateTime = () => {
      const rightNow = new Date();
      const localTime12hr = rightNow.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: timezone,
      });

      const localTime24hr = rightNow.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone,
      });

      const [timePart12hr, period] = localTime12hr.split(" ");
      const [hour12hr, minute] = timePart12hr.split(":");

      const [hour24hr] = localTime24hr.split(":");

      setTime({ hour: hour12hr, minute, period });
      checkIfOffline(Number(hour24hr));
    };

    updateTime();

    // Flash the colon every second
    const colonInterval = setInterval(() => {
      setShowColon((prev) => !prev);
    }, 1000);

    // Update time every minute
    const timeInterval = setInterval(() => {
      updateTime();
    }, 60000);

    return () => {
      clearInterval(colonInterval);
      clearInterval(timeInterval);
    };
  }, [timezone]);

  return (
    <>
      {time && (
        <>
          <Item className="type-p">
            {time.hour}
            {showColon ? ":" : " "}
            {time.minute} {time.period}
          </Item>
          <Item className="type-p">
            (Currently {isOffline ? "Offline" : "Online"})
          </Item>
        </>
      )}
    </>
  );
};

export default Contact;
