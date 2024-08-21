export type MediaType = {
  asset: { playbackId: string };
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

export type SiteSettingsType = {
  introduction: string;
  team: ListItemType[];
  services: ListItemType[];
  clients: ListItemType[];
  acknowledgementOfCountry: string;
};

export type HomePageType = {
  seoTitle: string;
  seoDescription: string;
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
  placesMedia: MediaType;
  placesCaptions: CaptionType[];
  placesTagline?: string;
  placesLocationTitle: string;
  placesLocationAddress: string;
};

export type PeopleType = {
  peopleMedia: MediaType;
  peopleCaptions: CaptionType[];
  peopleTagline?: string;
  peopleLocationTitle: string;
  peopleLocationAddress: string;
};
