import {BasePageComponent} from "./BasePageComponent";
import {BaseGlobalComponent} from "./BaseGlobalComponent";

export class Stage {

	/**
	 * @param {{}} Config
	 */
	constructor(Config) {
		this.globalComponents = {};
		this.pageComponents = {};
		this.config = Object.assign({
			module: undefined,
			control: undefined,
			action: undefined,
		}, Config);
	}

	/**
	 * @param {string} name
	 * @param {BaseGlobalComponent} object
	 * @return {BaseGlobalComponent}
	 */
	addGlobalComponent(name, object) {
		const newObject = new object(this);
		if (!newObject instanceof BaseGlobalComponent) {
			throw "Component is not instance of Stage BaseComponent!";
		}
		this.globalComponents[name] = newObject;

		return this.globalComponents[name];
	}

	/**
	 * @return {{}}
	 */
	getGlobalComponents() {
		return this.globalComponents;
	}

	/**
	 * @param {string} componentName
	 * @return {BaseGlobalComponent}
	 */
	getGlobalComponentByName(componentName) {
		return this.globalComponents[componentName];
	}

	/**
	 * @param {string} name
	 * @param {BasePageComponent} object
	 * @param {string} module
	 * @param {string} control
	 * @param {string} action
	 * @return {BasePageComponent}
	 */
	addPageComponent(name, object, module, control, action) {

		if (!module || !control || !action) {
			throw "module, control, action must be specified!";
		}

		const newObject = new object(this, module, control, action);
		if (!newObject instanceof BasePageComponent) {
			throw "Component is not instance of Stage BasePageComponent!";
		}
		this.pageComponents[name] = newObject;

		return this.pageComponents[name];
	}

	/**
	 * @return {{}}
	 */
	getPageComponents() {
		return this.pageComponents;
	}

	/**
	 * @param {string} componentName
	 * @return {BasePageComponent}
	 */
	getPageComponentByName(componentName) {
		return this.pageComponents[componentName];
	}

	getPageComponentsByAction(module, control, action) {
		let currentPageComponents = [];
		for (let i in this.pageComponents) {
			const component = this.pageComponents[i];
			if (component.module === module && component.control === control && component.action === action) {
				currentPageComponents.push({
					'name': i,
					'component': component
				});
			}
		}
		return currentPageComponents;
	}

	/**
	 * @return {boolean}
	 */
	build() {
		for (let component in this.globalComponents) {
			this.globalComponents[component].onBuild();
		}

		return true;
	}

	/**
	 * @return {boolean}
	 */
	run() {
		for (let component in this.globalComponents) {
			this.globalComponents[component].onStartup();
		}

		const listCurrentPageComponents = this.getPageComponentsByAction(this.config.module, this.config.control, this.config.action);
		for (let currentPageComponent of listCurrentPageComponents) {
			currentPageComponent['component'].run();
		}

		return true;
	}

}

