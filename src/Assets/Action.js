export class Action {

	constructor(action = {
		module: "",
		presenter: undefined,
		action: undefined,
		sagas: undefined,
		snippetSagas: undefined,
		data: undefined,
		ajax: false,
	}) {
		this.module = action.module;
		this.presenter = action.presenter;
		this.action = action.action;
		this.sagas = action.sagas;
		this.snippetSagas = action.snippetSagas;
		this.data = action.data;
		this.ajax = action.ajax;
	}

	/**
	 * @return {string}
	 */
	getType() {
		return this.module + ":" + this.presenter + ":" + this.action;
	}

}
