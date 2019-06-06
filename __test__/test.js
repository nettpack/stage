import {Stage} from '../src/Assets/main';
import {BaseComponent} from '../src/Assets/main';
import {expect} from 'chai';

describe('StageSys testing', function() {
	it('addComponent', function() {
		const stage = new Stage();
		expect(stage.addComponent('test', TestComponent)).to.instanceOf(TestComponent);
	});
	it('getComponents', function() {
		const stage = new Stage();
		stage.addComponent('test', TestComponent)
		const newInstance = new TestComponent(stage);
		const components = {'test': newInstance};
		expect(stage.getComponents()).to.eql(components);
	});
	it('getComponentByName', function() {
		const stage = new Stage();
		stage.addComponent('test', TestComponent)
		const newInstance = new TestComponent(stage);
		expect(stage.getComponentByName('test')).to.eql(newInstance);
	});
	it('build', function() {
		const stage = new Stage();
		stage.addComponent('test', TestComponent)
		expect(stage.build()).to.eql(true);

	});
	it('run', function() {
		const stage = new Stage();
		stage.addComponent('test', TestComponent)
		expect(stage.run()).to.eql(true);
	});
});



export class TestComponent extends BaseComponent {

	constructor(Stage){
		super(Stage);
	}


}
