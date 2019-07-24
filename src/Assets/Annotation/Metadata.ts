export class Metadata {

	private type;
	private key:string|boolean=false;
	private target:number|boolean=false;
	private parameters: Object;

	/**
	 * @param {string | undefined} key
	 * @param {number | undefined} descriptor
	 */
	public constructor(type:string, key:string|undefined, target:number|undefined, parameters: Object)
	{
		this.type = type;
		if(typeof key !== "undefined"){
			this.key = key;
		}
		if(typeof target !== "undefined"){
			this.target = target;
		}
		this.parameters = parameters;
	}

	/**
	 * @return {boolean}
	 */
	public isMethod():boolean
	{
		return !this.key && this.target !== false || this.key && this.target !== false
	}

	/**
	 * @return {boolean}
	 */
	public isClass():boolean
	{
		return !this.key && this.target === false;
	}

	/**
	 * @return {boolean}
	 */
	public isProperty():boolean
	{
		return this.key !== false && this.target === false;
	}

	/**
	 * @return {string | boolean}
	 */
	public getPropertyName()
	{
		return this.isProperty() ? this.key : false
	}

	/**
	 * @return {string | boolean}
	 */
	public getMethodName()
	{
		return this.isMethod() ? (this.key ? this.key : 'constructor') : false
	}

	/**
	 * @return {number | boolean | boolean}
	 */
	public getTarget()
	{
		return this.isMethod() ? this.target : false
	}

	/**
	 * @return {string}
	 */
	public getType():string
	{
		return this.type
	}

	/**
	 * @return {{}}
	 */
	public getParameters():Object
	{
		return this.parameters
	}

	/**
	 * @param {*} name
	 */
	public getParameter(name)
	{
		return this.parameters[name]
	}


}
