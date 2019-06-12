/**
 * @param element
 * @return {URL|void}
 */
export function createUrlFromElement(element) {
	let url_string = '';
	if (element instanceof $) {
		if (element.length > 0 && element.is('a')) {
			url_string = element.attr('href');
		} else {
			return console.error('jquery object is empty or not select <A> link');
		}
	} else if (!element) {
		url_string = document.URL;
	}

	url_string = validateUrl(url_string);

	return new URL(url_string);
}

/**
 * @param {string} url_string
 * @return {*}
 */
export function validateUrl(url_string) {
	let pat = /^https?:\/\//i;
	if (!pat.test(url_string))
	{
		let a = document.createElement('a');
		a.href = url_string;
		url_string = a.href;
	}

	return url_string;
}
