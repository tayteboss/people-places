export type MediaType = {
  asset: { playbackId: string };
};

export type AudioType = {
  asset: { url: string };
};

export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type ButtonType = {
  url: string;
  pageReference: {
    _ref: string;
  };
  title: string;
};

export type SlugType = {
  current: string;
};

export type ListItemType = {
  title: string;
  name: string;
  link?: string;
};

export type SocialListType = {
  name: string;
  tag: string;
  link?: string;
};

export type ClientItemType = {
  name: string;
  link?: string;
};

export type ContactType = {
  email: string;
  location: string;
  name: string;
  phone: string;
  role: string;
  timezone: string;
};

export type SiteSettingsType = {
  introduction: string;
  team: ListItemType[];
  services: string[];
  socials: SocialListType[];
  clients: ClientItemType[];
  contacts: ContactType[];
  acknowledgementOfCountry: string;
};

export type HomePageType = {
  seoTitle: string;
  seoDescription: string;
  heroMedia: MediaType;
  heroCaptions: CaptionType[];
  peopleSection: PeopleType;
  placesSection: PlacesType;
};

export type WorkPageType = {
  seoTitle: string;
  seoDescription: string;
};

export type CaptionType = {
  caption: string;
  start: number;
  end: number;
};

export type PlacesType = {
  placesAudio: AudioType;
  placesCaptions: CaptionType[];
  placesLocationTitle: string;
  placesLocationAddress: string;
};

export type PeopleType = {
  peopleAudio: AudioType;
  peopleCaptions: CaptionType[];
  peopleLocationTitle: string;
  peopleLocationAddress: string;
};
