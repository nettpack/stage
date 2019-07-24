import {App} from './Application.ts'

export class BaseComponent{

	/**
	 * @type {App}
	 */
	protected app: App;

	/**
	 * @param {App} App
	 */
	constructor(App) {
		this.app = App;
		this.initial();
	}

	protected initial() {
	}

}

