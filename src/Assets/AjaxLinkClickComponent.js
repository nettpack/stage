if (module.hot) {
	module.hot.accept();
}

import {BaseComponent} from "./BaseComponent"
import {App} from "./Application"
import {AjaxOptions} from "./AjaxOptions";
import {createUrlFromElement} from "./Utils";
import {SAGA_CLICK_AJAX_REQUEST_STARTED} from "./types";

class AjaxLinkClickComponent extends BaseComponent {

	initial() {
		super.initial();
		this.createSaga(SAGA_CLICK_AJAX_REQUEST_STARTED, this.clickSaga);
	}

	clickSaga(action) {
		const {element, event}  = action.payload;
		if (!element.is("a")) {
			return
		}
		event.preventDefault();
		let defaultOption = AjaxOptions({});
		this.runAjaxFromElement(element, defaultOption, event);
	}


	/**
	 * @param {jQuery} el
	 * @param {*} option
	 * @param {Event} e
	 */
	runAjaxFromElement(el, option, e) {
		e.preventDefault();
		let url = createUrlFromElement(el);
		option.url = url.toString();
		$.ajax(option);
	};

}
App.addComponent("AjaxLinkClickComponent", AjaxLinkClickComponent);
