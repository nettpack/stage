export class Action {

	public module: "";
	public presenter: undefined;
	public action: undefined;
	public sagas: undefined;
	public sagasParameters: [];
	public snippetSagas: undefined;
	public data: undefined;
	public ajax: false;

	constructor(action) {
		this.module = action.module;
		this.presenter = action.presenter;
		this.action = action.action;
		this.sagas = action.sagas;
		this.sagasParameters = action.sagasParameters;
		this.snippetSagas = action.snippetSagas;
		this.data = action.data;
		this.ajax = action.ajax;
	}

	/**
	 * @return {string}
	 */
	public getType() {
		return this.module + ":" + this.presenter + ":" + this.action;
	}

}
