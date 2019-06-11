if (module.hot) {
	module.hot.accept();
}

import {BaseComponent} from "./BaseComponent"
import {App} from "./Application"
import * as $ from 'jquery';
import {AjaxOptions} from "./AjaxOptions";
import 'bootstrap/js/src/modal';

let privateObject = {
	timeOut: undefined
};

export const SAGA_AJAX_REQUEST_STARTED = 'SAGA_AJAX_REQUEST_STARTED';

class AjaxComponent extends BaseComponent {

	initial() {
		super.initial();
		this.createSaga(SAGA_AJAX_REQUEST_STARTED, this.sagaAjax);
		this.createSaga('modal_saga', this.sagaModal);
		this.installAjaxListener();
		this.listenerOnAjax();
	}


	sagaModal(action) {

		try {
			const {payload} = action;
			const {content, snippetName, response} = payload;

			const {modal} = response;

			if (content) {
				let source = $(document).find('#' + snippetName);

				let sourceModalContent = source.find('.modal-dialog');
				if (sourceModalContent.length > 0) {
					let snippetElement = $(content);
					let modalSnippetId = snippetElement.attr('id');


					for (let modalId in modal) {
						if (modalId == modalSnippetId && modal[modalId].close) {
							return;
						}
					}


					let replaceElement = source.find(".modal#" + modalSnippetId).find(".modal-dialog");
					if (replaceElement.length > 0) {
						replaceElement.html(snippetElement.find(".modal-dialog"));
					} else {
						source.append(snippetElement);
					}
				} else {
					source.html(content);
				}


				let snippetElement = $(content);



				let modalSnippetId = snippetElement.attr('id');



				$('#' + modalSnippetId).modal("show")
			}




		}catch (e) {
			console.error(e)
		}finally {

		}

		console.log('sagaModal',action);
	}

	sagaAjax(action) {

		try {
			const {payload} = action;




			if (payload.snippets) {
				let snippetSagas = [];
				if (payload.nettpack && payload.nettpack.action && payload.nettpack.action.snippetSagas) {
					snippetSagas = payload.nettpack.action.snippetSagas;
				}
				this.redrawSnippets(payload, snippetSagas);
			}

		} catch (e) {

			console.error(e)

		}finally {

		}
	}


	redrawSnippets(payload, snippetSagas) {
		for (let snippetName in payload.snippets) {

			let done = false;
			let snippetContent = payload.snippets[snippetName];

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
			}
		}
	}



	listenerOnAjax() {
		let Send = XMLHttpRequest.prototype.send;
		const App = this.app;

		XMLHttpRequest.prototype.send = function() {
			this.addEventListener('load', function () {
				let response = JSON.parse(this.response)
				App.store.dispatch({
					type: SAGA_AJAX_REQUEST_STARTED,
					payload: response
				})
			});

			Send.apply(this, arguments)

		}
	}

	installAjaxListener() {

		const the = this;
		var defaultOption = AjaxOptions({});
		$(document).on('click', 'a.ajax,button.ajax', function (e) {
			if ($(this).hasClass("confirm") || ($(this).attr("type") == "submit" && $(this).is("button"))) {
				return
			}
			e.preventDefault();
			clearTimeout(privateObject.timeout);
			let element = $(this);
			privateObject.timeout = setTimeout(function () {
				the.runAjaxFromElement(element, defaultOption, e);
			}, 50)
		});
	}

	/**
	 * @param {jQuery} el
	 * @param {*} option
	 * @param {Event} e
	 */
	runAjaxFromElement(el, option, e) {
		e.preventDefault();
		let url = this.createUrlFromElement(el);

		console.log(url)
		option.url = url.toString();
		$.ajax(option);
	};


	/**
	 * @param element
	 * @return {URL|void}
	 */
	createUrlFromElement(element) {
		let url_string = '';
		if (element instanceof $) {
			if (element.length > 0 && element.is('a')) {
				url_string = element.attr('href');
			} else {
				return console.error('jquery object is empty or not select <A> link');
			}
		} else if (!element) {
			url_string = document.URL;
		}

		url_string = this.validateUrl(url_string);

		return new URL(url_string);
	};

	/**
	 * @param {string} url_string
	 * @return {*}
	 */
	validateUrl(url_string) {
		let pat = /^https?:\/\//i;
		if (!pat.test(url_string))
		{
			let a = document.createElement('a');
			a.href = url_string;
			url_string = a.href;
		}

		return url_string;
	}


}

App.addComponent("Ajax", AjaxComponent);
