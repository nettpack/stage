import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { fork, takeLatest } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga';
import {Action} from './Action.ts';
import "reflect-metadata";
import {MetadataKeys} from './Annotation/MetadataKeys';

class Application{

	/**
	 * @type {Store}
	 */
	private store;

	public runned = false;

	private components: any = {};

	private reducer: any = {
		app: (state = {}, action) => {return state}
	};

	private sagas: Array<any> = [];

	private _hot: any = {};

	private middlewares: any = {};

	public getStore() {
		if (!this.runned) {
			throw new Error('App is not initialized!');
		}

		return this.store;
	}

	/**
	 * @param {string} name
	 * @param {function} middleware
	 */
	public addMiddleware(name, middleware) {
		this.middlewares[name] = middleware;
	}

	/**
	 * @param {string} name
	 * @param control
	 */
	public addComponent(name, control) {
		this.components[name] = {
			name: name,
			component: control,
			instance: undefined,
		};
	}

	/**
	 * @return {{}}
	 */
	public getComponents() {
		return this.components;
	}

	/**
	 * @param {function} reducer
	 */
	private addReducer(name, reducer) {
		this.reducer[name] = reducer;
	}

	/**
	 * @param {function} saga
	 */
	private addSaga(type, saga, object) {
		this.sagas.push({
			type: type,
			saga: saga,
			object: object,
		});
	}

	public run() {

		let components = [];

		/**
		 * Initialize components
		 */
		for (let name in this.components) {
			let data = this.components[name];
			const component = data.component;
			components.push(component)
			let metadataSaga = Reflect.getMetadata(MetadataKeys.Saga, component.prototype);

			if(typeof metadataSaga !== "undefined") {
				metadataSaga.forEach((meta) => {
					if (!meta.isMethod()) {
						return;
					}

					this.addSaga(meta.getParameter('type'), meta.getTarget().value, component.prototype);
				});
			}

			let metadataReducer = Reflect.getMetadata(MetadataKeys.Reducer, component.prototype);

			if(typeof metadataReducer !== "undefined") {
				metadataReducer.forEach((meta) => {
					if (!meta.isMethod()) {
						return;
					}


					this.addReducer(meta.getParameter('type'), meta.getTarget().value);
				});
			}
		}

		const rootSaga = this.registerSagas();
		this.registerStore(rootSaga);

		for (let comp of components) {
			comp.prototype.instance = new comp(App);
		}

		window.addEventListener('load', () => {
			this.runAction(this._getRequestAction());
		});

		this.runned = true;
	}


	/**
	 * @return {rootSaga}
	 */
	private registerSagas() {
		const sagasList = [];
		for (let data of this.sagas) {
			let latest = function * () {
				yield takeLatest(data.type, function () {
					let  wrapped = data.object;
					if (typeof wrapped.instance !== "undefined") {
						wrapped = wrapped.instance;
					}
					data.saga.call(wrapped, ...arguments)
				});
			};
			sagasList.push(latest);
		}
		return function *rootSaga() {
			let sagas = [];
			for (let saga of sagasList) {
				sagas.push(yield fork(saga))
			}
			yield sagas;
		}
	}

	/**
	 * @param rootSaga
	 */
	private registerStore(rootSaga) {
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
	}

	/**
	 * @param {Action} action
	 */
	public runAction(action) {
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
	private _getRequestAction() {
		const {action} = window.nettpack;
		return new Action(action);
	}
}

export let App = new Application();

window.stage = {
	app: App
};

declare global {
	interface Window {
		nettpack: any;
		stage: any;
	}
}
