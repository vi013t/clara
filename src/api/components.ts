import type { Component } from "svelte";
import type { SVGAttributes } from "svelte/elements";

export type IconProps = { stroke: string } & SVGAttributes<EventTarget>;
export type Icon = Component<IconProps>;
