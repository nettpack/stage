export class BaseComponent{

	/**
	 * @param {Application} App
	 */
	constructor(App) {
		this.app = App;
		this.initial();
	}

	initial() {

	}

	/**
	 * @param {string} namespace
	 * @param {function} callable
	 */
	createReducer(namespace, callable) {
		this.app.addReducer(namespace, callable);
	}

	/**
	 * @param {string} namespace
	 * @param {function} callable
	 */
	createSaga(namespace, callable) {
		this.app.addSaga(namespace, callable, this);
	}

}