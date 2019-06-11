export function AjaxOptions(option) {
	let defaultOption = {
		type: 'GET',
		dataType: 'json',
		handle: '',
		url: '',
		data : false,
		async : true,
		success : function (){},
		onAjax : [],
		onSuccess : function (){},
		actionsOnSuccess : [],
		onError : function (){},
		beforeExecuteSnippets : function (){},
		afterExecuteSnippets : function (){},
		beforeRedraw : function (){},
		actionsAfterExecuteSnippets : [],
		inProcess : function (){},
		error : function (){},
	};

	return Object.assign({}, defaultOption, option);
}


