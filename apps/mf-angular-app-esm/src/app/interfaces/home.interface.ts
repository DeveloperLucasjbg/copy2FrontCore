export interface HomeCard {
  title: string;
  description: string;
  image: string;
}

export interface NavItem {
  icon: string;
  label: string;
  route?: string;
  submenu?: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  route?: string;
  action?: () => void;
}

export interface GarantiaConstants {
  title: string;
  acotar?: string;
  description: string;
  cards?: {
      title: string;
      items: {
          icon?: string;
          title: string;
          description: string;
          buttonLabel: string;
      }[];
  };
  faqs?: {
    cards:{
      title: string;
      description: string;
    }[];
  };
  modalities?: {
      title: string;
      columnA: {
          title: string;
          items: {
              title: string;
          }[];
      };
      columnB: {
          title: string;
          items: {
              title: string;
          }[];
      };
  };
  requirements: {
      title: string;
      items: {
          title: string;
          description: string;
      }[];
  };
  image: string;
}