export interface Serialize<Serialized> {
	serialize(): Serialized;
}

export interface Serializer<Deserialized, Serialized> {
	deserialize(bytes: Serialized): Deserialized;
}
