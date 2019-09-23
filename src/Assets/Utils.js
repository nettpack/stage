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

/**
 *
 * @param {FormData} formData
 * @param {string} name
 * @param value
 */
export function addSagasParameter(formData, name, value) {

	let sagasParameters = formData.get('sagasParameters');
	if (sagasParameters && typeof sagasParameters === 'string') {
		sagasParameters = JSON.parse(sagasParameters);
		sagasParameters.push({
			name: name,
			value: value
		});
		formData.append('sagasParameters', JSON.stringify(sagasParameters));
	} else {
		formData.append('sagasParameters', JSON.stringify([{
			name: name,
			value: value
		}]));
	}
}



