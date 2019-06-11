export class AppRequest{

	/**
	 * @param {string} type
	 * @param parameters
	 */
	constructor(type, parameters) {
		this.type = type;
		this.parameters = parameters | {};
	}

	/**
	 * @param {string} name
	 * @return {*|null}
	 */
	getParameter(name) {
		if (typeof this.parameters[name] !== "undefined") {
			return this.parameters[name];
		}
		return null;
	}

	/**
	 * @return {{}}
	 */
	getParameters() {
		return this.parameters;
	}

	/**
	 * @return {string}
	 */
	getType() {
		return this.type;
	}

}