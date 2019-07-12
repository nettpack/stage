import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { fork, takeLatest } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga';
import { Action } from './Action';

class Application{

	constructor() {
		/**
		 * @type {Store}
		 */
		this.store = undefined;
		/**
		 * @type {{BaseComponent}}
		 */
		this.components = {};
		this.reducer = {
			app: (state = {}, action) => {return state}
		};
		this.sagas = [];
		this._hot = {};
		this.middlewares = {};
	}

	addMiddleware(name, middleware) {
		this.middlewares[name] = middleware;
	}

	/**
	 * @param {string} name
	 * @param control
	 */
	addComponent(name, control) {
		this.components[name] = {
			name: name,
			component: control,
			instance: undefined,
		};
	}

	/**
	 * @return {{}}
	 */
	getComponents() {
		return this.components;
	}

	/**
	 * @param {function} reducer
	 */
	addReducer(name, reducer) {
		this.reducer[name] = reducer;
	}

	/**
	 * @param {function} saga
	 */
	addSaga(type, saga, object) {
		this.sagas.push({
			type: type,
			saga: saga,
			object: object,
		});
	}

	run() {
		/**
		 * Initialize components
		 */
		for (let name in this.components) {
			let data = this.components[name];
			const component = data.component;
			data.instance = new component(this);
		}

		/**
		 * Create root sagas
		 */
		const sagasList = [];
		for (let data of this.sagas) {
			let latest = function * () {
				yield takeLatest(data.type, function () {
					data.saga.call(data.object, ...arguments)
				});
			};
			sagasList.push(latest);
		}
		function *rootSaga() {
			let sagas = [];
			for (let saga of sagasList) {
				sagas.push(yield fork(saga))
			}
			yield sagas;
		}

		/**
		 * Create store and run middlewarea and run action
		 */
		const rootReducer = combineReducers(this.reducer);



		if (!this.store) {
			this._hot.sagaMiddleware = createSagaMiddleware();
			let middlewares = [
				this._hot.sagaMiddleware
			];

			if (process.env.NODE_ENV === "development") {
				middlewares.push( createLogger());
			}

			for (let name in this.middlewares) {
				const middleware = this.middlewares[name];
				middlewares.push(middleware);
			}

			this.store = createStore(rootReducer, {}, compose(
				applyMiddleware(...middlewares)
			));

			this._hot.sagaTask = this._hot.sagaMiddleware.run(rootSaga);
		}

		if (module.hot) {
			this.store.replaceReducer(rootReducer);
			this._hot.sagaTask.cancel();
			this._hot.sagaTask.toPromise().then(() => {
				this._hot.sagaTask = this._hot.sagaMiddleware.run(rootSaga);
				let loaded = this._hot.appLoaded || false;
				if (loaded) {
					this.runAction(this._getRequestAction())
				}
			});
			this.sagas = [];
		}
		window.addEventListener('load', () => {
			this.runAction(this._getRequestAction())
		});
	}

	/**
	 * @param {Action} action
	 */
	runAction(action) {
		this._hot.appLoaded = true;
		this.store.dispatch({
			type: action.getType(),
			payload: action,
		});
	}

	/**
	 * @return {Action}
	 * @private
	 */
	_getRequestAction() {
		//TODO: on ajax
		const {action} = window.nettpack;
		return new Action(action);
	}

}
export let App = new Application();
