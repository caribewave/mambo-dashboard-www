import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import enLocaleData from './en';

// Enable EN
addLocaleData([...en]);

export default {"intl": enLocaleData};