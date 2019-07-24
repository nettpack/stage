import "reflect-metadata";
import {Metadata} from "./Metadata";
import {MetadataKeys} from "./MetadataKeys";

export function Reducer(type: string){
	return (target: any, key: string, descriptor?) => {
		let metadata = new Metadata(MetadataKeys.Reducer, key, descriptor, {type: type});
		if(typeof target === "function"){
			target = target.prototype;
		}
		let result = Reflect.getMetadata(MetadataKeys.Reducer,target) || [];
		result.push(metadata);
		Reflect.defineMetadata(MetadataKeys.Reducer, result, target);
	}
}
