// FLAGVERSE country database
// Fields: name, code (ISO 3166-1 alpha-2), iso_n3 (ISO 3166-1 numeric-3, matches world-atlas map IDs),
// capital, continent, middleEast (regional overlay), difficulty (1 Easy - 5 Insane), neighbors (ISO2 land borders, best-effort; empty for islands)
const COUNTRIES = [
  {
    "name": "Afghanistan",
    "code": "AF",
    "capital": "Kabul",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "PK",
      "IR",
      "TM",
      "UZ",
      "TJ",
      "CN"
    ],
    "iso_n3": "004"
  },
  {
    "name": "Albania",
    "code": "AL",
    "capital": "Tirana",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "ME",
      "RS",
      "MK",
      "GR"
    ],
    "iso_n3": "008"
  },
  {
    "name": "Algeria",
    "code": "DZ",
    "capital": "Algiers",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "MA",
      "EH",
      "MR",
      "ML",
      "NE",
      "LY",
      "TN"
    ],
    "iso_n3": "012"
  },
  {
    "name": "Andorra",
    "code": "AD",
    "capital": "Andorra la Vella",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "FR",
      "ES"
    ],
    "iso_n3": "020"
  },
  {
    "name": "Angola",
    "code": "AO",
    "capital": "Luanda",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CD",
      "CG",
      "ZM",
      "NA"
    ],
    "iso_n3": "024"
  },
  {
    "name": "Antigua and Barbuda",
    "code": "AG",
    "capital": "Saint John's",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "028"
  },
  {
    "name": "Argentina",
    "code": "AR",
    "capital": "Buenos Aires",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "CL",
      "BO",
      "PY",
      "BR",
      "UY"
    ],
    "iso_n3": "032"
  },
  {
    "name": "Armenia",
    "code": "AM",
    "capital": "Yerevan",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "GE",
      "AZ",
      "IR",
      "TR"
    ],
    "iso_n3": "051"
  },
  {
    "name": "Australia",
    "code": "AU",
    "capital": "Canberra",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [],
    "iso_n3": "036"
  },
  {
    "name": "Austria",
    "code": "AT",
    "capital": "Vienna",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "DE",
      "CZ",
      "SK",
      "HU",
      "SI",
      "IT",
      "CH",
      "LI"
    ],
    "iso_n3": "040"
  },
  {
    "name": "Azerbaijan",
    "code": "AZ",
    "capital": "Baku",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "RU",
      "GE",
      "AM",
      "IR",
      "TR"
    ],
    "iso_n3": "031"
  },
  {
    "name": "Bahamas",
    "code": "BS",
    "capital": "Nassau",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "044"
  },
  {
    "name": "Bahrain",
    "code": "BH",
    "capital": "Manama",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [],
    "iso_n3": "048"
  },
  {
    "name": "Bangladesh",
    "code": "BD",
    "capital": "Dhaka",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "IN",
      "MM"
    ],
    "iso_n3": "050"
  },
  {
    "name": "Barbados",
    "code": "BB",
    "capital": "Bridgetown",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "052"
  },
  {
    "name": "Belarus",
    "code": "BY",
    "capital": "Minsk",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "RU",
      "UA",
      "PL",
      "LT",
      "LV"
    ],
    "iso_n3": "112"
  },
  {
    "name": "Belgium",
    "code": "BE",
    "capital": "Brussels",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "FR",
      "DE",
      "NL",
      "LU"
    ],
    "iso_n3": "056"
  },
  {
    "name": "Belize",
    "code": "BZ",
    "capital": "Belmopan",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "MX",
      "GT"
    ],
    "iso_n3": "084"
  },
  {
    "name": "Benin",
    "code": "BJ",
    "capital": "Porto-Novo",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "TG",
      "GH",
      "BF",
      "NE",
      "NG"
    ],
    "iso_n3": "204"
  },
  {
    "name": "Bhutan",
    "code": "BT",
    "capital": "Thimphu",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "CN",
      "IN"
    ],
    "iso_n3": "064"
  },
  {
    "name": "Bolivia",
    "code": "BO",
    "capital": "Sucre",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "BR",
      "PY",
      "AR",
      "CL",
      "PE"
    ],
    "iso_n3": "068"
  },
  {
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "capital": "Sarajevo",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "HR",
      "RS",
      "ME"
    ],
    "iso_n3": "070"
  },
  {
    "name": "Botswana",
    "code": "BW",
    "capital": "Gaborone",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "NA",
      "ZM",
      "ZW",
      "ZA"
    ],
    "iso_n3": "072"
  },
  {
    "name": "Brazil",
    "code": "BR",
    "capital": "Brasília",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "UY",
      "AR",
      "PY",
      "BO",
      "PE",
      "CO",
      "VE",
      "GY",
      "SR",
      "GF"
    ],
    "iso_n3": "076"
  },
  {
    "name": "Brunei",
    "code": "BN",
    "capital": "Bandar Seri Begawan",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "MY"
    ],
    "iso_n3": "096"
  },
  {
    "name": "Bulgaria",
    "code": "BG",
    "capital": "Sofia",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "RO",
      "RS",
      "MK",
      "GR",
      "TR"
    ],
    "iso_n3": "100"
  },
  {
    "name": "Burkina Faso",
    "code": "BF",
    "capital": "Ouagadougou",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "ML",
      "NE",
      "BJ",
      "TG",
      "GH",
      "CI"
    ],
    "iso_n3": "854"
  },
  {
    "name": "Burundi",
    "code": "BI",
    "capital": "Gitega",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "RW",
      "TZ",
      "CD"
    ],
    "iso_n3": "108"
  },
  {
    "name": "Cabo Verde",
    "code": "CV",
    "capital": "Praia",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "132"
  },
  {
    "name": "Cambodia",
    "code": "KH",
    "capital": "Phnom Penh",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "TH",
      "LA",
      "VN"
    ],
    "iso_n3": "116"
  },
  {
    "name": "Cameroon",
    "code": "CM",
    "capital": "Yaoundé",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "NG",
      "TD",
      "CF",
      "CG",
      "GA",
      "GQ"
    ],
    "iso_n3": "120"
  },
  {
    "name": "Canada",
    "code": "CA",
    "capital": "Ottawa",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "US"
    ],
    "iso_n3": "124"
  },
  {
    "name": "Central African Republic",
    "code": "CF",
    "capital": "Bangui",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "TD",
      "SD",
      "SS",
      "CD",
      "CG",
      "CM"
    ],
    "iso_n3": "140"
  },
  {
    "name": "Chad",
    "code": "TD",
    "capital": "N'Djamena",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "LY",
      "SD",
      "CF",
      "CM",
      "NG",
      "NE"
    ],
    "iso_n3": "148"
  },
  {
    "name": "Chile",
    "code": "CL",
    "capital": "Santiago",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "PE",
      "BO",
      "AR"
    ],
    "iso_n3": "152"
  },
  {
    "name": "China",
    "code": "CN",
    "capital": "Beijing",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "RU",
      "MN",
      "KZ",
      "KG",
      "TJ",
      "AF",
      "PK",
      "IN",
      "NP",
      "BT",
      "MM",
      "LA",
      "VN",
      "KP"
    ],
    "iso_n3": "156"
  },
  {
    "name": "Colombia",
    "code": "CO",
    "capital": "Bogotá",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "PA",
      "VE",
      "BR",
      "PE",
      "EC"
    ],
    "iso_n3": "170"
  },
  {
    "name": "Comoros",
    "code": "KM",
    "capital": "Moroni",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "174"
  },
  {
    "name": "Costa Rica",
    "code": "CR",
    "capital": "San José",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "NI",
      "PA"
    ],
    "iso_n3": "188"
  },
  {
    "name": "Croatia",
    "code": "HR",
    "capital": "Zagreb",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "SI",
      "HU",
      "RS",
      "BA",
      "ME"
    ],
    "iso_n3": "191"
  },
  {
    "name": "Cuba",
    "code": "CU",
    "capital": "Havana",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [],
    "iso_n3": "192"
  },
  {
    "name": "Cyprus",
    "code": "CY",
    "capital": "Nicosia",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [],
    "iso_n3": "196"
  },
  {
    "name": "Czechia",
    "code": "CZ",
    "capital": "Prague",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "DE",
      "PL",
      "SK",
      "AT"
    ],
    "iso_n3": "203"
  },
  {
    "name": "Democratic Republic of the Congo",
    "code": "CD",
    "capital": "Kinshasa",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CG",
      "CF",
      "SS",
      "UG",
      "RW",
      "BI",
      "TZ",
      "ZM",
      "AO"
    ],
    "iso_n3": "180"
  },
  {
    "name": "Denmark",
    "code": "DK",
    "capital": "Copenhagen",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "DE"
    ],
    "iso_n3": "208"
  },
  {
    "name": "Djibouti",
    "code": "DJ",
    "capital": "Djibouti",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "ER",
      "ET",
      "SO"
    ],
    "iso_n3": "262"
  },
  {
    "name": "Dominica",
    "code": "DM",
    "capital": "Roseau",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "212"
  },
  {
    "name": "Dominican Republic",
    "code": "DO",
    "capital": "Santo Domingo",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "HT"
    ],
    "iso_n3": "214"
  },
  {
    "name": "Ecuador",
    "code": "EC",
    "capital": "Quito",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CO",
      "PE"
    ],
    "iso_n3": "218"
  },
  {
    "name": "Egypt",
    "code": "EG",
    "capital": "Cairo",
    "continent": "Africa",
    "middleEast": true,
    "difficulty": 1,
    "neighbors": [
      "LY",
      "SD",
      "PS"
    ],
    "iso_n3": "818"
  },
  {
    "name": "El Salvador",
    "code": "SV",
    "capital": "San Salvador",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "GT",
      "HN"
    ],
    "iso_n3": "222"
  },
  {
    "name": "Equatorial Guinea",
    "code": "GQ",
    "capital": "Malabo",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "CM",
      "GA"
    ],
    "iso_n3": "226"
  },
  {
    "name": "Eritrea",
    "code": "ER",
    "capital": "Asmara",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "SD",
      "ET",
      "DJ"
    ],
    "iso_n3": "232"
  },
  {
    "name": "Estonia",
    "code": "EE",
    "capital": "Tallinn",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "RU",
      "LV"
    ],
    "iso_n3": "233"
  },
  {
    "name": "Eswatini",
    "code": "SZ",
    "capital": "Mbabane",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "ZA",
      "MZ"
    ],
    "iso_n3": "748"
  },
  {
    "name": "Ethiopia",
    "code": "ET",
    "capital": "Addis Ababa",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "ER",
      "DJ",
      "SO",
      "KE",
      "SS",
      "SD"
    ],
    "iso_n3": "231"
  },
  {
    "name": "Fiji",
    "code": "FJ",
    "capital": "Suva",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "242"
  },
  {
    "name": "Finland",
    "code": "FI",
    "capital": "Helsinki",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "SE",
      "NO",
      "RU"
    ],
    "iso_n3": "246"
  },
  {
    "name": "France",
    "code": "FR",
    "capital": "Paris",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "BE",
      "LU",
      "DE",
      "CH",
      "IT",
      "MC",
      "ES",
      "AD"
    ],
    "iso_n3": "250"
  },
  {
    "name": "Gabon",
    "code": "GA",
    "capital": "Libreville",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "GQ",
      "CM",
      "CG"
    ],
    "iso_n3": "266"
  },
  {
    "name": "Gambia",
    "code": "GM",
    "capital": "Banjul",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "SN"
    ],
    "iso_n3": "270"
  },
  {
    "name": "Georgia",
    "code": "GE",
    "capital": "Tbilisi",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "RU",
      "AZ",
      "AM",
      "TR"
    ],
    "iso_n3": "268"
  },
  {
    "name": "Germany",
    "code": "DE",
    "capital": "Berlin",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "DK",
      "PL",
      "CZ",
      "AT",
      "CH",
      "FR",
      "LU",
      "BE",
      "NL"
    ],
    "iso_n3": "276"
  },
  {
    "name": "Ghana",
    "code": "GH",
    "capital": "Accra",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "CI",
      "BF",
      "TG"
    ],
    "iso_n3": "288"
  },
  {
    "name": "Greece",
    "code": "GR",
    "capital": "Athens",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "AL",
      "MK",
      "BG",
      "TR"
    ],
    "iso_n3": "300"
  },
  {
    "name": "Grenada",
    "code": "GD",
    "capital": "Saint George's",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "308"
  },
  {
    "name": "Guatemala",
    "code": "GT",
    "capital": "Guatemala City",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "MX",
      "BZ",
      "HN",
      "SV"
    ],
    "iso_n3": "320"
  },
  {
    "name": "Guinea",
    "code": "GN",
    "capital": "Conakry",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "GW",
      "SN",
      "ML",
      "CI",
      "LR",
      "SL"
    ],
    "iso_n3": "324"
  },
  {
    "name": "Guinea-Bissau",
    "code": "GW",
    "capital": "Bissau",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "SN",
      "GN"
    ],
    "iso_n3": "624"
  },
  {
    "name": "Guyana",
    "code": "GY",
    "capital": "Georgetown",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "VE",
      "BR",
      "SR"
    ],
    "iso_n3": "328"
  },
  {
    "name": "Haiti",
    "code": "HT",
    "capital": "Port-au-Prince",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "DO"
    ],
    "iso_n3": "332"
  },
  {
    "name": "Honduras",
    "code": "HN",
    "capital": "Tegucigalpa",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "GT",
      "SV",
      "NI"
    ],
    "iso_n3": "340"
  },
  {
    "name": "Hungary",
    "code": "HU",
    "capital": "Budapest",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "AT",
      "SK",
      "UA",
      "RO",
      "RS",
      "HR",
      "SI"
    ],
    "iso_n3": "348"
  },
  {
    "name": "Iceland",
    "code": "IS",
    "capital": "Reykjavik",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [],
    "iso_n3": "352"
  },
  {
    "name": "India",
    "code": "IN",
    "capital": "New Delhi",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "PK",
      "CN",
      "NP",
      "BT",
      "BD",
      "MM"
    ],
    "iso_n3": "356"
  },
  {
    "name": "Indonesia",
    "code": "ID",
    "capital": "Jakarta",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "MY",
      "PG",
      "TL"
    ],
    "iso_n3": "360"
  },
  {
    "name": "Iran",
    "code": "IR",
    "capital": "Tehran",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 1,
    "neighbors": [
      "IQ",
      "TR",
      "AZ",
      "TM",
      "AF",
      "PK"
    ],
    "iso_n3": "364"
  },
  {
    "name": "Iraq",
    "code": "IQ",
    "capital": "Baghdad",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 1,
    "neighbors": [
      "TR",
      "IR",
      "KW",
      "SA",
      "JO",
      "SY"
    ],
    "iso_n3": "368"
  },
  {
    "name": "Ireland",
    "code": "IE",
    "capital": "Dublin",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "GB"
    ],
    "iso_n3": "372"
  },
  {
    "name": "Italy",
    "code": "IT",
    "capital": "Rome",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "FR",
      "CH",
      "AT",
      "SI",
      "SM",
      "VA"
    ],
    "iso_n3": "380"
  },
  {
    "name": "Jamaica",
    "code": "JM",
    "capital": "Kingston",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [],
    "iso_n3": "388"
  },
  {
    "name": "Japan",
    "code": "JP",
    "capital": "Tokyo",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [],
    "iso_n3": "392"
  },
  {
    "name": "Jordan",
    "code": "JO",
    "capital": "Amman",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "SY",
      "IQ",
      "SA",
      "PS"
    ],
    "iso_n3": "400"
  },
  {
    "name": "Kazakhstan",
    "code": "KZ",
    "capital": "Astana",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "RU",
      "CN",
      "KG",
      "UZ",
      "TM"
    ],
    "iso_n3": "398"
  },
  {
    "name": "Kenya",
    "code": "KE",
    "capital": "Nairobi",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "ET",
      "SO",
      "TZ",
      "UG",
      "SS"
    ],
    "iso_n3": "404"
  },
  {
    "name": "Kiribati",
    "code": "KI",
    "capital": "Tarawa",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "296"
  },
  {
    "name": "Kuwait",
    "code": "KW",
    "capital": "Kuwait City",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "IQ",
      "SA"
    ],
    "iso_n3": "414"
  },
  {
    "name": "Kyrgyzstan",
    "code": "KG",
    "capital": "Bishkek",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "KZ",
      "CN",
      "TJ",
      "UZ"
    ],
    "iso_n3": "417"
  },
  {
    "name": "Laos",
    "code": "LA",
    "capital": "Vientiane",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CN",
      "VN",
      "KH",
      "TH",
      "MM"
    ],
    "iso_n3": "418"
  },
  {
    "name": "Latvia",
    "code": "LV",
    "capital": "Riga",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "EE",
      "RU",
      "BY",
      "LT"
    ],
    "iso_n3": "428"
  },
  {
    "name": "Lebanon",
    "code": "LB",
    "capital": "Beirut",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "SY"
    ],
    "iso_n3": "422"
  },
  {
    "name": "Lesotho",
    "code": "LS",
    "capital": "Maseru",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "ZA"
    ],
    "iso_n3": "426"
  },
  {
    "name": "Liberia",
    "code": "LR",
    "capital": "Monrovia",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "SL",
      "GN",
      "CI"
    ],
    "iso_n3": "430"
  },
  {
    "name": "Libya",
    "code": "LY",
    "capital": "Tripoli",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "TN",
      "DZ",
      "NE",
      "TD",
      "SD",
      "EG"
    ],
    "iso_n3": "434"
  },
  {
    "name": "Liechtenstein",
    "code": "LI",
    "capital": "Vaduz",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "CH",
      "AT"
    ],
    "iso_n3": "438"
  },
  {
    "name": "Lithuania",
    "code": "LT",
    "capital": "Vilnius",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "LV",
      "BY",
      "PL",
      "RU"
    ],
    "iso_n3": "440"
  },
  {
    "name": "Luxembourg",
    "code": "LU",
    "capital": "Luxembourg",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "BE",
      "DE",
      "FR"
    ],
    "iso_n3": "442"
  },
  {
    "name": "Madagascar",
    "code": "MG",
    "capital": "Antananarivo",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [],
    "iso_n3": "450"
  },
  {
    "name": "Malawi",
    "code": "MW",
    "capital": "Lilongwe",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "TZ",
      "MZ",
      "ZM"
    ],
    "iso_n3": "454"
  },
  {
    "name": "Malaysia",
    "code": "MY",
    "capital": "Kuala Lumpur",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "TH",
      "ID",
      "BN"
    ],
    "iso_n3": "458"
  },
  {
    "name": "Maldives",
    "code": "MV",
    "capital": "Malé",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "462"
  },
  {
    "name": "Mali",
    "code": "ML",
    "capital": "Bamako",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "DZ",
      "NE",
      "BF",
      "CI",
      "GN",
      "SN",
      "MR"
    ],
    "iso_n3": "466"
  },
  {
    "name": "Malta",
    "code": "MT",
    "capital": "Valletta",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "470"
  },
  {
    "name": "Marshall Islands",
    "code": "MH",
    "capital": "Majuro",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "584"
  },
  {
    "name": "Mauritania",
    "code": "MR",
    "capital": "Nouakchott",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "DZ",
      "ML",
      "SN",
      "EH"
    ],
    "iso_n3": "478"
  },
  {
    "name": "Mauritius",
    "code": "MU",
    "capital": "Port Louis",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "480"
  },
  {
    "name": "Mexico",
    "code": "MX",
    "capital": "Mexico City",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "US",
      "GT",
      "BZ"
    ],
    "iso_n3": "484"
  },
  {
    "name": "Micronesia",
    "code": "FM",
    "capital": "Palikir",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "583"
  },
  {
    "name": "Moldova",
    "code": "MD",
    "capital": "Chișinău",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "RO",
      "UA"
    ],
    "iso_n3": "498"
  },
  {
    "name": "Monaco",
    "code": "MC",
    "capital": "Monaco",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "FR"
    ],
    "iso_n3": "492"
  },
  {
    "name": "Mongolia",
    "code": "MN",
    "capital": "Ulaanbaatar",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "RU",
      "CN"
    ],
    "iso_n3": "496"
  },
  {
    "name": "Montenegro",
    "code": "ME",
    "capital": "Podgorica",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "HR",
      "BA",
      "RS",
      "AL"
    ],
    "iso_n3": "499"
  },
  {
    "name": "Morocco",
    "code": "MA",
    "capital": "Rabat",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "DZ",
      "EH"
    ],
    "iso_n3": "504"
  },
  {
    "name": "Mozambique",
    "code": "MZ",
    "capital": "Maputo",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "TZ",
      "MW",
      "ZM",
      "ZW",
      "ZA",
      "SZ"
    ],
    "iso_n3": "508"
  },
  {
    "name": "Myanmar",
    "code": "MM",
    "capital": "Naypyidaw",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "IN",
      "BD",
      "CN",
      "LA",
      "TH"
    ],
    "iso_n3": "104"
  },
  {
    "name": "Namibia",
    "code": "NA",
    "capital": "Windhoek",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "ZM",
      "AO",
      "BW",
      "ZA"
    ],
    "iso_n3": "516"
  },
  {
    "name": "Nauru",
    "code": "NR",
    "capital": "Yaren",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "520"
  },
  {
    "name": "Nepal",
    "code": "NP",
    "capital": "Kathmandu",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CN",
      "IN"
    ],
    "iso_n3": "524"
  },
  {
    "name": "Netherlands",
    "code": "NL",
    "capital": "Amsterdam",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "DE",
      "BE"
    ],
    "iso_n3": "528"
  },
  {
    "name": "New Zealand",
    "code": "NZ",
    "capital": "Wellington",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [],
    "iso_n3": "554"
  },
  {
    "name": "Nicaragua",
    "code": "NI",
    "capital": "Managua",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "HN",
      "CR"
    ],
    "iso_n3": "558"
  },
  {
    "name": "Niger",
    "code": "NE",
    "capital": "Niamey",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "DZ",
      "LY",
      "TD",
      "NG",
      "BJ",
      "BF",
      "ML"
    ],
    "iso_n3": "562"
  },
  {
    "name": "Nigeria",
    "code": "NG",
    "capital": "Abuja",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "BJ",
      "NE",
      "TD",
      "CM"
    ],
    "iso_n3": "566"
  },
  {
    "name": "North Korea",
    "code": "KP",
    "capital": "Pyongyang",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "CN",
      "RU",
      "KR"
    ],
    "iso_n3": "408"
  },
  {
    "name": "North Macedonia",
    "code": "MK",
    "capital": "Skopje",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "RS",
      "BG",
      "GR",
      "AL"
    ],
    "iso_n3": "807"
  },
  {
    "name": "Norway",
    "code": "NO",
    "capital": "Oslo",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "SE",
      "FI",
      "RU"
    ],
    "iso_n3": "578"
  },
  {
    "name": "Oman",
    "code": "OM",
    "capital": "Muscat",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "SA",
      "AE",
      "YE"
    ],
    "iso_n3": "512"
  },
  {
    "name": "Pakistan",
    "code": "PK",
    "capital": "Islamabad",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "IN",
      "CN",
      "AF",
      "IR"
    ],
    "iso_n3": "586"
  },
  {
    "name": "Palau",
    "code": "PW",
    "capital": "Ngerulmud",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "585"
  },
  {
    "name": "Palestine",
    "code": "PS",
    "capital": "Al Quds",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 1,
    "neighbors": [
      "EG",
      "JO"
    ],
    "iso_n3": "275"
  },
  {
    "name": "Panama",
    "code": "PA",
    "capital": "Panama City",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CR",
      "CO"
    ],
    "iso_n3": "591"
  },
  {
    "name": "Papua New Guinea",
    "code": "PG",
    "capital": "Port Moresby",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "ID"
    ],
    "iso_n3": "598"
  },
  {
    "name": "Paraguay",
    "code": "PY",
    "capital": "Asunción",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "AR",
      "BR",
      "BO"
    ],
    "iso_n3": "600"
  },
  {
    "name": "Peru",
    "code": "PE",
    "capital": "Lima",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "EC",
      "CO",
      "BR",
      "BO",
      "CL"
    ],
    "iso_n3": "604"
  },
  {
    "name": "Philippines",
    "code": "PH",
    "capital": "Manila",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [],
    "iso_n3": "608"
  },
  {
    "name": "Poland",
    "code": "PL",
    "capital": "Warsaw",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "DE",
      "CZ",
      "SK",
      "UA",
      "BY",
      "LT",
      "RU"
    ],
    "iso_n3": "616"
  },
  {
    "name": "Portugal",
    "code": "PT",
    "capital": "Lisbon",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "ES"
    ],
    "iso_n3": "620"
  },
  {
    "name": "Qatar",
    "code": "QA",
    "capital": "Doha",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "SA"
    ],
    "iso_n3": "634"
  },
  {
    "name": "Republic of the Congo",
    "code": "CG",
    "capital": "Brazzaville",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "GA",
      "CM",
      "CF",
      "CD",
      "AO"
    ],
    "iso_n3": "178"
  },
  {
    "name": "Romania",
    "code": "RO",
    "capital": "Bucharest",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "UA",
      "MD",
      "BG",
      "RS",
      "HU"
    ],
    "iso_n3": "642"
  },
  {
    "name": "Russia",
    "code": "RU",
    "capital": "Moscow",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "NO",
      "FI",
      "EE",
      "LV",
      "LT",
      "PL",
      "BY",
      "UA",
      "GE",
      "AZ",
      "KZ",
      "MN",
      "CN",
      "KP"
    ],
    "iso_n3": "643"
  },
  {
    "name": "Rwanda",
    "code": "RW",
    "capital": "Kigali",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "UG",
      "TZ",
      "BI",
      "CD"
    ],
    "iso_n3": "646"
  },
  {
    "name": "Saint Kitts and Nevis",
    "code": "KN",
    "capital": "Basseterre",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "659"
  },
  {
    "name": "Saint Lucia",
    "code": "LC",
    "capital": "Castries",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "662"
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "code": "VC",
    "capital": "Kingstown",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "670"
  },
  {
    "name": "Samoa",
    "code": "WS",
    "capital": "Apia",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "882"
  },
  {
    "name": "San Marino",
    "code": "SM",
    "capital": "San Marino",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 5,
    "neighbors": [
      "IT"
    ],
    "iso_n3": "674"
  },
  {
    "name": "Sao Tome and Principe",
    "code": "ST",
    "capital": "São Tomé",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "678"
  },
  {
    "name": "Saudi Arabia",
    "code": "SA",
    "capital": "Riyadh",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 1,
    "neighbors": [
      "JO",
      "IQ",
      "KW",
      "QA",
      "AE",
      "OM",
      "YE"
    ],
    "iso_n3": "682"
  },
  {
    "name": "Senegal",
    "code": "SN",
    "capital": "Dakar",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "MR",
      "ML",
      "GN",
      "GW",
      "GM"
    ],
    "iso_n3": "686"
  },
  {
    "name": "Serbia",
    "code": "RS",
    "capital": "Belgrade",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "HU",
      "RO",
      "BG",
      "MK",
      "AL",
      "ME",
      "BA",
      "HR"
    ],
    "iso_n3": "688"
  },
  {
    "name": "Seychelles",
    "code": "SC",
    "capital": "Victoria",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "690"
  },
  {
    "name": "Sierra Leone",
    "code": "SL",
    "capital": "Freetown",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "GN",
      "LR"
    ],
    "iso_n3": "694"
  },
  {
    "name": "Singapore",
    "code": "SG",
    "capital": "Singapore",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [],
    "iso_n3": "702"
  },
  {
    "name": "Slovakia",
    "code": "SK",
    "capital": "Bratislava",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CZ",
      "PL",
      "UA",
      "HU",
      "AT"
    ],
    "iso_n3": "703"
  },
  {
    "name": "Slovenia",
    "code": "SI",
    "capital": "Ljubljana",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "IT",
      "AT",
      "HU",
      "HR"
    ],
    "iso_n3": "705"
  },
  {
    "name": "Solomon Islands",
    "code": "SB",
    "capital": "Honiara",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "090"
  },
  {
    "name": "Somalia",
    "code": "SO",
    "capital": "Mogadishu",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "DJ",
      "ET",
      "KE"
    ],
    "iso_n3": "706"
  },
  {
    "name": "South Africa",
    "code": "ZA",
    "capital": "Pretoria",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "NA",
      "BW",
      "ZW",
      "MZ",
      "SZ",
      "LS"
    ],
    "iso_n3": "710"
  },
  {
    "name": "South Korea",
    "code": "KR",
    "capital": "Seoul",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "KP"
    ],
    "iso_n3": "410"
  },
  {
    "name": "South Sudan",
    "code": "SS",
    "capital": "Juba",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "SD",
      "ET",
      "KE",
      "UG",
      "CD",
      "CF"
    ],
    "iso_n3": "728"
  },
  {
    "name": "Spain",
    "code": "ES",
    "capital": "Madrid",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "PT",
      "FR",
      "AD"
    ],
    "iso_n3": "724"
  },
  {
    "name": "Sri Lanka",
    "code": "LK",
    "capital": "Sri Jayawardenepura Kotte",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [],
    "iso_n3": "144"
  },
  {
    "name": "Sudan",
    "code": "SD",
    "capital": "Khartoum",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "EG",
      "LY",
      "TD",
      "CF",
      "SS",
      "ET",
      "ER"
    ],
    "iso_n3": "736"
  },
  {
    "name": "Suriname",
    "code": "SR",
    "capital": "Paramaribo",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "GY",
      "BR"
    ],
    "iso_n3": "740"
  },
  {
    "name": "Sweden",
    "code": "SE",
    "capital": "Stockholm",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "NO",
      "FI"
    ],
    "iso_n3": "752"
  },
  {
    "name": "Switzerland",
    "code": "CH",
    "capital": "Bern",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "DE",
      "FR",
      "IT",
      "AT",
      "LI"
    ],
    "iso_n3": "756"
  },
  {
    "name": "Syria",
    "code": "SY",
    "capital": "Damascus",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "TR",
      "IQ",
      "JO",
      "LB"
    ],
    "iso_n3": "760"
  },
  {
    "name": "Tajikistan",
    "code": "TJ",
    "capital": "Dushanbe",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "KG",
      "CN",
      "AF",
      "UZ"
    ],
    "iso_n3": "762"
  },
  {
    "name": "Tanzania",
    "code": "TZ",
    "capital": "Dodoma",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "KE",
      "UG",
      "RW",
      "BI",
      "CD",
      "ZM",
      "MW",
      "MZ"
    ],
    "iso_n3": "834"
  },
  {
    "name": "Thailand",
    "code": "TH",
    "capital": "Bangkok",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "MM",
      "LA",
      "KH",
      "MY"
    ],
    "iso_n3": "764"
  },
  {
    "name": "Timor-Leste",
    "code": "TL",
    "capital": "Dili",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "ID"
    ],
    "iso_n3": "626"
  },
  {
    "name": "Togo",
    "code": "TG",
    "capital": "Lomé",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "GH",
      "BJ",
      "BF"
    ],
    "iso_n3": "768"
  },
  {
    "name": "Tonga",
    "code": "TO",
    "capital": "Nuku'alofa",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 4,
    "neighbors": [],
    "iso_n3": "776"
  },
  {
    "name": "Trinidad and Tobago",
    "code": "TT",
    "capital": "Port of Spain",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "780"
  },
  {
    "name": "Tunisia",
    "code": "TN",
    "capital": "Tunis",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "DZ",
      "LY"
    ],
    "iso_n3": "788"
  },
  {
    "name": "Türkiye",
    "code": "TR",
    "capital": "Ankara",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 1,
    "neighbors": [
      "GR",
      "BG",
      "GE",
      "AM",
      "AZ",
      "IR",
      "IQ",
      "SY"
    ],
    "iso_n3": "792"
  },
  {
    "name": "Turkmenistan",
    "code": "TM",
    "capital": "Ashgabat",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [
      "KZ",
      "UZ",
      "AF",
      "IR"
    ],
    "iso_n3": "795"
  },
  {
    "name": "Tuvalu",
    "code": "TV",
    "capital": "Funafuti",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 5,
    "neighbors": [],
    "iso_n3": "798"
  },
  {
    "name": "Uganda",
    "code": "UG",
    "capital": "Kampala",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "KE",
      "SS",
      "CD",
      "RW",
      "TZ"
    ],
    "iso_n3": "800"
  },
  {
    "name": "Ukraine",
    "code": "UA",
    "capital": "Kyiv",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "PL",
      "SK",
      "HU",
      "RO",
      "MD",
      "RU",
      "BY"
    ],
    "iso_n3": "804"
  },
  {
    "name": "United Arab Emirates",
    "code": "AE",
    "capital": "Abu Dhabi",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "SA",
      "OM"
    ],
    "iso_n3": "784"
  },
  {
    "name": "United Kingdom",
    "code": "GB",
    "capital": "London",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "IE"
    ],
    "iso_n3": "826"
  },
  {
    "name": "United States",
    "code": "US",
    "capital": "Washington, D.C.",
    "continent": "North America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "CA",
      "MX"
    ],
    "iso_n3": "840"
  },
  {
    "name": "Uruguay",
    "code": "UY",
    "capital": "Montevideo",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "AR",
      "BR"
    ],
    "iso_n3": "858"
  },
  {
    "name": "Uzbekistan",
    "code": "UZ",
    "capital": "Tashkent",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "KZ",
      "TM",
      "AF",
      "TJ",
      "KG"
    ],
    "iso_n3": "860"
  },
  {
    "name": "Vanuatu",
    "code": "VU",
    "capital": "Port Vila",
    "continent": "Oceania",
    "middleEast": false,
    "difficulty": 3,
    "neighbors": [],
    "iso_n3": "548"
  },
  {
    "name": "Vatican City",
    "code": "VA",
    "capital": "Vatican City",
    "continent": "Europe",
    "middleEast": false,
    "difficulty": 5,
    "neighbors": [
      "IT"
    ],
    "iso_n3": "336"
  },
  {
    "name": "Venezuela",
    "code": "VE",
    "capital": "Caracas",
    "continent": "South America",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "CO",
      "BR",
      "GY"
    ],
    "iso_n3": "862"
  },
  {
    "name": "Vietnam",
    "code": "VN",
    "capital": "Hanoi",
    "continent": "Asia",
    "middleEast": false,
    "difficulty": 1,
    "neighbors": [
      "CN",
      "LA",
      "KH"
    ],
    "iso_n3": "704"
  },
  {
    "name": "Yemen",
    "code": "YE",
    "capital": "Sana'a",
    "continent": "Asia",
    "middleEast": true,
    "difficulty": 2,
    "neighbors": [
      "SA",
      "OM"
    ],
    "iso_n3": "887"
  },
  {
    "name": "Zambia",
    "code": "ZM",
    "capital": "Lusaka",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "CD",
      "TZ",
      "MW",
      "MZ",
      "ZW",
      "BW",
      "NA",
      "AO"
    ],
    "iso_n3": "894"
  },
  {
    "name": "Zimbabwe",
    "code": "ZW",
    "capital": "Harare",
    "continent": "Africa",
    "middleEast": false,
    "difficulty": 2,
    "neighbors": [
      "ZA",
      "BW",
      "ZM",
      "MZ"
    ],
    "iso_n3": "716"
  }
]
;

if (typeof window !== 'undefined') { window.COUNTRIES = COUNTRIES; }
