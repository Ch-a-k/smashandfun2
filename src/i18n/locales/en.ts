export const en = {
  common: {
    readMore: 'Read more',
    bookNow: 'BOOK NOW',
    minutes: 'min',
    learnMore: 'Learn more',
  },
  nav: {
    home: 'HOME',
    organizeParty: 'ORGANIZE PARTY',
    blog: 'BLOG',
    faq: 'FAQ',
    contact: 'CONTACT',
  },
  home: {
    hero: {
      title: 'RAGE ROOM #1 IN WARSAW',
      subtitle: 'Release stress and emotions in the most exciting way!',
      description: 'Smash everything with hammers, bats, and sledgehammers.',
      cta: 'I WANT TO TRY!',
    },
    pricing: {
      title: 'CHOOSE YOUR PACKAGE',
      toDestroy: 'TO DESTROY',
      tools: 'TOOLS',
      packages: {
        easy: {
          name: 'PIECE OF CAKE',
          items: ['25 glass items'],
          difficulty: 'EASY'
        },
        medium: {
          name: 'EASY',
          items: [
            '25 glass items',
            '2 pieces of furniture',
            '3 electronic devices'
          ],
          difficulty: 'MEDIUM'
        },
        hard: {
          name: 'MEDIUM',
          items: [
            '30 glass items',
            '3 pieces of furniture',
            '5 electronic devices'
          ],
          difficulty: 'HARD'
        },
        extreme: {
          name: 'HARD',
          items: [
            '35 glass items',
            '5 pieces of furniture',
            '8 electronic devices',
            '10 small electronic devices'
          ],
          difficulty: 'EXTREME'
        }
      },
      people: {
        '1-2': '1-2 people',
        '1-4': '1-4 people',
        '1-6': '1-6 people'
      },
      duration: {
        '30': 'up to 30 min',
        '45': 'up to 45 min',
        '120': 'up to 120 min',
        '180': 'up to 180 min'
      },
      equipment: {
        included: 'Equipment included:',
        items: {
          ubranie: 'Protective clothing',
          kask: 'Safety helmet',
          rękawice: 'Safety gloves'
        }
      },
      more: 'more...',
      bookNow: 'BOOK NOW',
      bestSeller: 'BESTSELLER!',
      additionalItems: {
        title: 'Additional Items',
        subtitle: 'Choose additional items to destroy with your selected package',
        items: [
          { name: 'glass items', quantity: '10', price: '50 PLN' },
          { name: 'Keyboard', quantity: '1', price: '20 PLN' },
          { name: 'TV/monitor', quantity: '1', price: '100 PLN' },
          { name: 'Furniture', quantity: '1', price: '120 PLN' },
          { name: 'Printer', quantity: '1', price: '50 PLN' },
          { name: 'Computer mouse', quantity: '1', price: '10 PLN' },
          { name: 'Phone', quantity: '1', price: '30 PLN' },
          { name: 'GoPro recording', quantity: '1', price: '50 PLN' }
        ]
      }
    },
    lounge: {
      title: 'RELAXATION ZONE',
      subtitle: 'After intense smashing',
      description: 'Relax in our lounge area after an exciting smashing session. We\'ve prepared a comfortable space where you can cool down and share your impressions.',
    },
    voucher: {
      title: 'GIFT VOUCHER',
      subtitle: 'Give a unique experience',
      description: 'Looking for an original gift? Give your loved ones an unforgettable experience! A smashing session voucher is the perfect gift for any occasion.',
      cta: 'BUY VOUCHER',
    },
    reviews: {
      title: 'CUSTOMER REVIEWS',
      subtitle: 'What others say about us',
    },
    partners: {
      title: 'OUR PARTNERS',
      subtitle: 'They trust us',
    }
  }
} as const;
