export const BASE_URL = 'http://127.0.0.1:8080/api/';

  export const CATEGORIES_FILTER: { [category: string]: string } = {
    'all': 'View All',
   'hoodie': 'Hoodies',
    'tShirt': 'T-Shirts',
    'coat': 'Coats',
    'cropTopAndShort':'Crop Top and Shorts Sets',    
  }

  export const COLORS = {
    Beige: 'beige',
    Black: 'black',
    Blue: 'blue',
    Chocolate: 'chocolate',
    'Mocha coffee': 'mochaCoffee',
    Pink: 'pink',
    Pistachio: 'pistachio',
    Yellow: 'yellow',
    White: 'white',    
  }

  export const COLORS_HEX: { [color:string]: string } = {
    beige: '#B19F93',
    black: '#29211E',
    blue: '#799EC1',
    chocolate: '#3E2F28',
    'mochaCoffee': '#85706C',
    pink: '#D9BCC1',
    pistachio: '#B3BDA2',
    yellow: '#FFE8A3',
    white: '#CBCBCB',
  };

  export const SIZES = {
    S: 's',
    M: 'm',
    Oversize: 'oversize',
  }

  export const SORT_BY: { [sort:string]: string } = {
    'newest': 'date, new to old',
    'cheapest': 'price, low to high',
    'mostExpensive': 'price, high to low',
  }

  export const ITEMS_PER_PAGE = 12;

  export const OBLASTS = [
    'Chekasy Oblast',
    'Chernihiv Oblast',
    'Chernivtsi Oblast',
    'Dnipropetrovsk Oblast',
    'Donetsk Oblast',
    'Ivano-Frankivsk Oblast',
    'Kharkiv Oblast',
    'Kherson Oblast',
    'Khmelnytskyi Oblast',
    'Kyiv Oblast',
    'Kirovohrad Oblast',
    'Luhansk Oblast',
    'Lviv Oblast',
    'Mykolaiv Oblast',
    'Odessa Oblast',
    'Poltava Oblast',
    'Rivne Oblast', 
    'Sumy Oblast',
    'Ternopil Oblast',
    'The Autonomous Republic of Crimea',
    'Vinnytsia Oblast',
    'Volyn Oblast',
    'Zakarpattia Oblast',
    'Zaporizhia Oblast',
    'Zhytomyr Oblast',
  ]

export const CITIES = [
  'Alchevsk', 'Antratsyt', 'Bakhmut',
  'Berdyansk', 'Bila Tserkva', 'Bilhorod-Dnistrovskyi',
  'Bolhrad', 'Boryspil', 'Brody',
  'Brovary', 'Bryanka', 'Cherkasy', 
  'Chernihiv', 'Chernivtsi', 'Chervonohrad',
  'Dnipro', 'Donetsk', 'Drohobych',
  'Energodar', 'Fastiv', 'Glukhiv',
  'Gorlivka', 'Ivano-Frankivsk', 'Izmail',
  'Izyum', 'Kalush', 'Kamyanets Podilskiy', 
  'Kamianske', 'Kharkiv', 'Kherson',
  'Khmelnitsky', 'Kiyv', 'Kolomiya',
  'Konotop', 'Konstantynivka', 'Korosten',
  'Kovel', 'Kramatorsk', 'Kremenchug',
  'Kremenets', 'Kryvyi Rig', 'Kropyvnytskyi', 
  'Lubny', 'Luhansk', 'Lutsk', 'Lviv', 
  'Mariupol', 'Melitopol', 'Myrgorod', 'Mukachevo',
  'Mykolaiyv', 'Nikopol', 'Nizhyn', 'Odesa', 
  'Okhtyrka', 'Oleksandriya', 'Pavlograd', 'Poltava', 
  'Pripyat', 'Romny', 'Shostka', 'Smila',
  'Stryi', 'Sumy', 'Ternopil', 'Uman', 
  'Uzhgorod','Vinnitsya','Zaporizhya',
  'Zhitomyr', 'Zhovti Vody'
];

export const NP_BRANCHES = [
  'Nova Post #1', 'Nova Post #2', 'Nova Post #3', 
  'Nova Post #4', 'Nova Post #5', 'Nova Post #6', 
  'Nova Post #7', 'Nova Post #8', 'Nova Post #9', 
  'Nova Post #10', 'Nova Post #11'
]