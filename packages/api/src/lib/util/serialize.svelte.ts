export interface Serialize<Serialized> {
	serialize(): Serialized;
}

export interface Serializer<Frontend extends Serialize<Backend>, Backend> {
	deserialize(bytes: Backend): Frontend;
}

export type Serialized<T extends Serialize<any>> = T extends Serialize<infer O> ? O : never;
export type Deserialized<T extends Serializer<any, any>> = T extends Serializer<infer D, any> ? D : never;
