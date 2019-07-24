import "reflect-metadata";
import {Metadata} from "./Metadata.ts";
import {MetadataKeys} from "./MetadataKeys.ts";

export function Saga(type: string){
	return (target: any, key: string, descriptor?) => {
		let metadata = new Metadata(MetadataKeys.Saga, key, descriptor, {type: type});
		if(typeof target === "function"){
			target = target.prototype;
		}
		let result = Reflect.getMetadata(MetadataKeys.Saga, target) || [];
		result.push(metadata);
		Reflect.defineMetadata(MetadataKeys.Saga, result, target);
	}
}
