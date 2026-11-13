import { CreatureKey } from '../types/ecosystem';

export const ASSETS = {
  heroForest: '/src/assets/images/hero_ekosistem_kiki_1794552192992.jpg',
  closingFriends: '/src/assets/images/kiki_teman_hutan_1794552193675.jpg',
  fiveEcosystems: '/src/assets/images/lima_ekosistem_alam_1794552194812.jpg',
  bioticAbiotic: '/src/assets/images/biotik_dan_abiotik_1794552194722.jpg',
  symbiosisNature: '/src/assets/images/simbiosis_makhluk_hidup_1794552195572.jpg',
};

export interface EcosystemExample {
  id: string;
  name: string;
  creature: CreatureKey;
  description: string;
  livingThings: string;
  nonLivingThings: string;
  color: string;
}

export const ECOSYSTEM_EXAMPLES: EcosystemExample[] = [
  {
    id: 'hutan',
    name: 'Ekosistem Hutan',
    creature: 'hutan',
    description: 'Tempat tinggal banyak pohon rindang, burung, kupu-kupu, dan kelinci yang hidup rukun bersama tanah subur dan sinar matahari.',
    livingThings: 'Pohon, burung, kupu-kupu, kelinci, jamur',
    nonLivingThings: 'Tanah, udara, cahaya matahari, air hujan',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    id: 'sawah',
    name: 'Ekosistem Sawah',
    creature: 'sawah',
    description: 'Lahan pertanian tempat tumbuhnya tanaman padi, katak, belalang, dan burung pemakan serangga.',
    livingThings: 'Tanaman padi, katak, ulat, burung, petani',
    nonLivingThings: 'Air irigasi, lumpur/tanah, sinar matahari, udara',
    color: 'bg-lime-50 border-lime-200',
  },
  {
    id: 'sungai',
    name: 'Ekosistem Sungai',
    creature: 'sungai',
    description: 'Aliran air tawar yang menjadi rumah bagi ikan, katak, dan tumbuhan air di antara bebatuan sungai.',
    livingThings: 'Ikan, katak, lumut, tumbuhan air',
    nonLivingThings: 'Air mengalir, batu sungai, pasir, cahaya matahari',
    color: 'bg-sky-50 border-sky-200',
  },
  {
    id: 'laut',
    name: 'Ekosistem Laut',
    creature: 'laut',
    description: 'Perairan asin yang sangat luas tempat hidup ikan warna-warni, ikan hiu, ikan remora, dan terumbu karang.',
    livingThings: 'Ikan, hiu, ikan remora, penyu, karang',
    nonLivingThings: 'Air laut, garam, pasir dasar laut, cahaya matahari',
    color: 'bg-cyan-50 border-cyan-200',
  },
  {
    id: 'kebun',
    name: 'Ekosistem Kebun',
    creature: 'kebun',
    description: 'Taman atau halaman penuh bunga dan pohon buah yang sering dikunjungi lebah dan kupu-kupu.',
    livingThings: 'Bunga, pohon mangga, lebah, kupu-kupu, semut',
    nonLivingThings: 'Tanah gembur, air siraman, udara, sinar matahari',
    color: 'bg-amber-50 border-amber-200',
  },
];

export interface ComponentExample {
  id: string;
  name: string;
  type: 'biotik' | 'abiotik';
  creature: CreatureKey;
  explanation: string;
}

export const COMPONENT_EXAMPLES: ComponentExample[] = [
  {
    id: 'manusia',
    name: 'Manusia',
    type: 'biotik',
    creature: 'manusia',
    explanation: 'Manusia bernapas, tumbuh, dan merawat alam. Manusia termasuk makhluk hidup (biotik).',
  },
  {
    id: 'hewan',
    name: 'Hewan (Kelinci)',
    type: 'biotik',
    creature: 'kelinci',
    explanation: 'Kelinci bergerak, makan tumbuhan, dan berkembang biak. Hewan termasuk komponen biotik.',
  },
  {
    id: 'tumbuhan',
    name: 'Tumbuhan (Pohon)',
    type: 'biotik',
    creature: 'pohon',
    explanation: 'Pohon tumbuh tinggi dan membuat makanan sendiri dengan bantuan matahari. Tumbuhan adalah biotik.',
  },
  {
    id: 'jamur',
    name: 'Jamur',
    type: 'biotik',
    creature: 'jamur',
    explanation: 'Jamur tumbuh di tempat lembap dan menguraikan sisa tumbuhan. Jamur termasuk komponen biotik.',
  },
  {
    id: 'bakteri',
    name: 'Bakteri',
    type: 'biotik',
    creature: 'bakteri',
    explanation: 'Bakteri adalah makhluk hidup berukuran sangat kecil yang membantu menguraikan sisa alam.',
  },
  {
    id: 'air',
    name: 'Air',
    type: 'abiotik',
    creature: 'air',
    explanation: 'Air adalah benda tidak hidup yang sangat dibutuhkan semua makhluk hidup untuk minum dan tumbuh.',
  },
  {
    id: 'tanah',
    name: 'Tanah',
    type: 'abiotik',
    creature: 'tanah',
    explanation: 'Tanah adalah benda tidak hidup tempat tumbuhnya akar pohon dan tempat tinggal hewan tanah.',
  },
  {
    id: 'udara',
    name: 'Udara',
    type: 'abiotik',
    creature: 'udara',
    explanation: 'Udara menyediakan oksigen untuk bernapas manusia dan hewan, serta karbon dioksida bagi tumbuhan.',
  },
  {
    id: 'matahari',
    name: 'Cahaya Matahari',
    type: 'abiotik',
    creature: 'matahari',
    explanation: 'Cahaya matahari memberi kehangatan dan energi bagi tumbuhan untuk berfotosintesis.',
  },
  {
    id: 'batu',
    name: 'Batu',
    type: 'abiotik',
    creature: 'batu',
    explanation: 'Batu tidak bernapas, tidak makan, dan tidak tumbuh. Batu termasuk komponen abiotik.',
  },
  {
    id: 'suhu',
    name: 'Suhu',
    type: 'abiotik',
    creature: 'suhu',
    explanation: 'Suhu adalah tingkat panas atau dingin suatu tempat yang memengaruhi kehidupan makhluk hidup.',
  },
];

export interface RelationshipExample {
  id: string;
  title: string;
  actorA: CreatureKey;
  actorB: CreatureKey;
  summary: string;
  detail: string;
  badge: string;
}

export const RELATIONSHIP_EXAMPLES: RelationshipExample[] = [
  {
    id: 'lebah-bunga',
    title: 'Lebah mengambil nektar dari bunga',
    actorA: 'lebah',
    actorB: 'bunga',
    summary: 'Lebah datang ke bunga yang mekar untuk mengisap cairan manis yang disebut nektar.',
    detail: 'Saat lebah terbang dari satu bunga ke bunga lain, serbuk sari ikut menempel di tubuhnya dan membantu penyerbukan bunga!',
    badge: 'Hewan & Tumbuhan',
  },
  {
    id: 'burung-ulat',
    title: 'Burung memakan ulat',
    actorA: 'burung',
    actorB: 'ulat',
    summary: 'Burung membutuhkan makanan untuk mendapat energi, salah satunya dengan memakan ulat di daun.',
    detail: 'Hubungan makan dan dimakan ini menjaga jumlah ulat tidak terlalu banyak sehingga daun pohon tetap sehat.',
    badge: 'Rantai Makanan',
  },
  {
    id: 'katak-serangga',
    title: 'Katak memakan serangga',
    actorA: 'katak',
    actorB: 'serangga',
    summary: 'Di dekat sungai atau sawah, katak menangkap serangga kecil dengan lidahnya yang panjang.',
    detail: 'Katak memperoleh energi dari serangga agar bisa melompat dan bertahan hidup.',
    badge: 'Rantai Makanan',
  },
  {
    id: 'kupu-bunga',
    title: 'Kupu-kupu membantu penyerbukan bunga',
    actorA: 'kiki',
    actorB: 'bunga',
    summary: 'Kiki si Kupu-Kupu mengisap nektar bunga sambil membantu serbuk sari bertemu putik bunga.',
    detail: 'Berkat bantuan kupu-kupu, bunga dapat menghasilkan biji dan buah baru!',
    badge: 'Saling Membantu',
  },
  {
    id: 'tumbuhan-abiotik',
    title: 'Tumbuhan butuh sinar matahari, air, dan udara',
    actorA: 'matahari',
    actorB: 'pohon',
    summary: 'Agar bisa tumbuh subur, tumbuhan memerlukan sinar matahari, air dari tanah, dan udara.',
    detail: 'Ini membuktikan bahwa makhluk hidup (biotik) selalu membutuhkan benda tak hidup (abiotik).',
    badge: 'Biotik & Abiotik',
  },
];

export interface SymbiosisTypeInfo {
  id: 'mutualisme' | 'komensalisme' | 'parasitisme';
  name: string;
  symbol: string;
  symbolMeaning: string;
  definition: string;
  badgeStyle: string;
  cardStyle: string;
  examples: {
    pair: string;
    creatureA: CreatureKey;
    creatureB: CreatureKey;
    explanation: string;
  }[];
}

export const SYMBIOSIS_TYPES: SymbiosisTypeInfo[] = [
  {
    id: 'mutualisme',
    name: 'Simbiosis Mutualisme',
    symbol: '(+/+)',
    symbolMeaning: 'Kedua makhluk hidup mendapat keuntungan.',
    definition: 'Hubungan antara dua makhluk hidup yang saling menguntungkan.',
    badgeStyle: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    cardStyle: 'bg-emerald-50/70 border-emerald-200',
    examples: [
      {
        pair: 'Lebah dan Bunga',
        creatureA: 'lebah',
        creatureB: 'bunga',
        explanation: 'Lebah memperoleh nektar sebagai makanan, sedangkan bunga terbantu proses penyerbukannya.',
      },
      {
        pair: 'Burung Jalak dan Kerbau',
        creatureA: 'jalak',
        creatureB: 'kerbau',
        explanation: 'Burung jalak mendapatkan makanan berupa kutu, sedangkan kerbau terbantu karena kutunya berkurang.',
      },
      {
        pair: 'Kupu-kupu dan Bunga',
        creatureA: 'kiki',
        creatureB: 'bunga',
        explanation: 'Kupu-kupu memperoleh nektar dan membantu penyerbukan bunga.',
      },
    ],
  },
  {
    id: 'komensalisme',
    name: 'Simbiosis Komensalisme',
    symbol: '(+/0)',
    symbolMeaning: 'Satu pihak diuntungkan, pihak lainnya tidak terpengaruh.',
    definition: 'Hubungan antara dua makhluk hidup, satu pihak mendapat keuntungan, sedangkan pihak lainnya tidak dirugikan dan tidak diuntungkan.',
    badgeStyle: 'bg-sky-100 text-sky-900 border-sky-300',
    cardStyle: 'bg-sky-50/70 border-sky-200',
    examples: [
      {
        pair: 'Anggrek dan Pohon',
        creatureA: 'anggrek',
        creatureB: 'pohon',
        explanation: 'Anggrek mendapatkan tempat untuk hidup dan menempel agar mendapat sinar matahari, sedangkan pohon tidak dirugikan maupun diuntungkan.',
      },
      {
        pair: 'Ikan Remora dan Hiu',
        creatureA: 'remora',
        creatureB: 'hiu',
        explanation: 'Ikan remora mendapatkan sisa makanan dan perlindungan, sedangkan hiu tidak dirugikan maupun diuntungkan.',
      },
    ],
  },
  {
    id: 'parasitisme',
    name: 'Simbiosis Parasitisme',
    symbol: '(+/-)',
    symbolMeaning: 'Satu pihak diuntungkan, pihak lainnya dirugikan.',
    definition: 'Hubungan antara dua makhluk hidup, satu pihak mendapat keuntungan, sedangkan pihak lainnya dirugikan.',
    badgeStyle: 'bg-rose-100 text-rose-900 border-rose-300',
    cardStyle: 'bg-rose-50/70 border-rose-200',
    examples: [
      {
        pair: 'Benalu dan Pohon Mangga',
        creatureA: 'benalu',
        creatureB: 'mangga',
        explanation: 'Benalu mengambil air dan zat makanan dari pohon sehingga merugikan pohon mangga.',
      },
      {
        pair: 'Kutu dan Kucing',
        creatureA: 'kutu',
        creatureB: 'kucing',
        explanation: 'Kutu mendapatkan makanan dengan mengisap darah kucing sehingga kucing merasa gatal dan dirugikan.',
      },
      {
        pair: 'Cacing Pita dan Manusia',
        creatureA: 'cacing_pita',
        creatureB: 'manusia',
        explanation: 'Cacing pita mendapatkan makanan dari tubuh manusia sehingga merugikan kesehatan manusia.',
      },
    ],
  },
];

export const MATERIAL_NARRATIONS: Record<1 | 2 | 3 | 4, string> = {
  1: 'Halo anak-anak hebat! Yuk kita mengenal ekosistem. Ekosistem adalah hubungan timbal balik antara makhluk hidup dengan lingkungan tempat tinggalnya. Contoh ekosistem di sekitar kita ada lima, yaitu ekosistem hutan, ekosistem sawah, ekosistem sungai, ekosistem laut, dan ekosistem kebun.',
  2: 'Sekarang kita pelajari komponen ekosistem. Ekosistem terdiri atas dua komponen utama. Pertama, komponen biotik, yaitu semua makhluk hidup seperti manusia, hewan, tumbuhan, jamur, dan bakteri. Kedua, komponen abiotik, yaitu benda tidak hidup yang mendukung kehidupan seperti air, tanah, udara, cahaya matahari, batu, dan suhu.',
  3: 'Makhluk hidup dalam ekosistem saling berhubungan dan saling membutuhkan. Contohnya lebah mengambil nektar dari bunga, burung memakan ulat, katak memakan serangga, kupu-kupu membantu penyerbukan bunga, serta tumbuhan membutuhkan sinar matahari, air, dan udara untuk tumbuh.',
  4: 'Mari mengenal simbiosis! Simbiosis adalah hubungan erat antara dua makhluk hidup yang berbeda jenis. Ada tiga jenis simbiosis. Pertama, simbiosis mutualisme dengan simbol plus plus, artinya saling menguntungkan, contohnya lebah dan bunga, serta burung jalak dan kerbau. Kedua, simbiosis komensalisme dengan simbol plus nol, satu untung dan satu tidak terpengaruh, contohnya anggrek dan pohon, serta ikan remora dan hiu. Ketiga, simbiosis parasitisme dengan simbol plus minus, satu untung dan satu dirugikan, contohnya benalu dan pohon mangga, kutu dan kucing, serta cacing pita dan manusia.',
};

// GAME 1 DATA: Sort 10 items into Biotik vs Abiotik
export interface Game1Item {
  id: string;
  name: string;
  creature: CreatureKey;
  category: 'biotik' | 'abiotik';
  reason: string;
}

export const GAME1_ITEMS: Game1Item[] = [
  { id: 'g1-pohon', name: 'Pohon', creature: 'pohon', category: 'biotik', reason: 'Pohon bisa tumbuh dan berfotosintesis sehingga termasuk makhluk hidup (biotik).' },
  { id: 'g1-kupu', name: 'Kupu-kupu', creature: 'kiki', category: 'biotik', reason: 'Kupu-kupu bernapas, terbang, dan makan nektar sehingga termasuk komponen biotik.' },
  { id: 'g1-batu', name: 'Batu', creature: 'batu', category: 'abiotik', reason: 'Batu adalah benda mati yang tidak bernapas dan tidak tumbuh (abiotik).' },
  { id: 'g1-air', name: 'Air', creature: 'air', category: 'abiotik', reason: 'Air adalah benda tidak hidup yang dibutuhkan untuk minum dan tempat hidup ikan (abiotik).' },
  { id: 'g1-burung', name: 'Burung', creature: 'burung', category: 'biotik', reason: 'Burung bergerak, makan, dan bertelur sehingga termasuk komponen biotik.' },
  { id: 'g1-matahari', name: 'Matahari', creature: 'matahari', category: 'abiotik', reason: 'Cahaya matahari memberi energi panas dan terang, termasuk komponen abiotik.' },
  { id: 'g1-tanah', name: 'Tanah', creature: 'tanah', category: 'abiotik', reason: 'Tanah adalah benda tidak hidup tempat akar tumbuhan menancap (abiotik).' },
  { id: 'g1-rumput', name: 'Rumput', creature: 'rumput', category: 'biotik', reason: 'Rumput adalah tumbuhan hijau yang hidup dan tumbuh (biotik).' },
  { id: 'g1-ikan', name: 'Ikan', creature: 'ikan', category: 'biotik', reason: 'Ikan bernapas di air dan berenang mencari makan (biotik).' },
  { id: 'g1-jamur', name: 'Jamur', creature: 'jamur', category: 'biotik', reason: 'Jamur adalah makhluk hidup pengurai di tempat lembap (biotik).' },
];

// GAME 2 DATA: Match 6 symbiosis pairs
export interface Game2Pair {
  id: string;
  pairName: string;
  creatureA: CreatureKey;
  creatureB: CreatureKey;
  answer: 'mutualisme' | 'komensalisme' | 'parasitisme';
  explanation: string;
}

export const GAME2_PAIRS: Game2Pair[] = [
  {
    id: 'g2-1',
    pairName: 'Lebah dan Bunga',
    creatureA: 'lebah',
    creatureB: 'bunga',
    answer: 'mutualisme',
    explanation: 'Keduanya saling untung (+/+): lebah mendapat nektar, bunga terbantu penyerbukannya.',
  },
  {
    id: 'g2-2',
    pairName: 'Anggrek dan Pohon',
    creatureA: 'anggrek',
    creatureB: 'pohon',
    answer: 'komensalisme',
    explanation: 'Anggrek mendapat tempat menempel (+), sedangkan pohon tidak untung dan tidak rugi (0).',
  },
  {
    id: 'g2-3',
    pairName: 'Kutu dan Kucing',
    creatureA: 'kutu',
    creatureB: 'kucing',
    answer: 'parasitisme',
    explanation: 'Kutu untung karena mengisap darah (+), sedangkan kucing gatal dan dirugikan (-).',
  },
  {
    id: 'g2-4',
    pairName: 'Burung Jalak dan Kerbau',
    creatureA: 'jalak',
    creatureB: 'kerbau',
    answer: 'mutualisme',
    explanation: 'Saling untung (+/+): burung jalak kenyang makan kutu, tubuh kerbau menjadi bersih dari kutu.',
  },
  {
    id: 'g2-5',
    pairName: 'Ikan Remora dan Hiu',
    creatureA: 'remora',
    creatureB: 'hiu',
    answer: 'komensalisme',
    explanation: 'Ikan remora untung mendapat sisa makanan dan perlindungan (+), sedangkan hiu tidak terpengaruh (0).',
  },
  {
    id: 'g2-6',
    pairName: 'Benalu dan Pohon Mangga',
    creatureA: 'benalu',
    creatureB: 'mangga',
    answer: 'parasitisme',
    explanation: 'Benalu mengambil air dan makanan dari pohon mangga (+), membuat pohon mangga dirugikan (-).',
  },
];

// GAME 3 DATA: Siapa Aku? (10 progressive questions)
export interface Game3Question {
  id: string;
  level: string;
  creature: CreatureKey;
  clue: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const GAME3_QUESTIONS: Game3Question[] = [
  {
    id: 'g3-1',
    level: 'Tahap 1 · Mudah',
    creature: 'lebah',
    clue: 'Aku adalah hewan kecil bersayap yang mengambil nektar dari bunga. Aku juga membantu penyerbukan bunga. Siapakah aku?',
    options: ['Kucing', 'Lebah', 'Ikan'],
    correctAnswer: 'Lebah',
    explanation: 'Lebah mencari nektar manis di bunga sekaligus membantu memindahkan serbuk sari.',
  },
  {
    id: 'g3-2',
    level: 'Tahap 2 · Mudah',
    creature: 'matahari',
    clue: 'Aku bukan makhluk hidup, tetapi aku bersinar terang di langit siang hari. Tumbuhan membutuhkanku untuk membuat makanan. Siapakah aku?',
    options: ['Cahaya Matahari', 'Batu', 'Jamur'],
    correctAnswer: 'Cahaya Matahari',
    explanation: 'Cahaya matahari adalah komponen abiotik utama pemberi energi untuk fotosintesis tumbuhan.',
  },
  {
    id: 'g3-3',
    level: 'Tahap 3 · Mudah',
    creature: 'katak',
    clue: 'Aku bisa hidup di darat dan dekat air sawah atau sungai. Aku menangkap serangga dengan lidahku. Siapakah aku?',
    options: ['Kelinci', 'Katak', 'Burung Jalak'],
    correctAnswer: 'Katak',
    explanation: 'Katak adalah hewan amfibi pemakan serangga yang sering ditemukan di ekosistem sawah dan sungai.',
  },
  {
    id: 'g3-4',
    level: 'Tahap 4 · Sedang',
    creature: 'pohon',
    clue: 'Aku berakar di tanah dan memiliki daun hijau. Aku termasuk komponen biotik yang menghasilkan oksigen. Siapakah aku?',
    options: ['Air', 'Tanah', 'Pohon'],
    correctAnswer: 'Pohon',
    explanation: 'Pohon adalah tumbuhan hijau (komponen biotik) yang menghasilkan oksigen bagi makhluk hidup.',
  },
  {
    id: 'g3-5',
    level: 'Tahap 5 · Sedang',
    creature: 'air',
    clue: 'Aku adalah benda tidak hidup yang mengalir di sungai. Ikan tinggal di dalamku dan semua hewan meminumku. Siapakah aku?',
    options: ['Air', 'Rumput', 'Cacing'],
    correctAnswer: 'Air',
    explanation: 'Air termasuk komponen abiotik yang sangat penting bagi kelangsungan hidup semua makhluk.',
  },
  {
    id: 'g3-6',
    level: 'Tahap 6 · Sedang',
    creature: 'jalak',
    clue: 'Aku suka bertengger di punggung kerbau untuk memakan kutu yang ada di tubuhnya. Kami saling menguntungkan. Siapakah aku?',
    options: ['Ikan Remora', 'Burung Jalak', 'Kutu'],
    correctAnswer: 'Burung Jalak',
    explanation: 'Burung jalak dan kerbau adalah contoh simbiosis mutualisme karena sama-sama untung (+/+).',
  },
  {
    id: 'g3-7',
    level: 'Tahap 7 · Sedang',
    creature: 'anggrek',
    clue: 'Aku bunga cantik yang menempel pada batang pohon tinggi agar mendapat sinar matahari, tanpa merugikan pohon itu. Siapakah aku?',
    options: ['Benalu', 'Anggrek', 'Jamur'],
    correctAnswer: 'Anggrek',
    explanation: 'Anggrek menumpang tempat menempel saja (komensalisme), tidak mengambil makanan dari pohon.',
  },
  {
    id: 'g3-8',
    level: 'Tahap 8 · Menantang',
    creature: 'remora',
    clue: 'Aku berenang di dekat ikan hiu untuk mendapat sisa makanan dan perlindungan, sementara hiu tidak terganggu. Siapakah aku?',
    options: ['Ikan Remora', 'Kupu-kupu', 'Katak'],
    correctAnswer: 'Ikan Remora',
    explanation: 'Ikan remora dan hiu membentuk simbiosis komensalisme (+/0).',
  },
  {
    id: 'g3-9',
    level: 'Tahap 9 · Menantang',
    creature: 'benalu',
    clue: 'Aku menempel di dahan pohon mangga dan menyerap air serta makanannya sehingga pohon mangga menjadi lemah. Siapakah aku?',
    options: ['Anggrek', 'Benalu', 'Rumput'],
    correctAnswer: 'Benalu',
    explanation: 'Benalu merugikan inangnya sehingga hubungannya dengan pohon mangga disebut parasitisme (+/-).',
  },
  {
    id: 'g3-10',
    level: 'Tahap 10 · Juara',
    creature: 'jamur',
    clue: 'Aku tumbuh di kayu lembap atau tanah hutan. Aku termasuk makhluk hidup yang membantu menguraikan sisa tumbuhan mati. Siapakah aku?',
    options: ['Batu', 'Jamur', 'Suhu'],
    correctAnswer: 'Jamur',
    explanation: 'Jamur adalah makhluk hidup pengurai yang termasuk komponen biotik dalam ekosistem.',
  },
];

// GAME 4 DATA: Benar atau Salah? (10 statements)
export interface Game4Statement {
  id: string;
  statement: string;
  creature: CreatureKey;
  isTrue: boolean;
  explanation: string;
}

export const GAME4_STATEMENTS: Game4Statement[] = [
  {
    id: 'g4-1',
    statement: 'Air termasuk komponen abiotik.',
    creature: 'air',
    isTrue: true,
    explanation: 'Benar! Air adalah benda tidak hidup yang dibutuhkan makhluk hidup, jadi air adalah abiotik.',
  },
  {
    id: 'g4-2',
    statement: 'Pohon termasuk komponen biotik.',
    creature: 'pohon',
    isTrue: true,
    explanation: 'Benar! Pohon adalah tumbuhan hidup yang tumbuh, bernapas, dan berkembang biak.',
  },
  {
    id: 'g4-3',
    statement: 'Mutualisme berarti kedua makhluk hidup saling dirugikan.',
    creature: 'lebah',
    isTrue: false,
    explanation: 'Salah! Simbiosis mutualisme (+/+) berarti kedua makhluk hidup SALING MENGUNTUNGKAN.',
  },
  {
    id: 'g4-4',
    statement: 'Anggrek dan pohon merupakan contoh komensalisme.',
    creature: 'anggrek',
    isTrue: true,
    explanation: 'Benar! Anggrek mendapat tempat menempel (+), sedangkan pohon tidak untung dan tidak rugi (0).',
  },
  {
    id: 'g4-5',
    statement: 'Kutu dan kucing merupakan contoh parasitisme.',
    creature: 'kutu',
    isTrue: true,
    explanation: 'Benar! Kutu untung mendapat darah (+), sedangkan kucing gatal dan dirugikan (-).',
  },
  {
    id: 'g4-6',
    statement: 'Lebah dan bunga merupakan contoh mutualisme.',
    creature: 'bunga',
    isTrue: true,
    explanation: 'Benar! Lebah memperoleh nektar dan bunga terbantu penyerbukannya (+/+).',
  },
  {
    id: 'g4-7',
    statement: 'Batu termasuk makhluk hidup.',
    creature: 'batu',
    isTrue: false,
    explanation: 'Salah! Batu tidak bernapas, tidak makan, dan tidak tumbuh. Batu termasuk benda tak hidup (abiotik).',
  },
  {
    id: 'g4-8',
    statement: 'Burung jalak dan kerbau adalah contoh simbiosis parasitisme.',
    creature: 'jalak',
    isTrue: false,
    explanation: 'Salah! Burung jalak dan kerbau saling menguntungkan, sehingga termasuk simbiosis mutualisme (+/+).',
  },
  {
    id: 'g4-9',
    statement: 'Ikan remora dan ikan hiu termasuk simbiosis komensalisme.',
    creature: 'remora',
    isTrue: true,
    explanation: 'Benar! Ikan remora mendapat sisa makanan dan perlindungan (+), sedangkan hiu tidak terpengaruh (0).',
  },
  {
    id: 'g4-10',
    statement: 'Cacing pita yang hidup di tubuh manusia merugikan manusia.',
    creature: 'cacing_pita',
    isTrue: true,
    explanation: 'Benar! Cacing pita mengambil sari makanan dari tubuh manusia sehingga termasuk parasitisme (+/-).',
  },
];

// GAME 5 DATA: Petualangan Misi Akhir (15 mixed questions, 10 points each = 150 max)
export interface Game5Question {
  id: string;
  topic: string;
  creature: CreatureKey;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const GAME5_QUESTIONS: Game5Question[] = [
  {
    id: 'm1',
    topic: 'Pengertian Ekosistem',
    creature: 'hutan',
    question: 'Apa yang dimaksud dengan ekosistem?',
    options: [
      'Kumpulan batu dan tanah di gunung saja',
      'Hubungan timbal balik antara makhluk hidup dengan lingkungan tempat tinggalnya',
      'Kumpulan hewan yang tinggal di kebun binatang',
      'Daftar nama tumbuhan yang ada di sawah',
    ],
    correctIndex: 1,
    explanation: 'Ekosistem adalah hubungan timbal balik antara makhluk hidup (biotik) dengan lingkungan tempat tinggalnya (abiotik).',
  },
  {
    id: 'm2',
    topic: 'Contoh Ekosistem',
    creature: 'laut',
    question: 'Berikut ini yang merupakan contoh ekosistem perairan air asin adalah ...',
    options: ['Ekosistem laut', 'Ekosistem kebun', 'Ekosistem hutan', 'Ekosistem sawah'],
    correctIndex: 0,
    explanation: 'Ekosistem laut adalah perairan air asin tempat hidup ikan, hiu, remora, dan terumbu karang.',
  },
  {
    id: 'm3',
    topic: 'Komponen Biotik',
    creature: 'kelinci',
    question: 'Manakah kelompok benda berikut yang seluruhnya termasuk komponen biotik?',
    options: [
      'Air, batu, dan tanah',
      'Matahari, udara, dan suhu',
      'Manusia, kelinci, dan jamur',
      'Batu, pohon, dan pasir',
    ],
    correctIndex: 2,
    explanation: 'Manusia, kelinci (hewan), dan jamur semuanya adalah makhluk hidup sehingga termasuk komponen biotik.',
  },
  {
    id: 'm4',
    topic: 'Komponen Abiotik',
    creature: 'matahari',
    question: 'Komponen abiotik yang memberikan energi panas dan cahaya bagi tumbuhan adalah ...',
    options: ['Jamur', 'Cahaya matahari', 'Bakteri', 'Bunga'],
    correctIndex: 1,
    explanation: 'Cahaya matahari adalah komponen abiotik (tidak hidup) yang membantu tumbuhan membuat makanan.',
  },
  {
    id: 'm5',
    topic: 'Komponen Abiotik',
    creature: 'udara',
    question: 'Mengapa udara termasuk komponen penting dalam ekosistem?',
    options: [
      'Karena udara adalah hewan kecil',
      'Karena manusia dan hewan membutuhkan udara untuk bernapas',
      'Karena udara bisa dimakan oleh katak',
      'Karena udara tumbuh dari dalam tanah',
    ],
    correctIndex: 1,
    explanation: 'Udara menyediakan oksigen untuk bernapas manusia dan hewan, serta membantu tumbuhan tumbuh.',
  },
  {
    id: 'm6',
    topic: 'Hubungan Antarmakhluk Hidup',
    creature: 'burung',
    question: 'Di kebun, burung memakan ulat yang ada di daun. Hubungan ini menunjukkan bahwa makhluk hidup ...',
    options: [
      'Tidak membutuhkan makhluk hidup lain',
      'Saling berhubungan dalam kebutuhan makanan',
      'Bisa hidup tanpa air dan udara',
      'Semua termasuk benda mati',
    ],
    correctIndex: 1,
    explanation: 'Burung memakan ulat untuk mendapatkan energi, sekaligus membantu mengendalikan jumlah ulat di daun.',
  },
  {
    id: 'm7',
    topic: 'Hubungan Antarmakhluk Hidup',
    creature: 'katak',
    question: 'Katak di sawah sering membantu petani karena katak memakan ...',
    options: ['Batu kerikil', 'Serangga', 'Cahaya matahari', 'Akar pohon mangga'],
    correctIndex: 1,
    explanation: 'Katak memakan serangga di sawah untuk bertahan hidup.',
  },
  {
    id: 'm8',
    topic: 'Pengertian Simbiosis',
    creature: 'kiki',
    question: 'Hubungan erat antara dua makhluk hidup yang berbeda jenis disebut ...',
    options: ['Abiotik', 'Simbiosis', 'Fotosintesis', 'Batu alam'],
    correctIndex: 1,
    explanation: 'Simbiosis adalah hubungan erat antara dua makhluk hidup yang berbeda jenis.',
  },
  {
    id: 'm9',
    topic: 'Simbiosis Mutualisme',
    creature: 'lebah',
    question: 'Simbol (+/+) digunakan untuk menggambarkan simbiosis ...',
    options: ['Parasitisme', 'Komensalisme', 'Mutualisme', 'Abiotik'],
    correctIndex: 2,
    explanation: 'Simbol (+/+) artinya kedua makhluk hidup mendapat keuntungan, yaitu simbiosis mutualisme.',
  },
  {
    id: 'm10',
    topic: 'Simbiosis Mutualisme',
    creature: 'jalak',
    question: 'Keuntungan yang diperoleh kerbau saat dihinggapi burung jalak adalah ...',
    options: [
      'Tubuhnya menjadi gatal',
      'Kutunya berkurang karena dimakan burung jalak',
      'Kerbau tidak bisa berjalan lagi',
      'Burung jalak mengambil makanan kerbau',
    ],
    correctIndex: 1,
    explanation: 'Burung jalak memakan kutu di punggung kerbau, sehingga burung jalak kenyang dan kerbau bersih dari kutu.',
  },
  {
    id: 'm11',
    topic: 'Simbiosis Komensalisme',
    creature: 'anggrek',
    question: 'Hubungan antara anggrek dan pohon tempatnya menempel adalah simbiosis komensalisme karena ...',
    options: [
      'Anggrek untung mendapat tempat hidup, pohon tidak dirugikan maupun diuntungkan',
      'Anggrek mengambil seluruh air pohon hingga pohon mati',
      'Keduanya saling memakan satu sama lain',
      'Pohon sangat dirugikan oleh bunga anggrek',
    ],
    correctIndex: 0,
    explanation: 'Komensalisme (+/0) terjadi karena anggrek untung mendapat tempat menempel, dan pohon tidak terpengaruh.',
  },
  {
    id: 'm12',
    topic: 'Simbiosis Komensalisme',
    creature: 'remora',
    question: 'Apa keuntungan ikan remora yang berenang di dekat ikan hiu?',
    options: [
      'Mengisap darah ikan hiu',
      'Mendapatkan sisa makanan dan perlindungan',
      'Membuat ikan hiu menjadi sakit',
      'Membantu penyerbukan ikan hiu',
    ],
    correctIndex: 1,
    explanation: 'Ikan remora mendapat sisa makanan dan perlindungan dari predator lain, sedangkan hiu tidak terganggu (+/0).',
  },
  {
    id: 'm13',
    topic: 'Simbiosis Parasitisme',
    creature: 'benalu',
    question: 'Contoh simbiosis parasitisme (+/-) pada tumbuhan adalah ...',
    options: [
      'Kupu-kupu dan bunga',
      'Anggrek dan pohon',
      'Benalu dan pohon mangga',
      'Burung jalak dan kerbau',
    ],
    correctIndex: 2,
    explanation: 'Benalu mengambil air dan zat makanan dari pohon mangga sehingga pohon mangga dirugikan (+/-).',
  },
  {
    id: 'm14',
    topic: 'Simbiosis Parasitisme',
    creature: 'kutu',
    question: 'Dalam hubungan kutu dan kucing, pihak yang dirugikan adalah ...',
    options: ['Kutu', 'Kucing', 'Keduanya untung', 'Tidak ada yang rugi'],
    correctIndex: 1,
    explanation: 'Kutu mendapat makanan dengan mengisap darah, sedangkan kucing merasa gatal dan dirugikan (-).',
  },
  {
    id: 'm15',
    topic: 'Simbiosis Parasitisme',
    creature: 'cacing_pita',
    question: 'Cacing pita yang hidup di dalam tubuh manusia termasuk simbiosis ...',
    options: [
      'Mutualisme (+/+)',
      'Komensalisme (+/0)',
      'Parasitisme (+/-)',
      'Komponen abiotik',
    ],
    correctIndex: 2,
    explanation: 'Cacing pita mendapat makanan dari tubuh manusia (+), sedangkan manusia dirugikan kesehatannya (-).',
  },
];

export function getAwardCategory(percentage: number): {
  title: string;
  message: string;
  stars: number;
  badgeColor: string;
} {
  if (percentage >= 90) {
    return {
      title: 'BINTANG SUPER!',
      message: 'Luar biasa! Kamu menguasai dunia ekosistem dan simbiosis dengan sangat hebat!',
      stars: 5,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    };
  }
  if (percentage >= 80) {
    return {
      title: 'HEBAT SEKALI!',
      message: 'Keren! Pemahamanmu tentang ekosistem dan simbiosis sudah sangat bagus!',
      stars: 4,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    };
  }
  if (percentage >= 70) {
    return {
      title: 'ANAK PINTAR!',
      message: 'Bagus sekali! Terus berlatih bersama Kiki agar nilaimu semakin tinggi!',
      stars: 3,
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    };
  }
  return {
    title: 'TETAP SEMANGAT! AYO BELAJAR LAGI!',
    message: 'Jangan menyerah ya! Yuk baca ulang materi bersama Ibu Guru dan coba bermain lagi!',
    stars: 2,
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
  };
}
