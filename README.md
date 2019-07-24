## NettPack - staging

##### Nettpack staging is package for creating node components into Nette project.

Required
 - [@nettpack/core](https://www.npmjs.com/package/@nettpack/core)


#### How to use:

- First copy and paste content ./src/Config/stageJs.neon.dist into your config.neon in Nette project

- Now use trait NettPack\Stage\Application\NettPackTrait into your base presenter file.
	````php
	use NettpackTrait;
	````
- In layout.latte use this in head tag
	````latte
	{control nettpackLoader}
	````

- In layout.latte use this in body tag on bottom line
	````latte
	{control nettpackControl}
	````

#### How to use Application js class:

- now you must study [@nettpack/core](https://www.npmjs.com/package/@nettpack/core) line "example module (each module is webpack.config.js)" and search in webpack.config.js entry : {app: []} Entry point of this application.js like this:
	````javascript
	if (module.hot) {
		module.hot.accept();
	}
	import {App} from "Stage";
	
	function importAll (r) {
		r.keys().forEach(r);
	}
	importAll(require.context('../', true, /\.(js|css|less|png|gif)$/));
	
	$(document).ready(function () {
		App.run();
	});
	````

- now you must study [@nettpack/core](https://www.npmjs.com/package/@nettpack/core) line "How to insert another vendor package files into build collection"

- Now you can create ComponentClass with sagas like this:
	````javascript
	if (module.hot) {
		module.hot.accept();
	}
	
	import {App, BaseComponent, SAGA_REDRAW_SNIPPET, Saga, Reducer} from "Stage"
	
	class TestControlComponent extends BaseComponent {
	
		initial() {
			super.initial();
			this.installPlugins();
		}
	
		@Saga(SAGA_REDRAW_SNIPPET)
		public installPlugins(action = null){
			let target = document;
			if (action) {
				const {content} = action.payload;
				if (content) {
					target = content
				}
			}
		}
	}
	App.addComponent("TestControlComponent", TestControlComponent);
	````
	- Function initial start after App start function run();
	- Annotation @Saga('TYPE_NAME')
		- TYPE_NAME name of event
		- function which may be run after event fire(to this action has been insert parameter action, this is Action object /vendor/nettpack/stage/src/Assets/Action.js)
		- SAGA_REDRAW_SNIPPET - fire after redraw snippet action
		
- If you want run saga onAnchor your component, you can use phpAnnotation.

	 ````php
	 use NettPack\Stage\Annotations as NP;
 
	 /**
	  * @NP\NettPack(snippetSagas={
	  *     @NP\SnippetSaga(saga="SAGA_MY_COMPONENT", snippet="snippet--my-component")
	  * })
	  */
	 class MyComponent extends Control
	 {
	 }
	 ````
	 
	 - After redrawControl my-component fire saga event SAGA_MY_COMPONENT and callback which has been on this event set
	````javascript
	@Saga('SAGA_MY_COMPONENT')
	public myFunction(action) {}
	````
- If you want after Ajax action run another saga. To request data or parameters place parameter 'saga' and value 'name_of_saga_may_be_run_after_response'
	````javascript
	const formData = new FormData(form[0]);
	formData.append('saga','name_of_saga_may_be_run_after_response');
	$.ajax({
		type: 'POST',
		url: form[0].action ,
		data: formData,	
	});
	````

#### Reducers

-  BaseComponent contains function createReducer

	- Reducer is for change current state in store inside your application thanks listening on sagas events.


- Reducer example:
````javascript
@Reducer('TEST')
public testReducer(state = {
       	myObject: {
       		A: undefined,
       		B: undefined,
       	}
       }, action) {
       	switch (action.type) {
       		// Listening on TEST_SAGA and save new State from payload
       		case 'TEST_SAGA': {
       			const myObject = action.payload.myObject;
       			return Object.assign({}, state, {
       				myObject,
       			});
       		}
       		default: {
       
       			return state;
       		}
       	}
       }
````

- And from App you can this reducer call 
````javascript
App.getStore().dispatch({
	type: 'TEST_SAGA',
	payload: {
		myObject: {
			A: "TEST_A",
			B: "TEST_B",
		}
	},
});
		
````

- In devTools in your browser adminMode you can see 'prev state' and 'next state' change inside Test object (my testReducer):

![DevTools](src/DOC/devTools.PNG?raw=true)
