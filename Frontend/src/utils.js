import { enqueueSnackbar } from 'notistack';
import { format } from 'date-fns';


export const SUCCESS = 'success';
export const INFO = 'info';
export const ERROR = 'error';

export const DASHBOARD = 'dashboard';
export const PROFILE = 'profile';
export const NOTIFICATION = 'notification';

export const BLACK = '#3e3e3e';
export const RED = 'red';
export const GREEN = 'green';
export const ORANGE = 'orange';
export const LIGHT_BLUE = '#f3f6fd';
export const LIGHT_RED = '#C83C31';
export const WHITE = '#FFF';
export const LIGHT_YELLOW = '#F2C27F';

export const SESSION_EXPIRED = 'Session Expired. Login to continue';
export const SOMETHING_WENT_WRONG = 'Something went wrong';

export const DELETED = 'Deleted';
export const CONFIRMED = 'Confirmed';
export const CANCELLED_BY_ADMIN = 'Cancelled by Admin';

export const showSnackbar = (message, type) => {
  enqueueSnackbar(`${message}`, {
    variant: `${type}`,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
  });
};

export const geJsDateObject = (date) => {
  var monthsMapping = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  return `${date?.split(' ')[2]}-${monthsMapping[date?.split(' ')[1]]}-${
    date?.split(' ')[0]
  }`;
};
export const titleize = (sentence) => {
  const words = sentence?.replace('_', ' ')?.split(' ');
  for (let i = 0; i < words?.length; i++) {
    words[i] = words[i][0]?.toUpperCase() + words[i]?.substr(1);
  }
  return words?.join(' ');
};

export const priceRound = (value) => {
  return Math.round(value);
};

export const sanitizeText = (value) => {
  return value.replace(/\s+/g, '');
};

export const sanitizeNumber = (value) => {
  return value.replace(/^\d*\.?\d*$/, '');
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "Not Available";
  try {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy, hh:mm a");
  } catch (err) {
    return "Invalid Date";
  }
};

export const holidays = [
  'New Year',
  'Thiruvalluvar Day',
  'Republic Day',
  'Shivaji Jayanti',
  'Maha Shivratri',
  'Holika Dahana',
  'Holi',
  'Good Friday',
  'Mahavir Jayanti',
  'Ugadi (Gudi Padwa)',
  'Ramzan Id/ Eid-ul-Fitar',
  'Ambedkar Jayanti/ Tamil New Year/ Vaisakh',
  'Rama Navami',
  'May Day',
  'Birthday of Rabindranath',
  'Buddha Purnima/Vesak',
  'Guru Purnima',
  'Bakrid/Eid ul-Adha',
  'Independence Day',
  'Raksha Bandhan (Rakhi)',
  'Janmashtami (Smarta)',
  'Onam',
  'Janmashtami',
  'Ganesh Chaturthi / Vinayaka Chaturthi',
  'Milad un-Nabi/ Id-e-Milad',
  'Mahatma Gandhi Jayanti',
  'Ayutha Pooja/ Maha Navami',
  'Dussehra',
  'Karva Chauth',
  'Kannada Rajyothsava',
  'Diwali/Deepavali',
  'Govardhan Puja',
  'Bhau Dooj',
  'Guru Nanak Jayanti',
  'Christmas',
];

export const CountriesList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua & Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia & Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Myanmar/Burma',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominican Republic',
  'Dominica',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Great Britain',
  'Greece',
  'Grenada',
  'Guadeloupe',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Israel and the Occupied Territories',
  'Italy',
  "Ivory Coast (Cote d'Ivoire)",
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kosovo',
  'Kuwait',
  'Kyrgyz Republic (Kyrgyzstan)',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Republic of Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Moldova, Republic of',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Korea, Democratic Republic of (North Korea)',
  'Norway',
  'Oman',
  'Pacific Islands',
  'Pakistan',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  "Saint Vincent's & Grenadines",
  'Samoa',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovak Republic (Slovakia)',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Korea, Republic of (South Korea)',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor Leste',
  'Togo',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks & Caicos Islands',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America (USA)',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (UK)',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

export const BloodGroup = [
  'Not Available',
  'A Positive',
  'A- (A Negative)',
  'B+ (B Positive)',
  'B- (B Negative)',
  'AB+ (AB Positive)',
  'AB- (AB Negative)',
  'O+ (O Positive)',
  'O- (O Negative)',
  'A2+ (A2 Positive)',
  'A1+ (A1 Positive)',
  'A1- (A1 Negative)',
  'A1B- (A1B Negative)',
  'A1B+ (A1B Positive)',
  'A2- (A2 Negative)',
  'A2B+ (A2B Positive)',
  'A2B- (A2B Negative)',
  'B1+ (B1 Positive)',
];

export const MaritalStatus = ['Single', 'Married', 'Widowed', 'Separated'];

export const Gender = ['Male', 'Female', 'PreferNotToRespond'];

export const ok = 'ok';
export const errorType = 'error';
