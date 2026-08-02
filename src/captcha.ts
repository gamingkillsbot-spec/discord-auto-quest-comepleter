import { Constants } from './constants';
import { CaptchaDataFromRequest } from './interface';
import { YesCaptchaSolver } from './providers/yescaptcha';
import { Utils } from './utils';

let yesCaptchaClient: YesCaptchaSolver | null = null;

if (process.env.YES_CAPTCHA_API_KEY) {
	console.log('YesCaptcha API key found. Captcha solving is enabled.');
	yesCaptchaClient = new YesCaptchaSolver(process.env.YES_CAPTCHA_API_KEY);
}

export function solveCaptcha(data: CaptchaDataFromRequest): Promise<string> {
	// ! its ok
	// return Utils.askQuestion("Enter the Captcha Key manually: ");
	// todo: implement captcha solving using 3rd party services like yescaptcha
	// ! The error rate of Yescaptcha with Discord is extremely high (as already mentioned in the documentation). Do not use it, as it consistently returns error 10008.
	if (yesCaptchaClient) {
		return yesCaptchaClient
			.hcaptcha(data.captcha_sitekey, 'https://discord.com', {
				rqdata: data.captcha_rqdata,
				isInvisible: false,
				userAgent: Constants.USER_AGENT,
			})
			.then((result) => result.gRecaptchaResponse);
	}
	return Promise.reject(new Error('Captcha solving not implemented yet.'));
}
