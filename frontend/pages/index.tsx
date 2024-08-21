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
import Media from "../components/blocks/Media";
import { useState } from "react";
import Credits from "../components/blocks/Credits";
import Title from "../components/blocks/Title";

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

  const [peopleIsActive, setPeopleIsActive] = useState(false);
  const [placesIsActive, setPlacesIsActive] = useState(false);

  console.log("data", data);
  console.log("siteSettings", siteSettings);

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
        setPlacesIsActive={setPlacesIsActive}
        setPeopleIsActive={setPeopleIsActive}
        peopleIsActive={peopleIsActive}
        placesIsActive={placesIsActive}
      />
      <Credits
        isInactive={peopleIsActive || placesIsActive}
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
      <Media
        peopleMedia={data?.peopleSection?.peopleMedia}
        placesMedia={data?.placesSection?.placesMedia}
        peopleIsActive={peopleIsActive}
        placesIsActive={placesIsActive}
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
