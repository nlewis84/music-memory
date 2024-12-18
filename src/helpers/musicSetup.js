const MUSIC_MEMORY_PIECES = [
  // { majorWork: '', selection: '', composer: '', youtube: '', grade: '' },
  { majorWork: 'The Well-Tempered Clavier, Book 1', selection: 'Prelude No. 1', composer: 'Bach', youtube: '7ZNXBpO-uEo', grade: '2' },
  { majorWork: 'Symphony No. 1', selection: 'Movement 3', composer: 'Beethoven', youtube: 'x-ILsPFUeAI', grade: '2' },
  { majorWork: 'Carmen', selection: 'Toreador Song', composer: 'Bizet', youtube: 'g2ULycjl_g0', grade: '2' },
  { majorWork: '', selection: 'Waltz in A-Flat Major', composer: 'Brahms', youtube: '6Oy0w7eLgRk', grade: 'all' },
  { majorWork: '', selection: "The Prince of Denmark's March", composer: 'Clarke', youtube: 'Va5ox4rh8WE', grade: '2' },
  { majorWork: '', selection: 'Clair de Lune', composer: 'Debussy', youtube: 'WKU8DJzipW4', grade: 'all' },
  { majorWork: 'Pomp and Circumstance', selection: 'March No. 1', composer: 'Elgar', youtube: 'moL4MkJ-aLk', grade: 'all' },
  { majorWork: '', selection: 'Take the "A" Train', composer: 'Ellington/Strayhorn', youtube: 'r2G1fKYFgVU', grade: '2' },
  { majorWork: '', selection: 'O la, o che bon eccho (Echo Song)', composer: 'Lassus', youtube: 'Wyo43D6NHII', grade: '2' },
  { majorWork: 'The Magic Flute', selection: 'Der Vogelfänger bin ich ja', composer: 'Mozart', youtube: 'cK0y0hH1Kyk', grade: '2' },
  { majorWork: 'Pictures at an Exhibition', selection: 'Promenade', composer: 'Mussorgsky', youtube: '_5r8sa863Ts', grade: '2' },
  { majorWork: 'Symphony No. 1', selection: 'Movement 4. Finale', composer: 'Price', youtube: '5t5nMxqxTO4', grade: 'all' },
  { majorWork: 'Armenian Dances (Part 1)', selection: 'Gna, Gna (Go, Go)', composer: 'Reed, Alfred', youtube: 'KNrGTScz8jk', grade: '2' },
  { majorWork: 'The Barber of Seville', selection: 'Zitti, zitti, piano, piano', composer: 'Rossini', youtube: 'jLh8DiXQDGk', grade: 'all' },
  { majorWork: 'Requiem', selection: 'Dies Irae', composer: 'Verdi', youtube: 'CUGMZlvrR4c', grade: 'all' },
  { majorWork: 'The Four Seasons', selection: 'Autumn, Movement 3', composer: 'Vivaldi', youtube: 'PapzGRO9edU', grade: '2' }
];

// const MUSIC_MEMORY_PIECES_2023 = [
//   { majorWork: 'Orchestral Suite No. 2', selection: 'Badinerie', composer: 'Bach', youtube: '4ufehp7gULA' },
//   { majorWork: 'Hungarian Sketches', selection: 'Bear Dance', composer: 'Bartók', youtube: 'vJkWrisEAtI'},
//   { majorWork: 'Piano Sonata No. 8, "Pathétique"', selection: 'Movement 3', composer: 'Beethoven', youtube: 'lJpSqC86vaw' },
//   { majorWork: '', selection: 'Minute Waltz', composer: 'Chopin', youtube: 'YwAAosTb9O4' },
//   { majorWork: 'Lakmé', selection: 'Flower Duet', composer: 'Delibes', youtube: 'C1ZL5AxmK_A' },
//   { majorWork: '', selection: 'El Grillo', composer: 'des Prez', youtube: 'O_EsMD6oDvI' },
//   { majorWork: 'Estancia Suite', selection: 'Malambo', composer: 'Ginastera', youtube: '6bz9qXIgp-I' },
//   { majorWork: '', selection: 'Sixty Minutes Polka', composer: 'Deutscher', youtube: 'Fx4MKh0vNyY' },
//   { majorWork: 'Symphony No. 94, "Surprise"', selection: 'Movement 2', composer: 'Haydn', youtube: 'lLjwkamp3lI' },
//   { majorWork: 'Così fan tutte', selection: 'Overture', composer: 'Mozart', youtube: '9-RkOrzMJMI' },
//   { majorWork: 'Madama Butterfly', selection: 'Humming Chorus', composer: 'Puccini', youtube: '8-rKxGZSRKk' },
//   { majorWork: 'The Tale of Tsar Saltan', selection: 'Flight of the Bumblebee', composer: 'Rimsky-Korsakov', youtube: 'WFYaOyRPLBM' },
//   { majorWork: '', selection: 'Semper Fidelis', composer: 'Sousa', youtube: 'kqxvdAFKo4k' },
//   { majorWork: '', selection: 'Radetzky March', composer: 'J. Strauss, Sr.', youtube: 'eab_eFtTKFs' },
//   { majorWork: 'The Sleeping Beauty', selection: 'Waltz', composer: 'Tchaikovsky', youtube: '2Sb8WCPjPDs' },
//   { majorWork: 'Star Wars: Episode IV - A New Hope', selection: 'Cantina Band', composer: 'Williams', youtube: 'Ak0zy49qsHE' }
// ];

// const MUSIC_MEMORY_PIECES_2022 = [
//   { majorWork: 'Toccata and Fugue in d minor', selection: 'Toccata', composer: 'Bach', youtube: 'ho9rZjlsyYY' },
//   { majorWork: 'Symphony No. 6, "Pastoral"', selection: 'Movement 3', composer: 'Beethoven', youtube: 'fbFxVVLM2zc' },
//   { majorWork: 'Solomon', selection: 'The Arrival of the Queen of Sheba', composer: 'Handel', youtube: '-TGKJ9MgCOQ' },
//   { majorWork: '', selection: 'Variations on "America"', composer: 'Ives', youtube: 'N7TuU5zxge8' },
//   { majorWork: '', selection: 'The Entertainer', composer: 'Joplin', youtube: 'g8syRhvSZdk' },
//   { majorWork: 'Gayane Suite', selection: 'Sabre Dance', composer: 'Khachaturian', youtube: 'mUQHGpxrz-8' },
//   { majorWork: 'Songs of a Wayfarer', selection: "Ging heut' morgen über's Feld", composer: 'Mahler', youtube: '6VCpbMPhmWY' },
//   { majorWork: 'Horn Concerto No. 2', selection: 'Movement 3', composer: 'Mozart', youtube: 'u3SlQYcuAEE' },
//   { majorWork: 'Gloria', selection: 'Laudamus te', composer: 'Poulenc', youtube: 'eMYy0_dXzOs' },
//   { majorWork: '', selection: 'Sing, Sing, Sing', composer: 'Prima', youtube: 'r2S1I_ien6A' },
//   { majorWork: 'Symphony No. 1, "Classical"', selection: 'Finale', composer: 'Prokofiev', youtube: '2ntRJCqQiFw' },
//   { majorWork: 'The Barber of Seville', selection: 'Largo al factotum', composer: 'Rossini', youtube: 'JhLxK2xGqqo' },
//   { majorWork: 'English Folk Song Suite', selection: 'Seventeen Come Sunday', composer: 'Vaughan Williams', youtube: '5f9yAI2D1PE' },
//   { majorWork: 'Gloria in D Major', selection: 'Gloria in excelsis Deo', composer: 'Vivaldi', youtube: 'IVyRd9mlGyQ' },
//   { majorWork: 'Lohengrin', selection: 'Prelude to Act 3', composer: 'Wagner', youtube: 'ZOQlG8YRxEQ' },
//   { majorWork: 'Symphony No. 1', selection: 'Movement 3', composer: 'Zwilich', youtube: '_Bn9OGOKlDA' }
// ]

// const MUSIC_MEMORY_PIECES_2021 = [
//   {selection: 'Minuet in G', composer: 'Beethoven', youtube: 'gQ-KTGqaqlA'},
//   {majorWork: 'The Creation', selection: 'The Heavens Are Telling', composer: 'Haydn', youtube: 'OwqqfbinUDY'},
//   {majorWork: 'Cello Suite No. 1 in G Major', selection: 'Prelude', composer: 'Bach', youtube: '1prweT95Mo0'},
//   {majorWork: 'Symphonie Fantastique', selection: 'March to the Scaffold', composer: 'Berlioz', youtube: 'QwCuFaq2L3U'},
//   {selection: 'Short Ride in a Fast Machine', composer: 'Adams', youtube: 'rx9JUyFqTJI'},
//   {majorWork: 'Nabucco', selection: 'Va, pensiero', composer: 'Verdi', youtube: 'XObwULrJ5xg'},
//   {majorWork: "Young Person's Guide to the Orchestra", selection: 'Fugue', composer: 'Britten', youtube: 'UuRdm9x6LaI'},
//   {selection: 'Hungarian Dance No. 5', composer: 'Brahms', youtube: '-HNmVe0Mmek'},
//   {majorWork: 'Three Gymnopedies', selection: 'No. 1', composer: 'Satie', youtube: 'S-Xm7s9eGxU'},
//   {majorWork: 'West Side Story', selection: 'Dance at the Gym (Mambo)', composer: 'Bernstein', youtube: 'Pqn-lO2QCGc'},
//   {majorWork: 'Viola Concerto in G Major', selection: 'Movement 2', composer: 'Telemann', youtube: 'iTbwMis5Xn4'},
//   {majorWork: 'Symphony No. 40', selection: 'Movement 1', composer: 'Mozart', youtube: 'BJPmYURJk4c'},
//   {selection: "It Don't Mean a Thing If It Ain't Got That Swing", composer: 'Ellington', youtube: 'myRc-3oF1d0'},
//   {selection: 'Circus Polka (For a Young Elephant)', composer: 'Stravinksy', youtube: 'kkL9LS2ZfUE'},
//   {selection: 'Medalist Fanfare', composer: 'Giroux', youtube: 'tEjso5bweQY'},
//   {selection: 'Fanfare for the Common Man', composer: 'Copland', youtube: '9dljTJ9qJ4U'}
// ]

export default MUSIC_MEMORY_PIECES;
