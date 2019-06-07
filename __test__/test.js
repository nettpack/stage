import {Stage} from '../src/Assets/main';
import {BaseGlobalComponent} from '../src/Assets/main';
import {BasePageComponent} from '../src/Assets/main';
import {expect} from 'chai';

describe('StageSys testing', function() {
	it('addComponent', function() {
		const stage = new Stage();
		expect(stage.addGlobalComponent('test', TestGlobalComponent)).to.instanceOf(TestGlobalComponent);
	});
	it('getComponents', function() {
		const stage = new Stage({});
		stage.addGlobalComponent('test', TestGlobalComponent)
		const newInstance = new TestGlobalComponent(stage);
		const components = {'test': newInstance};
		expect(stage.getGlobalComponents()).to.eql(components);
	});
	it('getComponentByName', function() {
		const stage = new Stage({});
		stage.addGlobalComponent('test', TestGlobalComponent)
		const newInstance = new TestGlobalComponent(stage);
		expect(stage.getGlobalComponentByName('test')).to.eql(newInstance);
	});
	it('build', function() {
		const stage = new Stage({});
		stage.addGlobalComponent('test', TestGlobalComponent)
		expect(stage.build()).to.eql(true);

	});
	it('run', function() {
		const stage = new Stage({});
		stage.addGlobalComponent('test', TestGlobalComponent)
		expect(stage.run()).to.eql(true);
	});


	it('addPageComponent', function() {
		const stage = new Stage({
			module: 'admin',
			control: 'control',
			action: 'action',
		});
		expect(stage.addPageComponent('test', TestPageComponent, 'admin', 'control', 'action')).to.instanceOf(TestPageComponent);
	});

	it('getPageComponents', function() {
		const stage = new Stage({
			module: 'admin',
			control: 'control',
			action: 'action',
		});
		stage.addPageComponent('test', TestPageComponent, 'admin', 'control', 'action')
		const newInstance = new TestPageComponent(stage, 'admin', 'control', 'action');
		const components = {'test': newInstance};
		expect(stage.getPageComponents()).to.eql(components);
	});

	it('getPageComponentByName', function() {
		const stage = new Stage({});
		stage.addPageComponent('test', TestPageComponent, 'admin', 'control', 'action');
		const newInstance = new TestPageComponent(stage, 'admin', 'control', 'action');
		expect(stage.getPageComponentByName('test')).to.eql(newInstance);
	});

	it('getPageComponentsByAction', function() {
		const stage = new Stage({});
		stage.addPageComponent('test', TestPageComponent, 'admin', 'control', 'action');
		const newInstance = new TestPageComponent(stage, 'admin', 'control', 'action');
		expect(stage.getPageComponentsByAction('admin', 'control', 'action')).to.eql([{
			'name': 'test',
			'component': newInstance
		}]);
	});
});



export class TestGlobalComponent extends BaseGlobalComponent {

	constructor(Stage){
		super(Stage);
	}
}

export class TestPageComponent extends BasePageComponent {

	run() {
		super.run();
		console.log('RUN')
	}
}

