export const pl = {
  common: {
    readMore: 'Czytaj więcej',
    bookNow: 'REZERWUJ TERAZ',
    minutes: 'min',
    learnMore: 'Dowiedz się więcej',
  },
  nav: {
    home: 'STRONA GŁÓWNA',
    organizeParty: 'ZORGANIZUJ IMPREZĘ',
    blog: 'BLOG',
    faq: 'FAQ',
    contact: 'KONTAKT',
  },
  home: {
    hero: {
      title: 'DEMOLKA #1 W WARSZAWIE',
      subtitle: 'Uwolnij stres i emocje w najbardziej ekscytujący sposób!',
      description: 'Rozbij wszystko młotkami, bitami i kuvaldami.',
      cta: 'CHCĘ SPRÓBOWAĆ!',
    },
    pricing: {
      title: 'WYBIERZ SWÓJ PAKIET',
      toDestroy: 'DO ZDEMOLOWANIA',
      tools: 'NARZĘDZIA',
      packages: {
        easy: {
          name: 'BUŁKA Z MASŁEM',
          items: ['25 szklanych przedmiotów'],
          difficulty: 'ŁATWY'
        },
        medium: {
          name: 'ŁATWY',
          items: [
            '25 szklanych przedmiotów',
            '2 meble',
            '3 sprzęty RTV i AGD'
          ],
          difficulty: 'ŚREDNI'
        },
        hard: {
          name: 'ŚREDNI',
          items: [
            '30 szklanych przedmiotów',
            '3 meble',
            '5 sprzętów RTV i AGD'
          ],
          difficulty: 'TRUDNY'
        },
        extreme: {
          name: 'TRUDNY',
          items: [
            '35 szklanych przedmiotów',
            '5 meble',
            '8 sprzętów RTV i AGD',
            '10 mniejszych sprzętów RTV i AGD'
          ],
          difficulty: 'EKSTREMALNY'
        }
      },
      people: {
        '1-2': '1-2 osoby',
        '1-4': '1-4 osoby',
        '1-6': '1-6 osób'
      },
      duration: {
        '30': 'do 30 min',
        '45': 'do 45 min',
        '120': 'do 120 min',
        '180': 'do 180 min'
      },
      equipment: {
        included: 'W zestawie:',
        items: {
          ubranie: 'Ubranie ochronne',
          kask: 'Kask ochronny',
          rękawice: 'Rękawice ochronne'
        }
      },
      more: 'więcej...',
      bookNow: 'REZERWUJ TERAZ',
      bestSeller: 'BESTSELLER!',
      additionalItems: {
        title: 'Dodatki',
        subtitle: 'Wybierz dodatkowe przedmioty, które chcesz zniszczyć wraz z wybranym pakietem',
        items: [
          { name: 'szklanych przedmiotów', quantity: '10', price: '50 PLN' },
          { name: 'Klawiatura', quantity: '1', price: '20 PLN' },
          { name: 'TV/monitor', quantity: '1', price: '100 PLN' },
          { name: 'Meble', quantity: '1', price: '120 PLN' },
          { name: 'Drukarka', quantity: '1', price: '50 PLN' },
          { name: 'Mysz komputerowa', quantity: '1', price: '10 PLN' },
          { name: 'Telefon', quantity: '1', price: '30 PLN' },
          { name: 'Nagranie GoPro', quantity: '1', price: '50 PLN' }
        ]
      }
    },
    lounge: {
      title: 'STREFA RELAKSU',
      subtitle: 'Po intensywnej demolce',
      description: 'Odpręż się w naszej strefie relaksu po emocjonującej sesji demolki. Przygotowaliśmy dla Ciebie wygodne miejsce, gdzie możesz ochłonąć i podzielić się wrażeniami.',
    },
    voucher: {
      title: 'VOUCHER PREZENTOWY',
      subtitle: 'Podaruj wyjątkowe doświadczenie',
      description: 'Szukasz oryginalnego prezentu? Spraw bliskiej osobie niezapomniane wrażenia! Voucher na demolkę to idealny prezent na każdą okazję.',
      cta: 'KUP VOUCHER',
    },
    reviews: {
      title: 'OPINIE KLIENTÓW',
      subtitle: 'Co mówią o nas inni',
    },
    partners: {
      title: 'NASI PARTNERZY',
      subtitle: 'Zaufali nam',
    }
  }
} as const;
