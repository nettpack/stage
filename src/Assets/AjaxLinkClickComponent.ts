if (module.hot) {
	module.hot.accept();
}

import {BaseComponent} from "./BaseComponent.ts"
import {App} from "./Application.ts"
import {AjaxOptions} from "./AjaxOptions";
import {createUrlFromElement} from "./Utils";
import {SAGA_CLICK_AJAX_REQUEST_STARTED} from "./types";
import {Saga} from "./Annotation/Saga.ts"

class AjaxLinkClickComponent extends BaseComponent {

	initial() {
		super.initial();
	}


	@Saga(SAGA_CLICK_AJAX_REQUEST_STARTED)
	public clickSaga(action) {
		const {element, event}  = action.payload;
		if (!element.is("a")) {
			return
		}
		event.preventDefault();
		let defaultOption = AjaxOptions({});
		AjaxLinkClickComponent.runAjaxFromElement(element, defaultOption, event);
	}


	/**
	 * @param {jQuery} el
	 * @param {*} option
	 * @param {Event} e
	 */
	private static runAjaxFromElement(el, option, e) {
		e.preventDefault();
		let url = createUrlFromElement(el);
		option.url = url.toString();
		$.ajax(option);
	};

}
App.addComponent("AjaxLinkClickComponent", AjaxLinkClickComponent);
