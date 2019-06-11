export class Action {

	constructor(action = {
		module: "",
		presenter: undefined,
		action: undefined
	}) {
		this.module = action.module;
		this.presenter = action.presenter;
		this.action = action.action;
		this.sagas = action.sagas;
		this.snippetSagas = action.snippetSagas;
	}

	/**
	 * @return {string}
	 */
	getType() {
		return this.module + ":" + this.presenter + ":" + this.action;
	}

}
