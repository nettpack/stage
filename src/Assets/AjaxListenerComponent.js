if (module.hot) {
	module.hot.accept();
}

import {SAGA_AJAX_RESPONSE_STARTED, SAGA_REDRAW_SNIPPET} from "./types";
import {BaseComponent} from "./BaseComponent"
import {App} from "./Application"
import {Action as ActionObject} from "./Action"

class AjaxListenerComponent extends BaseComponent {

	initial() {
		super.initial();
		this.createSaga(SAGA_AJAX_RESPONSE_STARTED, this.sagaAjax);
		this.listenerOnAjax();
	}

	sagaAjax(action) {
		try {
			const {payload} = action;
			const {Action} = payload;

			if (Action.data.snippets) {
				let snippetSagas = [];
				if (Action.snippetSagas) {
					snippetSagas = Action.snippetSagas;
				}
				this.redrawSnippets(Action.data, snippetSagas);
			}

			for (let saga of Action.sagas) {
				App.store.dispatch({
					type: saga,
					payload: {
						Action: Action
					}
				});
			}

		} catch (e) {
			console.error(e)
		}finally {

		}
	}


	redrawSnippets(payload, snippetSagas) {
		for (let snippetName in payload.snippets) {

			let done = false;
			let snippetContent = $(payload.snippets[snippetName]);

			for (let snippetSaga of snippetSagas) {
				if (snippetSaga.snippetName === snippetName) {
					App.store.dispatch({
						type: snippetSaga.name,
						payload: {
							snippetName: snippetName,
							content : snippetContent,
							response: payload
						}
					});
					done = true;
				}
			}

			if (!done) {
				$(document).find('#' + snippetName).html(snippetContent);
				App.store.dispatch({
					type: SAGA_REDRAW_SNIPPET,
					payload: {
						snippetName: snippetName,
						content : snippetContent,
						response: payload
					}
				});
			}
		}
	}

	listenerOnAjax() {
		let Send = XMLHttpRequest.prototype.send;
		const App = this.app;

		XMLHttpRequest.prototype.send = function() {
			this.addEventListener('load', function () {
				let response = JSON.parse(this.response)
				const Action = new ActionObject(response.nettpack.action);
				Action.data = response;
				Action.ajax = true;
				App.runAction(Action);
				App.store.dispatch({
					type: SAGA_AJAX_RESPONSE_STARTED,
					payload: {
						Action: Action
					}
				})
			});
			Send.apply(this, arguments)

		}
	}

}

App.addComponent("AjaxListenerComponent", AjaxListenerComponent);
