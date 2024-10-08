import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  HomePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  homePageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import { useState } from "react";
import Title from "../components/blocks/Title";
import useViewportWidth from "../hooks/useViewportWidth";
import Media from "../components/blocks/Media";
import SubTitles from "../components/blocks/SubTitles";
import Information from "../components/blocks/Information";
import Navbar from "../components/blocks/Navbar";
import Contact from "../components/blocks/Contact";

const PageWrapper = styled(motion.div)`
  position: relative;
  background: var(--colour-yellow);
`;

type Props = {
  data: HomePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, siteSettings, pageTransitionVariants } = props;

  const [heroMediaTimestamp, setHeroMediaTimestamp] = useState(0);
  const [readyToInteract, setReadyToInteract] = useState(false);
  const [tabActive, setTabActive] = useState("home");
  const [soundIsActive, setSoundIsActive] = useState(false);

  const viewport = useViewportWidth();
  const isMobile = viewport === "mobile" || viewport === "tabletPortrait";

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={data?.seoTitle || ""}
        description={data?.seoDescription || ""}
      />
      <Title
        isActive={tabActive === "home"}
        setReadyToInteract={setReadyToInteract}
      />
      <Media
        readyToInteract={readyToInteract}
        setHeroMediaTimestamp={setHeroMediaTimestamp}
        heroMedia={data?.heroMedia}
        heroCaptions={data?.heroCaptions}
        soundIsActive={soundIsActive}
      />
      <SubTitles
        isActive={tabActive === "home"}
        heroCaptions={data?.heroCaptions}
        heroMediaTimestamp={heroMediaTimestamp}
      />

      <Navbar
        setSoundIsActive={setSoundIsActive}
        soundIsActive={soundIsActive}
        setTabActive={setTabActive}
        tabActive={tabActive}
      />
      <Information
        isActive={tabActive === "information"}
        introduction={siteSettings?.introduction}
        team={siteSettings?.team}
        services={siteSettings?.services}
        clients={siteSettings?.clients}
        peopleLocationTitle={data?.peopleSection?.peopleLocationTitle}
        peopleLocationAddress={data?.peopleSection?.peopleLocationAddress}
        placesLocationTitle={data?.placesSection?.placesLocationTitle}
        placesLocationAddress={data?.placesSection?.placesLocationAddress}
        acknowledgementOfCountry={siteSettings?.acknowledgementOfCountry}
      />
      <Contact
        isActive={tabActive === "contact"}
        contacts={siteSettings?.contacts}
        socials={siteSettings?.socials}
      />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const data = await client.fetch(homePageQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
