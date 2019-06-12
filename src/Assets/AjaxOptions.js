export function AjaxOptions(option) {
	let defaultOption = {
		url: '',
		type: 'GET',
		dataType: 'json',
		data: false,
		contentType: false,
		processData : false,
		success: function () {}
	};


	return Object.assign({}, defaultOption, option);
}


