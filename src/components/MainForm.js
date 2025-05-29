import  { useState, useEffect } from "react";
import { saveHistory } from "../utils/contactUtils";

const MainForm = ({ setContactHistory, setYourContacts }) => {
  const [countryCode, setCountryCode] = useState("91");
  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [qrLink, setQrLink] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map of country calling codes
  const countryCallingCodes = {
    AF: "93", // Afghanistan
    AL: "355", // Albania
    DZ: "213", // Algeria
    AS: "1-684", // American Samoa
    AD: "376", // Andorra
    AO: "244", // Angola
    AI: "1-264", // Anguilla
    AQ: "672", // Antarctica
    AG: "1-268", // Antigua and Barbuda
    AR: "54", // Argentina
    AM: "374", // Armenia
    AW: "297", // Aruba
    AU: "61", // Australia
    AT: "43", // Austria
    AZ: "994", // Azerbaijan
    BS: "1-242", // Bahamas
    BH: "973", // Bahrain
    BD: "880", // Bangladesh
    BB: "1-246", // Barbados
    BY: "375", // Belarus
    BE: "32", // Belgium
    BZ: "501", // Belize
    BJ: "229", // Benin
    BM: "1-441", // Bermuda
    BT: "975", // Bhutan
    BO: "591", // Bolivia
    BA: "387", // Bosnia and Herzegovina
    BW: "267", // Botswana
    BR: "55", // Brazil
    IO: "246", // British Indian Ocean Territory
    VG: "1-284", // British Virgin Islands
    BN: "673", // Brunei
    BG: "359", // Bulgaria
    BF: "226", // Burkina Faso
    BI: "257", // Burundi
    KH: "855", // Cambodia
    CM: "237", // Cameroon
    CA: "1", // Canada
    CV: "238", // Cape Verde
    KY: "1-345", // Cayman Islands
    CF: "236", // Central African Republic
    TD: "235", // Chad
    CL: "56", // Chile
    CN: "86", // China
    CX: "61", // Christmas Island
    CC: "61", // Cocos Islands
    CO: "57", // Colombia
    KM: "269", // Comoros
    CK: "682", // Cook Islands
    CR: "506", // Costa Rica
    HR: "385", // Croatia
    CU: "53", // Cuba
    CW: "599", // Curacao
    CY: "357", // Cyprus
    CZ: "420", // Czech Republic
    CD: "243", // Democratic Republic of the Congo
    DK: "45", // Denmark
    DJ: "253", // Djibouti
    DM: "1-767", // Dominica
    DO: "1-809", // Dominican Republic
    TL: "670", // East Timor
    EC: "593", // Ecuador
    EG: "20", // Egypt
    SV: "503", // El Salvador
    GQ: "240", // Equatorial Guinea
    ER: "291", // Eritrea
    EE: "372", // Estonia
    ET: "251", // Ethiopia
    FK: "500", // Falkland Islands
    FO: "298", // Faroe Islands
    FJ: "679", // Fiji
    FI: "358", // Finland
    FR: "33", // France
    PF: "689", // French Polynesia
    GA: "241", // Gabon
    GM: "220", // Gambia
    GE: "995", // Georgia
    DE: "49", // Germany
    GH: "233", // Ghana
    GI: "350", // Gibraltar
    GR: "30", // Greece
    GL: "299", // Greenland
    GD: "1-473", // Grenada
    GU: "1-671", // Guam
    GT: "502", // Guatemala
    GG: "44-1481", // Guernsey
    GN: "224", // Guinea
    GW: "245", // Guinea-Bissau
    GY: "592", // Guyana
    HT: "509", // Haiti
    HN: "504", // Honduras
    HK: "852", // Hong Kong
    HU: "36", // Hungary
    IS: "354", // Iceland
    IN: "91", // India
    ID: "62", // Indonesia
    IR: "98", // Iran
    IQ: "964", // Iraq
    IE: "353", // Ireland
    IM: "44-1624", // Isle of Man
    IL: "972", // Israel
    IT: "39", // Italy
    CI: "225", // Ivory Coast
    JM: "1-876", // Jamaica
    JP: "81", // Japan
    JE: "44-1534", // Jersey
    JO: "962", // Jordan
    KZ: "7", // Kazakhstan
    KE: "254", // Kenya
    KI: "686", // Kiribati
    XK: "383", // Kosovo
    KW: "965", // Kuwait
    KG: "996", // Kyrgyzstan
    LA: "856", // Laos
    LV: "371", // Latvia
    LB: "961", // Lebanon
    LS: "266", // Lesotho
    LR: "231", // Liberia
    LY: "218", // Libya
    LI: "423", // Liechtenstein
    LT: "370", // Lithuania
    LU: "352", // Luxembourg
    MO: "853", // Macau
    MK: "389", // Macedonia
    MG: "261", // Madagascar
    MW: "265", // Malawi
    MY: "60", // Malaysia
    MV: "960", // Maldives
    ML: "223", // Mali
    MT: "356", // Malta
    MH: "692", // Marshall Islands
    MR: "222", // Mauritania
    MU: "230", // Mauritius
    YT: "262", // Mayotte
    MX: "52", // Mexico
    FM: "691", // Micronesia
    MD: "373", // Moldova
    MC: "377", // Monaco
    MN: "976", // Mongolia
    ME: "382", // Montenegro
    MS: "1-664", // Montserrat
    MA: "212", // Morocco
    MZ: "258", // Mozambique
    MM: "95", // Myanmar
    NA: "264", // Namibia
    NR: "674", // Nauru
    NP: "977", // Nepal
    NL: "31", // Netherlands
    AN: "599", // Netherlands Antilles
    NC: "687", // New Caledonia
    NZ: "64", // New Zealand
    NI: "505", // Nicaragua
    NE: "227", // Niger
    NG: "234", // Nigeria
    NU: "683", // Niue
    KP: "850", // North Korea
    MP: "1-670", // Northern Mariana Islands
    NO: "47", // Norway
    OM: "968", // Oman
    PK: "92", // Pakistan
    PW: "680", // Palau
    PS: "970", // Palestine
    PA: "507", // Panama
    PG: "675", // Papua New Guinea
    PY: "595", // Paraguay
    PE: "51", // Peru
    PH: "63", // Philippines
    PN: "64", // Pitcairn
    PL: "48", // Poland
    PT: "351", // Portugal
    PR: "1-787", // Puerto Rico
    QA: "974", // Qatar
    CG: "242", // Republic of the Congo
    RE: "262", // Reunion
    RO: "40", // Romania
    RU: "7", // Russia
    RW: "250", // Rwanda
    BL: "590", // Saint Barthelemy
    SH: "290", // Saint Helena
    KN: "1-869", // Saint Kitts and Nevis
    LC: "1-758", // Saint Lucia
    MF: "590", // Saint Martin
    PM: "508", // Saint Pierre and Miquelon
    VC: "1-784", // Saint Vincent and the Grenadines
    WS: "685", // Samoa
    SM: "378", // San Marino
    ST: "239", // Sao Tome and Principe
    SA: "966", // Saudi Arabia
    SN: "221", // Senegal
    RS: "381", // Serbia
    SC: "248", // Seychelles
    SL: "232", // Sierra Leone
    SG: "65", // Singapore
    SX: "1-721", // Sint Maarten
    SK: "421", // Slovakia
    SI: "386", // Slovenia
    SB: "677", // Solomon Islands
    SO: "252", // Somalia
    ZA: "27", // South Africa
    KR: "82", // South Korea
    SS: "211", // South Sudan
    ES: "34", // Spain
    LK: "94", // Sri Lanka
    SD: "249", // Sudan
    SR: "597", // Suriname
    SJ: "47", // Svalbard and Jan Mayen
    SZ: "268", // Swaziland
    SE: "46", // Sweden
    CH: "41", // Switzerland
    SY: "963", // Syria
    TW: "886", // Taiwan
    TJ: "992", // Tajikistan
    TZ: "255", // Tanzania
    TH: "66", // Thailand
    TG: "228", // Togo
    TK: "690", // Tokelau
    TO: "676", // Tonga
    TT: "1-868", // Trinidad and Tobago
    TN: "216", // Tunisia
    TR: "90", // Turkey
    TM: "993", // Turkmenistan
    TC: "1-649", // Turks and Caicos Islands
    TV: "688", // Tuvalu
    VI: "1-340", // U.S. Virgin Islands
    UG: "256", // Uganda
    UA: "380", // Ukraine
    AE: "971", // United Arab Emirates
    GB: "44", // United Kingdom
    US: "1", // United States
    UY: "598", // Uruguay
    UZ: "998", // Uzbekistan
    VU: "678", // Vanuatu
    VA: "379", // Vatican
    VE: "58", // Venezuela
    VN: "84", // Vietnam
    WF: "681", // Wallis and Futuna
    EH: "212", // Western Sahara
    YE: "967", // Yemen
    ZM: "260", // Zambia
    ZW: "263", // Zimbabwe
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://api.first.org/data/v1/countries");
        const data = await response.json();

        if (data.status === "OK") {
          // Transform the data into an array of objects with country code, name, and calling code
          const countriesArray = Object.entries(data.data).map(
            ([code, details]) => ({
              code,
              name: details.country,
              region: details.region,
              callingCode: countryCallingCodes[code] || "",
            })
          );

          // Sort countries by name
          countriesArray.sort((a, b) => a.name.localeCompare(b.name));

          setCountries(countriesArray);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryCode = (event) => {
    setCountryCode(event.target.value);
  };

  function now() {
    const now = new Date();
    const formattedString = `Contacted on: ${now.toUTCString()}`;
    return formattedString;
  }

  const validatePhoneNumber = (number) => {
    const phoneRegex =
      /^1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    return phoneRegex.test(number) && number.length === 10;
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    const phoneNumber = value.replace(/[^0-9]/g, "");
    setNumber(phoneNumber);
    if (validatePhoneNumber(phoneNumber)) {
      setValidNumber(true);
      setQrLink(
        `https://api.whatsapp.com/send/?phone=${countryCode}${phoneNumber}&text&type=phone_number&app_absent=0`
      );
    } else {
      setValidNumber(false);
      setQrLink("");
    }
  };

  const saveContact = () => {
    // [ {name:"name1",number:723487236},...]
    let phoneNumber = countryCode + number;
    let savedContacts = localStorage.getItem("savedContacts");
    let savedContactsArray = savedContacts ? JSON.parse(savedContacts) : [];
    let nameExists = savedContactsArray.some(
      (contact) => contact.name === name
    );
    let numberExists = savedContactsArray.some(
      (contact) => contact.number === phoneNumber
    );

    if (nameExists || numberExists) {
      setError(true);
    } else {
      setError(false);
      savedContactsArray.push({
        name: name,
        number: countryCode + number,
      });
      localStorage.setItem("savedContacts", JSON.stringify(savedContactsArray));

      const historyArray = JSON.parse(localStorage.getItem("history"));
      for (let i = 0; i < historyArray.length; i++) {
        let number = historyArray[i].number;
        const found = savedContactsArray.find(
          (contact) => contact.number === number
        );
        if (found) {
          historyArray[i].name = found.name;
        }
      }
      localStorage.setItem("history", JSON.stringify(historyArray));
      setContactHistory(JSON.parse(localStorage.getItem("history")));
    }
    setYourContacts(savedContactsArray);
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <i className="bi bi-whatsapp text-green-600 mr-2"></i>
        WhatsApp Direct Chat
      </h2>
      <p className="text-gray-600 mb-4">
        Enter a phone number to start chatting without saving the contact
      </p>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:pr-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="country-select"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Select Country
              </label>
              {loading ? (
                <div className="flex items-center p-2 border border-gray-300 rounded-lg bg-gray-50">
                  <i className="bi bi-arrow-repeat animate-spin mr-2 text-gray-500"></i>
                  <p className="text-sm text-gray-500">Loading countries...</p>
                </div>
              ) : (
                <select
                  id="country-select"
                  onChange={handleCountryCode}
                  value={countryCode}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white shadow-sm"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option
                      key={country.code}
                      value={country.callingCode || country.code}
                    >
                      {country.name} (+{country.callingCode || country.code})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="hidden sm:block">
              {validNumber ? (
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <p className="text-sm text-green-700 mb-2 font-medium">
                    Scan QR Code to Chat
                  </p>
                  <img
                    className="w-full p-1 rounded-lg shadow-sm bg-white"
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrLink}&size=720x720`}
                    alt="WhatsApp QR Code"
                  />
                </div>
              ) : (
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <i className="bi bi-qr-code text-4xl text-gray-400 mb-2 block"></i>
                  <p className="text-gray-600">
                    Enter valid number to get QR Code
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Scan with your phone camera to chat instantly
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="phone-input"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Phone Number
              </label>
              <div className="flex">
                <div className="bg-gray-100 border border-gray-300 rounded-l-lg p-3 flex items-center justify-center min-w-[60px]">
                  +{countryCode}
                </div>
                <input
                  id="phone-input"
                  onChange={handleOnChange}
                  value={number}
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  placeholder="Enter 10-digit phone number"
                />
              </div>
              {number && !validNumber && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid 10-digit phone number
                </p>
              )}
            </div>

            <a
              onClick={() => {
                if (validNumber) {
                  saveHistory(countryCode + number, now());
                  setContactHistory(
                    JSON.parse(localStorage.getItem("history"))
                  );
                }
              }}
              rel="noreferrer"
              target="_blank"
              href={validNumber ? `http://wa.me/${countryCode + number}` : "#"}
              className={`flex items-center justify-center py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300 ${
                validNumber
                  ? "hover:from-green-600 hover:to-green-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <i className="bi bi-whatsapp text-xl mr-2"></i>
              Chat on WhatsApp
            </a>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <label
                htmlFor="name-input"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Save Contact (Optional)
              </label>
              <input
                id="name-input"
                onChange={(event) => {
                  setName(event.target.value);
                  setError(false);
                }}
                value={name}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                placeholder="Enter name to save this contact"
              />
              <button
                onClick={saveContact}
                disabled={!validNumber || !name}
                className={`w-full mt-3 py-3 px-4 flex items-center justify-center bg-gray-50 border border-green-500 text-green-600 font-medium rounded-lg hover:bg-green-50 transition duration-300 ${
                  validNumber && name ? "" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <i className="bi bi-person-plus mr-2"></i>
                Save as Contact
              </button>
              {error && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <i className="bi bi-exclamation-circle mr-1"></i>
                  This name or number already exists in your contacts
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
