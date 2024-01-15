
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
    {value: 'Cherkasy Oblast', label: 'Cherkasy Oblast'},
    {value: 'Chernihiv Oblast', label: 'Chernihiv Oblast'},
    {value: 'Chernivtsi Oblast', label: 'Chernivtsi Oblast'},
    {value: 'Dnipropetrovsk Oblast', label: 'Dnipropetrovsk Oblast'},
    {value: 'Donetsk Oblast', label: 'Donetsk Oblast'},
    {value: 'Ivano-Frankivsk Oblast', label: 'Ivano-Frankivsk Oblast'},
    {value: 'Kharkiv Oblast', label: 'Kharkiv Oblast'},
    {value: 'Kherson Oblast', label: 'Kherson Oblast'},
    {value: 'Khmelnytskyi Oblast', label: 'Khmelnytskyi Oblast'},
    {value: 'Kyiv Oblast', label: 'Kyiv Oblast'},
    {value: 'Kirovohrad Oblast', label: 'Kirovohrad Oblast'},
    {value: 'Luhansk Oblast', label: 'Luhansk Oblast'},
    {value: 'Lviv Oblast', label: 'Lviv Oblast'},
    {value: 'Mykolaiv Oblast', label: 'Mykolaiv Oblast'},
    {value: 'Odessa Oblast', label: 'Odessa Oblast'},
    {value: 'Poltava Oblast', label: 'Poltava Oblast'},
    {value: 'Rivne Oblast', label: 'Rivne Oblast'}, 
    {value: 'Sumy Oblast', label: 'Sumy Oblast'},
    {value: 'Ternopil Oblast', label: 'Ternopil Oblast'},
    {value: 'The Autonomous Republic of Crimea', label: 'The Autonomous Republic of Crimea'},
    {value: 'Vinnytsia Oblast', label: 'Vinnytsia Oblast'},
    {value: 'Volyn Oblast', label: 'Volyn Oblast'},
    {value: 'Zakarpattia Oblast', label: 'Zakarpattia Oblast'},
    {value: 'Zaporizhia Oblast', label: 'Zaporizhia Oblast'},
    {value: 'Zhytomyr Oblast', label: 'Zhytomyr Oblast'},
  ]


export const CITIES: {[key:string]: {value: string, label: string}[]} = {
  'Cherkasy Oblast': [
    {value: 'Cherkasy', label: 'Cherkasy'},
    {value: 'Chyhyryn', label: 'Chyhyryn'},
    {value: 'Horodyshche', label: 'Horodyshche'},
    {value: 'Kamianka', label: 'Kamianka'},
    {value: 'Kaniv', label: 'Kaniv'},
    {value: 'Uman', label: 'Uman'},
    {value: 'Shpola', label: 'Shpola'},
    {value: 'Smila', label: 'Smila'},
    {value: 'Zhashkiv', label: 'Zhashkiv'},
    {value: 'Zolotonosha', label: 'Zolotonosha'},
    {value: 'Zvenyhorodka', label: 'Zvenyhorodka'},
  ],
  'Chernihiv Oblast': [
    {value: 'Bakhmach', label: 'Bakhmach'},
    {value: 'Baturyn', label: 'Baturyn'},
    {value: 'Bobrovytsia', label: 'Bobrovytsia'},    
    {value: 'Borzna', label: 'Borzna'},
    {value: 'Chernihiv', label: 'Chernihiv'},
    {value: 'Horodnia', label: 'Horodnia'},
    {value: 'Ichnia', label: 'Ichnia'},
    {value: 'Koriukivka', label: 'Koriukivka'},
    {value: 'Nizhyn', label: 'Nizhyn'},
    {value: 'Nosivka', label: 'Nosivka'},
    {value: 'Novhorod-Siverskyi', label: 'Novhorod-Siverskyi'},
    {value: 'Oster', label: 'Oster'},
    {value: 'Pryluky', label: 'Pryluky'},
    {value: 'Semenivka', label: 'Semenivka'},
    {value: 'Snovsk', label: 'Snovsk'},
  ],
  'Chernivtsi Oblast': [
    {value: '', label: ''},
  ],
  'Dnipropetrovsk Oblast': [
    {value: '', label: ''},
  ],
  'Donetsk Oblast': [
    {value: '', label: ''},
  ],
  'Ivano-Frankivsk Oblast': [
    {value: '', label: ''},
  ],
  'Kharkiv Oblast': [
    {value: '', label: ''},
  ],
  'Kherson Oblast': [
    {value: '', label: ''},
  ],
  'Khmelnytskyi Oblast': [
    {value: '', label: ''},
  ],
  'Kyiv Oblast': [
    {value: '', label: ''},
  ],
  'Kirovohrad Oblast': [
    {value: '', label: ''},
  ],
  'Luhansk Oblast': [
    {value: '', label: ''},
  ],
  'Lviv Oblast': [
    {value: '', label: ''},
  ],
  'Mykolaiv Oblast': [
    {value: '', label: ''},
  ],
  'Odessa Oblast': [
    {value: '', label: ''},
  ],
  'Poltava Oblast': [
    {value: '', label: ''},
  ],
  'Rivne Oblast': [
    {value: '', label: ''},
  ], 
  'Sumy Oblast': [
    {value: '', label: ''},
  ],
  'Ternopil Oblast': [
    {value: '', label: ''},
  ],
  'The Autonomous Republic of Crimea': [
    {value: '', label: ''},
  ],
  'Vinnytsia Oblast': [
    {value: '', label: ''},
  ],
  'Volyn Oblast': [
    {value: '', label: ''},
  ],
  'Zakarpattia Oblast': [
    {value: '', label: ''},
  ],
  'Zaporizhia Oblast': [
    {value: '', label: ''},
  ],
  'Zhytomyr Oblast': [
    {value: '', label: ''},
  ],

}

// export const CITIES = [
//   'Alchevsk', 'Antratsyt', 'Bakhmut',
//   'Berdyansk', 'Bila Tserkva', 'Bilhorod-Dnistrovskyi',
//   'Bolhrad', 'Boryspil', 'Brody',
//   'Brovary', 'Bryanka', 'Cherkasy', 
//   'Chernihiv', 'Chernivtsi', 'Chervonohrad',
//   'Dnipro', 'Donetsk', 'Drohobych',
//   'Energodar', 'Fastiv', 'Glukhiv',
//   'Gorlivka', 'Ivano-Frankivsk', 'Izmail',
//   'Izyum', 'Kalush', 'Kamyanets Podilskiy', 
//   'Kamianske', 'Kharkiv', 'Kherson',
//   'Khmelnitsky', 'Kiyv', 'Kolomiya',
//   'Konotop', 'Konstantynivka', 'Korosten',
//   'Kovel', 'Kramatorsk', 'Kremenchug',
//   'Kremenets', 'Kryvyi Rig', 'Kropyvnytskyi', 
//   'Lubny', 'Luhansk', 'Lutsk', 'Lviv', 
//   'Mariupol', 'Melitopol', 'Myrgorod', 'Mukachevo',
//   'Mykolaiyv', 'Nikopol', 'Nizhyn', 'Odesa', 
//   'Okhtyrka', 'Oleksandriya', 'Pavlograd', 'Poltava', 
//   'Pripyat', 'Romny', 'Shostka', 'Smila',
//   'Stryi', 'Sumy', 'Ternopil', 'Uman', 
//   'Uzhgorod','Vinnitsya','Zaporizhya',
//   'Zhitomyr', 'Zhovti Vody'
// ];

export const NP_BRANCHES = [
  {value: 1, label: 'Post branch #1'},
  {value: 2, label: 'Post branch #2'},
  {value: 3, label: 'Post branch #3'},
  {value: 4, label: 'Post branch #4'},
  {value: 5, label: 'Post branch #5'},
  {value: 6, label: 'Post branch #6'},
  {value: 7, label: 'Post branch #7'},
  {value: 8, label: 'Post branch #8'},
  {value: 9, label: 'Post branch #9'},
  {value: 10, label: 'Post branch #1p'},
  {value: 11, label: 'Post branch #11'},
  {value: 12, label: 'Post branch #12'},
]