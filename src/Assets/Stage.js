import {BaseComponent} from "./BaseComponent";

export class Stage {

	constructor() {
		this.components = {}
	}

	/**
	 * @param {string} name
	 * @param {BaseComponent} object
	 * @return {BaseComponent}
	 */
	addComponent(name, object) {
		const newObject = new object(this);
		if (!newObject instanceof BaseComponent) {
			throw "Component is not instance of Stage BaseComponent!";
		}
		this.components[name] = newObject;

		return this.components[name];
	}

	/**
	 * @return {{}}
	 */
	getComponents() {
		return this.components;
	}

	/**
	 * @param {string} componentName
	 * @return {*}
	 */
	getComponentByName(componentName) {
		return this.components[componentName];
	}

	/**
	 * @return {boolean}
	 */
	build() {
		for (let component in this.components) {
			this.components[component].onBuild();
		}

		return true;
	}

	/**
	 * @return {boolean}
	 */
	run() {
		for (let component in this.components) {
			this.components[component].onStartup();
		}

		return true;
	}

}

