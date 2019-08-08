if (module.hot) {
	module.hot.accept();
}

import {SAGA_AJAX_RESPONSE_STARTED, SAGA_REDRAW_SNIPPET} from "./types";
import {BaseComponent} from "./BaseComponent.ts"
import {Saga} from "./Annotation/Saga.ts"
import {App} from "./Application.ts"
import {Action as ActionObject} from "./Action.ts"

class AjaxListenerComponent extends BaseComponent {

	initial() {
		super.initial();
		this.listenerOnAjax();
	}

	@Saga(SAGA_AJAX_RESPONSE_STARTED)
	public sagaAjax(action) {
		try {
			const {Action} = action.payload;

			if (Action.data.snippets) {
				let snippetSagas = [];
				if (Action.snippetSagas) {
					snippetSagas = Action.snippetSagas;
				}
				this.redrawSnippets(Action, snippetSagas);
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


	private redrawSnippets(Action, snippetSagas) {
		const payload = Action.data;

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
				let content = $(document).find('#' + snippetName).html(snippetContent);
				App.store.dispatch({
					type: SAGA_REDRAW_SNIPPET,
					payload: { // tady budou paloady
						snippetName: snippetName,
						content : content,
						response: payload
					}
				});
			}
		}
	}

	@Saga(SAGA_REDRAW_SNIPPET)
	public runAction(action) {
		const {snippetName, content, response} = action.payload;
		const Action = new ActionObject(response.nettpack.action);
		Action.data = Object.assign({}, response, {snippetName, content});
		Action.ajax = true;
		this.app.runAction(Action);
	}

	private listenerOnAjax() {
		let Send = XMLHttpRequest.prototype.send;
		const the = this;

		XMLHttpRequest.prototype.send = function() {
			this.addEventListener('load', function () {
				let response = JSON.parse(this.response);
				if (response.redirect) {
					window.location.replace(response.redirect);
				}

				/** DISABLE HOT RELOAD AJAX REQUEST */
				if (!response.nettpack) {
					return
				}

				const Action = new ActionObject(response.nettpack.action);
				Action.data = response;
				Action.ajax = true;
				// the.app.runAction(Action);
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
