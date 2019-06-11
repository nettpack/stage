export class Action {

	constructor(action = {
		module: "",
		presenter: undefined,
		action: undefined
	}) {
		this.module = action.module;
		this.presenter = action.presenter;
		this.action = action.action;
	}

	/**
	 * @return {string}
	 */
	getType() {
		return this.module + ":" + this.presenter + ":" + this.action;
	}

}