export interface Translations {
  common: {
    readMore: string;
    bookNow: string;
    minutes: string;
    learnMore: string;
  };
  nav: {
    home: string;
    organizeParty: string;
    blog: string;
    faq: string;
    contact: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    pricing: {
      title: string;
      toDestroy: string;
      tools: string;
      bestSeller: string;
      more: string;
      bookNow: string;
      additionalItems: {
        title: string;
        subtitle: string;
        items: {
          glass: string;
          furniture: string;
          electronic: string;
          gloves: string;
        };
      };
      packages: {
        easy: {
          name: string;
          items: string[];
          difficulty: string;
        };
        medium: {
          name: string;
          items: string[];
          difficulty: string;
        };
        hard: {
          name: string;
          items: string[];
          difficulty: string;
        };
        extreme: {
          name: string;
          items: string[];
          difficulty: string;
        };
      };
      people: {
        '1-2': string;
        '1-4': string;
        '1-6': string;
      };
      duration: {
        '30': string;
        '45': string;
        '120': string;
        '180': string;
      };
      equipment: {
        included: string;
        items: {
          ubranie: string;
          kask: string;
          rękawice: string;
        };
      };
    };
    lounge: {
      title: string;
      subtitle: string;
      description: string;
    };
    voucher: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    reviews: {
      title: string;
      subtitle: string;
    };
    partners: {
      title: string;
      subtitle: string;
    };
  };
}
