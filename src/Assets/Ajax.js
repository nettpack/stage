import {BaseComponent} from "./BaseComponent"
import {App} from "./Application"

class Ajax extends BaseComponent {

	initial() {
		super.initial();
		this.createSaga("ajax", this.sagaAjax);
	}

	sagaAjax(action) {
		console.log('sagaAjax');
	}

}
App.addComponent("Ajax", Ajax);