export interface Serialize<T> {
	toBackend(): T;
}
