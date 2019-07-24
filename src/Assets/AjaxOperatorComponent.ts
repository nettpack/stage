import {SAGA_CLICK_AJAX_REQUEST_STARTED} from "./types";

if (module.hot) {
	module.hot.accept();
}

import {BaseComponent} from "./BaseComponent.ts"
import {App} from "./Application.ts"


class AjaxOperatorComponent extends BaseComponent {

	initial() {
		super.initial();
		this.installAjaxListener();
	}

	installAjaxListener() {

		const the = this;
		$(document).on('click', '.ajax', function (event) {
			the.app.store.dispatch({
				type: SAGA_CLICK_AJAX_REQUEST_STARTED,
				payload: {
					element: $(this),
					event: event
				}
			})

		});
	}
}
App.addComponent("AjaxOperatorComponent", AjaxOperatorComponent);
