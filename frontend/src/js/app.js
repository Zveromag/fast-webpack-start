import { customTrigger, isMobile } from './utils';

import {createApp} from 'vue';
import Validator from 'form-validation-plugin';
import config from './utils/config';


Validator.i18n = config.validator.i18n;
