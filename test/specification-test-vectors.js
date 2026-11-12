// specification-test-vectors.js
// Contains specification vectors in the original specification found here
// https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/cashaddr.md
export const KNOWN_NETWORK_PREFIXES = ['bitcoincash', 'bchtest', 'bchreg'];
export const SPEC_TEST_VECTORS = [
  // 20-byte payloads
  {
    payloadSize: 20,
    type: 0,
    cashAddr: 'bitcoincash:qr6m7j9njldwwzlg9v7v53unlr4jkmx6eylep8ekg2',
    payloadHex: 'F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9',
  },
  {
    payloadSize: 20,
    type: 1,
    cashAddr: 'bchtest:pr6m7j9njldwwzlg9v7v53unlr4jkmx6eyvwc0uz5t',
    payloadHex: 'F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9',
  },
  {
    payloadSize: 20,
    type: 1,
    cashAddr: 'pref:pr6m7j9njldwwzlg9v7v53unlr4jkmx6ey65nvtks5',
    payloadHex: 'F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9',
  },
  {
    payloadSize: 20,
    type: 15,
    cashAddr: 'prefix:0r6m7j9njldwwzlg9v7v53unlr4jkmx6ey3qnjwsrf',
    payloadHex: 'F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9',
  },

  // 24-byte payloads
  {
    payloadSize: 24,
    type: 0,
    cashAddr: 'bitcoincash:q9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2ws4mr9g0',
    payloadHex: '7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA',
  },
  {
    payloadSize: 24,
    type: 1,
    cashAddr: 'bchtest:p9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2u94tsynr',
    payloadHex: '7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA',
  },
  {
    payloadSize: 24,
    type: 1,
    cashAddr: 'pref:p9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2khlwwk5v',
    payloadHex: '7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA',
  },
  {
    payloadSize: 24,
    type: 15,
    cashAddr: 'prefix:09adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2p29kc2lp',
    payloadHex: '7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA',
  },

  // 28-byte payloads
  {
    payloadSize: 28,
    type: 0,
    cashAddr: 'bitcoincash:qgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcw59jxxuz',
    payloadHex: '3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B',
  },
  {
    payloadSize: 28,
    type: 1,
    cashAddr: 'bchtest:pgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcvs7md7wt',
    payloadHex: '3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B',
  },
  {
    payloadSize: 28,
    type: 1,
    cashAddr: 'pref:pgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcrsr6gzkn',
    payloadHex: '3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B',
  },
  {
    payloadSize: 28,
    type: 15,
    cashAddr: 'prefix:0gagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkc5djw8s9g',
    payloadHex: '3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B',
  },

  // 32-byte payloads
  {
    payloadSize: 32,
    type: 0,
    cashAddr: 'bitcoincash:qvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq5nlegake',
    payloadHex: '3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060',
  },
  {
    payloadSize: 32,
    type: 1,
    cashAddr: 'bchtest:pvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq7fqng6m6',
    payloadHex: '3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060',
  },
  {
    payloadSize: 32,
    type: 1,
    cashAddr: 'pref:pvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq4k9m7qf9',
    payloadHex: '3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060',
  },
  {
    payloadSize: 32,
    type: 15,
    cashAddr: 'prefix:0vch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxqsh6jgp6w',
    payloadHex: '3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060',
  },

  // 40-byte payloads
  {
    payloadSize: 40,
    type: 0,
    cashAddr: 'bitcoincash:qnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklv39gr3uvz',
    payloadHex: 'C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB',
  },
  {
    payloadSize: 40,
    type: 1,
    cashAddr: 'bchtest:pnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklvmgm6ynej',
    payloadHex: 'C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB',
  },
  {
    payloadSize: 40,
    type: 1,
    cashAddr: 'pref:pnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklv0vx5z0w3',
    payloadHex: 'C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB',
  },
  {
    payloadSize: 40,
    type: 15,
    cashAddr: 'prefix:0nq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklvwsvctzqy',
    payloadHex: 'C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB',
  },

  // 48-byte payloads
  {
    payloadSize: 48,
    type: 0,
    cashAddr: 'bitcoincash:qh3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqex2w82sl',
    payloadHex: 'E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C',
  },
  {
    payloadSize: 48,
    type: 1,
    cashAddr: 'bchtest:ph3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqnzf7mt6x',
    payloadHex: 'E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C',
  },
  {
    payloadSize: 48,
    type: 1,
    cashAddr: 'pref:ph3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqjntdfcwg',
    payloadHex: 'E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C',
  },
  {
    payloadSize: 48,
    type: 15,
    cashAddr: 'prefix:0h3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqakcssnmn',
    payloadHex: 'E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C',
  },

  // 56-byte payloads
  {
    payloadSize: 56,
    type: 0,
    cashAddr: 'bitcoincash:qmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqscw8jd03f',
    payloadHex: 'D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041',
  },
  {
    payloadSize: 56,
    type: 1,
    cashAddr: 'bchtest:pmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqs6kgdsg2g',
    payloadHex: 'D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041',
  },
  {
    payloadSize: 56,
    type: 1,
    cashAddr: 'pref:pmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqsammyqffl',
    payloadHex: 'D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041',
  },
  {
    payloadSize: 56,
    type: 15,
    cashAddr: 'prefix:0mvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqsgjrqpnw8',
    payloadHex: 'D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041',
  },

  // 64-byte payloads
  {
    payloadSize: 64,
    type: 0,
    cashAddr: 'bitcoincash:qlg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mtky5sv5w',
    payloadHex: 'D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B',
  },
  {
    payloadSize: 64,
    type: 1,
    cashAddr: 'bchtest:plg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mc773cwez',
    payloadHex: 'D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B',
  },
  {
    payloadSize: 64,
    type: 1,
    cashAddr: 'pref:plg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mg7pj3lh8',
    payloadHex: 'D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B',
  },
  {
    payloadSize: 64,
    type: 15,
    cashAddr: 'prefix:0lg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96ms92w6845',
    payloadHex: 'D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B',
  },
];
