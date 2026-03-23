import "clsx";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { a2 as attributes, a as attr, a3 as stringify, a4 as attr_style, a5 as attr_class, a6 as clsx, a7 as bind_props, a1 as derived, e as escape_html, a8 as ensure_array_like, a9 as await_block } from "../../chunks/index.js";
import namer from "color-namer";
import { getCurrentWindow } from "@tauri-apps/api/window";
function html(value) {
  var html2 = String(value ?? "");
  var open2 = "<!---->";
  return open2 + html2 + "<!---->";
}
var Debug;
((Debug2) => {
  function logColor(message, url = void 0, severity = "Info", bright = "#b7d2fe", dark = "#33425b") {
    return;
  }
  Debug2.logColor = logColor;
  function errors(errors2) {
    return;
  }
  Debug2.errors = errors;
  function success(message, url) {
    Debug2.logColor(message, url, "Success", "#a6e3a1", "#344532");
  }
  Debug2.success = success;
  function info(message, url) {
    Debug2.logColor(message, url, "Info", "#b7d2fe", "#33425b");
  }
  Debug2.info = info;
  function warn(message, url) {
    Debug2.logColor(message, url, "!! Warning !!", "#f9e2af", "#413c26");
  }
  Debug2.warn = warn;
  function error(message, url) {
    Debug2.logColor(message, url, "!! ERROR !!", "#f38ba8", "#4e3534");
  }
  Debug2.error = error;
  function test(value, message, url, severity = "error") {
    if (!value) {
      if (severity === "error") {
        Debug2.error("Failed check: " + message, url);
      } else {
        Debug2.warn("Failed check: " + message, url);
      }
    } else {
      Debug2.success("Successful check: " + message, url);
    }
  }
  Debug2.test = test;
  function file(url) {
    return /([^\/\\]+)$/.exec(path(url))[1];
  }
  Debug2.file = file;
  function path(url) {
    return /^.+(\/src.+?)(\?|:)/.exec(url)?.[1] ?? url;
  }
  Debug2.path = path;
  function log(...args) {
    return;
  }
  Debug2.log = log;
})(Debug || (Debug = {}));
function todo(task) {
  throw new Error(`Unimplemented task: ${task}`);
}
function BookIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BookIcon
}, Symbol.toStringTag, { value: "Module" }));
function assignedLater() {
  return null;
}
var Objects;
((Objects2) => {
  function mapValues(obj, map) {
    return Object.entries(obj).map(([key, value]) => ({ [key]: map(value) })).reduce((accumulator, current) => ({ ...accumulator, ...current }));
  }
  Objects2.mapValues = mapValues;
  function mapEntries(obj, map) {
    return Object.entries(obj).map(([inputKey, inputValue]) => map(inputKey, inputValue)).reduce((object, [outputKey, outputValue]) => ({ ...object, ...{ [outputKey]: outputValue } }), {});
  }
  Objects2.mapEntries = mapEntries;
})(Objects || (Objects = {}));
class Matrix3x3 {
  values = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  constructor(values) {
    if (values) this.values = values;
  }
  getScale() {
    let [[x, _b, _c], [_d, y, _f], [_g, _h, _i]] = this.values;
    return new Point2D(x, y);
  }
  static identity() {
    return new Matrix3x3();
  }
  times(other) {
    let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
    let [[j, k, l], [m, n, o], [p, q, r]] = other.values;
    return new Matrix3x3([
      [
        a * j + b * m + c * p,
        a * k + b * n + c * q,
        a * l + b * o + c * r
      ],
      [
        d * j + e * m + f * p,
        d * k + e * n + f * q,
        d * l + e * o + f * r
      ],
      [
        g * j + h * m + i * p,
        g * k + h * n + i * q,
        g * l + h * o + i * r
      ]
    ]);
  }
  timesPoint(pointLike) {
    let { x, y } = new Point2D(pointLike);
    let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
    return new Point2D({ x: a * x + b * y + c, y: d * x + e * y + f });
  }
  get inverse() {
    let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
    const invDet = 1 / this.determinant;
    return new Matrix3x3([
      [
        (e * i - f * h) * invDet,
        (c * h - b * i) * invDet,
        (b * f - c * e) * invDet
      ],
      [
        (f * g - d * i) * invDet,
        (a * i - c * g) * invDet,
        (c * d - a * f) * invDet
      ],
      [
        (d * h - e * g) * invDet,
        (b * g - a * h) * invDet,
        (a * e - b * d) * invDet
      ]
    ]);
  }
  get determinant() {
    let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }
  static translation(pointLike) {
    let { x, y } = new Point2D(pointLike);
    return new Matrix3x3([[1, 0, x], [0, 1, y], [0, 0, 1]]);
  }
  static rotation(angle) {
    return new Matrix3x3([
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1]
    ]);
  }
  static scale(point) {
    let { x, y } = new Point2D(typeof point === "object" ? point : [point, point]);
    return new Matrix3x3([[x, 0, 0], [0, y, 0], [0, 0, 1]]);
  }
  get css() {
    const [[a, c, e], [b, d, f], _] = this.values;
    return `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
  }
}
class Point2D {
  x = assignedLater();
  y = assignedLater();
  constructor(x, y) {
    if (typeof x === "object") {
      if (Array.isArray(x)) {
        this.x = x[0];
        this.y = x[1];
      } else {
        this.x = x.x;
        this.y = x.y;
      }
    } else {
      this.x = x;
      this.y = y;
    }
  }
  clone() {
    return new Point2D(this);
  }
  plus(other) {
    let point = new Point2D(other);
    return new Point2D(this.x + point.x, this.y + point.y);
  }
  equals(other) {
    let point = new Point2D(other);
    return this.x == point.x && this.y == point.y;
  }
  moveAwayFrom(point, distance) {
    let center = new Point2D(point);
    let radius = this.distanceTo(center);
    return new Point2D(this.x + distance * (this.x - center.x) / radius, this.y + distance * (this.y - center.y) / radius);
  }
  static average(points) {
    return points.map((point) => new Point2D(point)).reduce((accumulator, current) => accumulator.plus(current), Point2D.origin()).dividedBy(points.length);
  }
  static polar(radius, angle) {
    return new Point2D(radius * Math.cos(angle), radius * Math.sin(angle));
  }
  polar() {
    return {
      radius: this.distanceTo(Point2D.origin()),
      angle: Math.atan(this.y / this.x)
    };
  }
  polarRelativeTo(center) {
    let angle = Math.atan((this.y - center.y) / (this.x - center.x));
    let radius = this.distanceTo(center);
    return { radius, angle };
  }
  static sum(...pointLikes) {
    let points = pointLikes.map((point) => new Point2D(point));
    return points.reduce((total, current) => total.plus(current), Point2D.origin());
  }
  dividedBy(other) {
    let point = typeof other === "object" ? new Point2D(other) : new Point2D([other, other]);
    return new Point2D(this.x / point.x, this.y / point.y);
  }
  distanceTo(other) {
    let point = new Point2D(other);
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
  }
  squared() {
    return this.times(this);
  }
  times(other) {
    let point = new Point2D(other);
    return new Point2D(this.x * point.x, this.y * point.y);
  }
  distanceSquared(other) {
    return Math.pow(this.distanceTo(other), 2);
  }
  minus(other) {
    let point = new Point2D(other);
    return new Point2D(this.x - point.x, this.y - point.y);
  }
  static origin() {
    return new Point2D(0, 0);
  }
}
function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(value, minimum));
}
class Circle {
  radius = assignedLater();
  center = assignedLater();
  constructor(radius, center) {
    this.radius = radius;
    this.center = center;
  }
  clone() {
    return new Circle(this.radius, this.center.clone());
  }
  getConstrainedShift(desiredShift, parent, padding = 0) {
    const [dx, dy] = desiredShift;
    const targetX = this.center.x + dx;
    const targetY = this.center.y + dy;
    const maxSafeDistance = parent.radius - this.radius - padding;
    if (maxSafeDistance <= 0) return [0, 0];
    const distX = targetX - parent.center.x;
    const distY = targetY - parent.center.y;
    const distanceToParentCenter = Math.hypot(distX, distY);
    if (distanceToParentCenter <= maxSafeDistance) {
      return [dx, dy];
    }
    const angle = Math.atan2(distY, distX);
    const constrainedX = parent.center.x + Math.cos(angle) * maxSafeDistance;
    const constrainedY = parent.center.y + Math.sin(angle) * maxSafeDistance;
    return [constrainedX - this.center.x, constrainedY - this.center.y];
  }
  overlaps(other, padding = 0) {
    if (other instanceof Circle) {
      const threshold = this.radius + other.radius - padding;
      return this.center.distanceTo(other.center) < threshold;
    }
    const closest = new Point2D(clamp(this.center.x, other.left, other.right), clamp(this.center.y, other.top, other.bottom));
    const distance = this.center.distanceTo(closest);
    return distance <= this.radius - padding;
  }
  contains(other, padding = 0) {
    const safeRadius = this.radius - padding;
    if (safeRadius < 0) return false;
    if (other instanceof Circle) {
      const distance = this.center.distanceTo(other.center);
      return distance + other.radius <= safeRadius;
    }
    const corners = [
      new Point2D(other.left, other.top),
      new Point2D(other.right, other.top),
      new Point2D(other.left, other.bottom),
      new Point2D(other.right, other.bottom)
    ];
    return corners.every((corner) => this.center.distanceTo(corner) <= safeRadius);
  }
  static unit() {
    return new Circle(0, Point2D.origin());
  }
}
function getPrettyPacking(smallCircles, smallCircleRadius) {
  if (smallCircles <= 0) return { circles: [], parentRadius: 0 };
  if (smallCircles === 1) return {
    circles: [new Point2D({ x: 0, y: 0 })],
    parentRadius: smallCircleRadius
  };
  if (smallCircles === 2) {
    return {
      circles: [
        new Point2D({ x: -smallCircleRadius, y: 0 }),
        new Point2D({ x: smallCircleRadius, y: 0 })
      ],
      parentRadius: 2 * smallCircleRadius
    };
  }
  let bestR = Infinity;
  let bestConfig = null;
  for (let m = smallCircles; m >= 3; m--) {
    const nCore = smallCircles - m;
    const currentR = smallCircleRadius * (1 + 1 / Math.sin(Math.PI / m));
    const dOuter = currentR - smallCircleRadius;
    const rInnerVoid = dOuter - smallCircleRadius;
    if (nCore > 0) {
      const coreResult = getPrettyPacking(nCore, smallCircleRadius);
      if (coreResult.parentRadius <= rInnerVoid + 1e-5) {
        if (currentR < bestR) {
          bestR = currentR;
          bestConfig = { m, coreResult };
        }
      }
    } else {
      if (currentR < bestR) {
        bestR = currentR;
        bestConfig = { m, coreResult: { circles: [], parentRadius: 0 } };
      }
    }
  }
  if (!bestConfig) {
    const m = smallCircles;
    const R = smallCircleRadius * (1 + 1 / Math.sin(Math.PI / m));
    return {
      circles: generateRing(m, R - smallCircleRadius),
      parentRadius: R
    };
  }
  const outerPoints = generateRing(bestConfig.m, bestR - smallCircleRadius);
  return {
    circles: [...outerPoints, ...bestConfig.coreResult.circles],
    parentRadius: bestR
  };
}
function generateRing(m, d) {
  const points = [];
  for (let possibleOuterRingRadius = 0; possibleOuterRingRadius < m; possibleOuterRingRadius++) {
    const angle = possibleOuterRingRadius * 2 * Math.PI / m;
    points.push(new Point2D({ x: d * Math.cos(angle), y: d * Math.sin(angle) }));
  }
  return points;
}
function ArrowIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ArrowIcon
}, Symbol.toStringTag, { value: "Module" }));
function AsexualIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="12" width="20" height="3.5" fill="white"></rect><path d="M2 8.5H22V12H2V8.5Z" fill="#A3A3A3"></path><path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V8.5H2V7Z" fill="#000000"></path><path d="M2 15.5H22V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V15.5Z" fill="#77187B"></path></g></svg>`);
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AsexualIcon
}, Symbol.toStringTag, { value: "Module" }));
function BisexualIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="9.67" width="20" height="4.67" fill="#6D5291"></rect><path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V9.67H2V7Z" fill="#C62B6F"></path><path d="M2 14.34H22V17.01C22 18.1146 21.1046 19.01 20 19.01H4C2.89543 19.01 2 18.1146 2 17.01V14.34Z" fill="#1439A3"></path></g></svg>`);
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BisexualIcon
}, Symbol.toStringTag, { value: "Module" }));
function BlankPageIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      height: "200px",
      width: "200px",
      version: "1.1",
      id: "_x32_",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      viewBox: "0 0 512 512",
      "xml:space": "preserve",
      fill: stroke,
      stroke,
      "stroke-width": "12.8"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g><path class="st0" d="M411.626,0H222.754c-13.552,0-26.56,5.39-36.148,14.969L68.794,132.788 c-9.594,9.587-14.976,22.596-14.976,36.156v296.5c0,25.67,20.892,46.556,46.564,46.556h311.243 c25.664,0,46.556-20.886,46.556-46.556V46.542C458.182,20.878,437.289,0,411.626,0z M206.248,32.349v104.652 c0,11.313-4.402,15.722-15.715,15.722H85.881L206.248,32.349z M431.998,465.444c0,11.237-9.142,20.372-20.372,20.372H100.382 c-11.245,0-20.38-9.135-20.38-20.372V175.998h124.55c13.77,0,24.978-11.207,24.978-24.985V26.184h182.096 c11.23,0,20.372,9.127,20.372,20.358V465.444z"${attr_style("", { fill: stroke })}></path></g></g></svg>`);
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlankPageIcon
}, Symbol.toStringTag, { value: "Module" }));
function BoldIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 1H8.625C11.0412 1 13 2.95875 13 5.375C13 6.08661 12.8301 6.75853 12.5287 7.35243C13.4313 8.15386 14 9.32301 14 10.625C14 13.0412 12.0412 15 9.625 15H2V1ZM5.5 9.75V11.5H9.625C10.1082 11.5 10.5 11.1082 10.5 10.625C10.5 10.1418 10.1082 9.75 9.625 9.75H5.5ZM5.5 6.25H8.625C9.10825 6.25 9.5 5.85825 9.5 5.375C9.5 4.89175 9.10825 4.5 8.625 4.5H5.5V6.25Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BoldIcon
}, Symbol.toStringTag, { value: "Module" }));
function BugIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.47 5.777C6.64843 5.66548 6.82631 5.57017 7.00005 5.48867C7.00341 5.24634 7.03488 5.00375 7.08016 4.76601C7.15702 4.36251 7.31232 3.81288 7.63176 3.25386C8.30808 2.0703 9.63768 1 12 1C14.3623 1 15.6919 2.0703 16.3682 3.25386C16.6877 3.81288 16.843 4.36251 16.9198 4.76601C16.9651 5.00366 16.9966 5.24615 16.9999 5.48839C17.1737 5.56989 17.3516 5.66548 17.53 5.777C18.207 6.20012 18.8425 6.82582 19.2994 7.71927C19.7656 7.53233 20.2282 7.23 20.5429 6.7578C20.7966 6.3773 21 5.82502 21 5C21 4.44772 21.4477 4 22 4C22.5523 4 23 4.44772 23 5C23 6.17498 22.7034 7.1227 22.2071 7.8672C21.5676 8.82639 20.6756 9.34444 19.8991 9.63125C19.9646 10.0513 20 10.5067 20 11V12H22C22.5523 12 23 12.4477 23 13C23 13.5523 22.5523 14 22 14H20V15.5191C19.9891 15.8049 19.9498 16.088 19.9016 16.3697C20.6774 16.6566 21.5683 17.1746 22.2071 18.1328C22.7034 18.8773 23 19.825 23 21C23 21.5523 22.5523 22 22 22C21.4477 22 21 21.5523 21 21C21 20.175 20.7966 19.6227 20.5429 19.2422C20.2401 18.7879 19.8018 18.4912 19.3524 18.3025C19.2288 18.6068 19.0814 18.9213 18.9053 19.237C17.8448 21.1392 15.7816 23 12 23C8.2184 23 6.15524 21.1392 5.09465 19.237C4.91864 18.9213 4.77118 18.6068 4.6476 18.3025C4.19823 18.4912 3.75992 18.7879 3.45705 19.2422C3.20338 19.6227 3 20.175 3 21C3 21.5523 2.55228 22 2 22C1.44772 22 1 21.5523 1 21C1 19.825 1.29662 18.8773 1.79295 18.1328C2.43173 17.1746 3.32255 16.6566 4.09839 16.3697C4.05024 16.0885 4.0127 15.8043 4 15.5191V14H2C1.44772 14 1 13.5523 1 13C1 12.4477 1.44772 12 2 12H4V11C4 10.5067 4.0354 10.0513 4.10086 9.63125C3.3244 9.34444 2.43241 8.82639 1.79295 7.8672C1.29662 7.1227 1 6.17498 1 5C1 4.44772 1.44772 4 2 4C2.55228 4 3 4.44772 3 5C3 5.82502 3.20338 6.3773 3.45705 6.7578C3.77185 7.23 4.2344 7.53233 4.70063 7.71927C5.15748 6.82582 5.79302 6.20012 6.47 5.777ZM14.6318 4.24614C14.7804 4.50632 14.8709 4.77287 14.9251 5H9.07491C9.1291 4.77287 9.21957 4.50632 9.36824 4.24614C9.69192 3.6797 10.3623 3 12 3C13.6377 3 14.3081 3.6797 14.6318 4.24614ZM8.99671 7.00035C8.48495 7.02168 7.96106 7.20358 7.53 7.473C6.84294 7.90241 6 8.81983 6 11V15.4738C6.06537 16.4404 6.37182 17.4207 6.84149 18.263C7.5032 19.4498 8.69637 20.6688 11 20.943V7L8.99671 7.00035ZM13 7V20.943C15.3036 20.6688 16.4968 19.4498 17.1585 18.263C17.6282 17.4206 17.9346 16.4404 18 15.4738V11C18 8.81983 17.1571 7.90241 16.47 7.473C16.0389 7.20358 15.515 7.02168 15.0033 7.00035L13 7Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BugIcon
}, Symbol.toStringTag, { value: "Module" }));
function CalendarIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CalendarIcon
}, Symbol.toStringTag, { value: "Module" }));
function CatIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.0993 10.6602C20.2113 11.9744 19.98 13.5815 19.9801 15C19.9801 18.9062 14.7132 20 12 20C9.28677 20 4.01994 18.9062 4.01994 15C4.01995 13.5815 3.78875 11.9744 4.90066 10.6602M19.0993 10.6602C18.9048 10.4303 18.6692 10.2094 18.384 10M19.0993 10.6602C19.7993 11.0634 19.9781 9.55469 19.9801 9.0625V7.18761C19.9801 5.56261 18.8629 5.00011 17.9053 5.00011C16.9477 5.00011 15.0324 6.5625 14.394 6.5625C13.6279 6.5625 13.4804 6.40636 12 6.40636C10.5197 6.40636 10.3721 6.5625 9.60601 6.5625C8.9676 6.5625 7.05236 5 6.09476 5C5.13715 5 4.01995 5.5625 4.01995 7.1875V9.0625C4.02188 9.55469 4.20072 11.0634 4.90066 10.6602M4.90066 10.6602C5.09519 10.4303 5.33082 10.2094 5.61599 10"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path><path d="M12.8258 16C12.8258 16.1726 12.4647 16.3125 12.0193 16.3125C11.574 16.3125 11.2129 16.1726 11.2129 16C11.2129 15.8274 11.574 15.6875 12.0193 15.6875C12.4647 15.6875 12.8258 15.8274 12.8258 16Z"${attr("stroke", stroke)} stroke-width="1.5"></path><path d="M15.5 13.5938C15.5 14.0252 15.2834 14.375 15.0161 14.375C14.7489 14.375 14.5323 14.0252 14.5323 13.5938C14.5323 13.1623 14.7489 12.8125 15.0161 12.8125C15.2834 12.8125 15.5 13.1623 15.5 13.5938Z"${attr("stroke", stroke)} stroke-width="1.5"></path><path d="M9.5 13.5938C9.5 14.0252 9.28336 14.375 9.01613 14.375C8.74889 14.375 8.53226 14.0252 8.53226 13.5938C8.53226 13.1623 8.74889 12.8125 9.01613 12.8125C9.28336 12.8125 9.5 13.1623 9.5 13.5938Z"${attr("stroke", stroke)} stroke-width="1.5"></path><path d="M22.0004 15.4688C21.5165 15.1562 19.4197 14.375 18.6133 14.375"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path><path d="M20.3871 17.9688C19.9033 17.6562 18.7742 16.875 17.9678 16.875"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path><path d="M2 15.4688C2.48387 15.1562 4.58065 14.375 5.3871 14.375"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path><path d="M3.61279 17.9688C4.09667 17.6562 5.2257 16.875 6.03215 16.875"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path></g></svg>`);
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CatIcon
}, Symbol.toStringTag, { value: "Module" }));
function CharacterCountIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 200 200",
      "data-name": "Layer 1",
      id: "Layer_1",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M158.25,38.5A9.91,9.91,0,0,0,144.75,53c12.5,12,20.5,28.5,20.5,47a64.87,64.87,0,0,1-65,65,10,10,0,0,0,0,20,84.93,84.93,0,0,0,85-85c-.5-24.5-10.5-46-27-61.5ZM34.75,100a64.87,64.87,0,0,1,65-65,10,10,0,0,0,0-20,84.88,84.88,0,0,0-61.5,143.5A9.91,9.91,0,0,0,52.75,145C41.75,133,34.75,117.5,34.75,100Zm85,32a10,10,0,0,0,19.5-4.5l-12-55.5c-2.5-12.5-14-22-27.5-22a28.87,28.87,0,0,0-28,22.5l-12,55.5a10.61,10.61,0,0,0,7.5,12,10.61,10.61,0,0,0,12-7.5l4-19.5h32l4.5,19ZM88.25,92.5,91.75,77a8.66,8.66,0,0,1,17,0l3.5,15.5Z"></path></g></svg>`);
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CharacterCountIcon
}, Symbol.toStringTag, { value: "Module" }));
function CircledPlusIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 32 32",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>plus-circle</title><desc>Created with Sketch Beta.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icon-Set" transform="translate(-464.000000, -1087.000000)"${attr("fill", stroke)}><path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle"></path></g></g></g></svg>`);
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CircledPlusIcon
}, Symbol.toStringTag, { value: "Module" }));
function ClockIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ClockIcon
}, Symbol.toStringTag, { value: "Module" }));
function CloseIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CloseIcon
}, Symbol.toStringTag, { value: "Module" }));
function ColorPaletteIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.022,23a11.053,11.053,0,0,0,10.921-9.5,5.853,5.853,0,0,0-.577-3.5c-1.655-3.146-4.777-2.671-7.056-2.322-1.18.178-2.4.366-2.865-.035A2.416,2.416,0,0,1,12.02,6c0-2.683,0-5-3-5C3.753,1,1,6.534,1,12A11.023,11.023,0,0,0,12.022,23ZM9.016,3c.909,0,1,0,1,3a3.941,3.941,0,0,0,1.122,3.168c1.163,1,2.844.741,4.469.494,2.483-.379,4.061-.482,4.986,1.276a3.844,3.844,0,0,1,.363,2.293A9.024,9.024,0,0,1,3,12C3,8.382,4.6,3,9.016,3ZM5,7.5A1.5,1.5,0,1,1,6.5,9,1.5,1.5,0,0,1,5,7.5ZM4,12a1.5,1.5,0,1,1,1.5,1.5A1.5,1.5,0,0,1,4,12Zm3.5,3A1.5,1.5,0,1,1,6,16.5,1.5,1.5,0,0,1,7.5,15Zm8,3A3.5,3.5,0,1,0,12,14.5,3.5,3.5,0,0,0,15.5,18Zm0-5A1.5,1.5,0,1,1,14,14.5,1.5,1.5,0,0,1,15.5,13Z"></path></g></svg>`);
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ColorPaletteIcon
}, Symbol.toStringTag, { value: "Module" }));
function DashIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 12L21 12"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashIcon
}, Symbol.toStringTag, { value: "Module" }));
function DiceIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>dice [#25]</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-180.000000, -8079.000000)"${attr("fill", stroke)}><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M138,7927.1047 C136.896,7927.1047 136,7927.9997 136,7929.1047 C136,7930.2097 136.896,7931.1047 138,7931.1047 C139.104,7931.1047 140,7930.2097 140,7929.1047 C140,7927.9997 139.104,7927.1047 138,7927.1047 L138,7927.1047 Z M130,7927.1047 C128.896,7927.1047 128,7927.9997 128,7929.1047 C128,7930.2097 128.896,7931.1047 130,7931.1047 C131.104,7931.1047 132,7930.2097 132,7929.1047 C132,7927.9997 131.104,7927.1047 130,7927.1047 L130,7927.1047 Z M142,7921.9997 C142,7921.4477 141.552,7920.9997 141,7920.9997 L127,7920.9997 C126.448,7920.9997 126,7921.4477 126,7921.9997 L126,7935.9997 C126,7936.5527 126.448,7936.9997 127,7936.9997 L141,7936.9997 C141.552,7936.9997 142,7936.5527 142,7935.9997 L142,7921.9997 Z M144,7920.9997 L144,7936.9997 C144,7938.1047 143.104,7938.9997 142,7938.9997 L126,7938.9997 C124.896,7938.9997 124,7938.1047 124,7936.9997 L124,7920.9997 C124,7919.8957 124.896,7918.9997 126,7918.9997 L142,7918.9997 C143.104,7918.9997 144,7919.8957 144,7920.9997 L144,7920.9997 Z M130,7922.1047 C128.896,7922.1047 128,7922.9997 128,7924.1047 C128,7925.2097 128.896,7926.1047 130,7926.1047 C131.104,7926.1047 132,7925.2097 132,7924.1047 C132,7922.9997 131.104,7922.1047 130,7922.1047 L130,7922.1047 Z M130,7932.1047 C128.896,7932.1047 128,7932.9997 128,7934.1047 C128,7935.2097 128.896,7936.1047 130,7936.1047 C131.104,7936.1047 132,7935.2097 132,7934.1047 C132,7932.9997 131.104,7932.1047 130,7932.1047 L130,7932.1047 Z M138,7922.1047 C136.896,7922.1047 136,7922.9997 136,7924.1047 C136,7925.2097 136.896,7926.1047 138,7926.1047 C139.104,7926.1047 140,7925.2097 140,7924.1047 C140,7922.9997 139.104,7922.1047 138,7922.1047 L138,7922.1047 Z M140,7934.1047 C140,7935.2097 139.104,7936.1047 138,7936.1047 C136.896,7936.1047 136,7935.2097 136,7934.1047 C136,7932.9997 136.896,7932.1047 138,7932.1047 C139.104,7932.1047 140,7932.9997 140,7934.1047 L140,7934.1047 Z" id="dice-[#25]"></path></g></g></g></g></svg>`);
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DiceIcon
}, Symbol.toStringTag, { value: "Module" }));
function EllipsisIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 32 32",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ellipsis-filled</title><path d="M19.75 16c0 2.071-1.679 3.75-3.75 3.75s-3.75-1.679-3.75-3.75c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75zM8.75 16c0 2.071-1.679 3.75-3.75 3.75s-3.75-1.679-3.75-3.75c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75zM30.75 16c0 2.071-1.679 3.75-3.75 3.75s-3.75-1.679-3.75-3.75c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75z"></path></g></svg>`);
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EllipsisIcon
}, Symbol.toStringTag, { value: "Module" }));
function EyeIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EyeIcon
}, Symbol.toStringTag, { value: "Module" }));
function FichteanCurveIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<div${attributes({ ...attributes$1 }, "svelte-1k9rl4p", void 0, {
    width: `${stringify(scale)}rem`,
    height: `${stringify(scale)}rem`,
    "--stroke": stroke
  })}><svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"${attr("stroke", stroke)}${attr("fill", stroke)} stroke-width="1.6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8.622,4.953c0.022,-0.234 0.205,-0.424 0.443,-0.45c0.253,-0.028 0.487,0.139 0.543,0.388c0.378,1.695 1.642,3.338 3.556,3.002c0.329,-0.058 0.654,-0.223 0.907,-0.438c0.778,-0.661 1.189,-1.617 1.446,-2.583c0.064,-0.243 0.299,-0.4 0.548,-0.368c0.237,0.031 0.417,0.225 0.434,0.461c0.39,1.678 1.649,3.289 3.545,2.955c0.33,-0.058 0.654,-0.223 0.907,-0.438c0.778,-0.66 1.19,-1.617 1.446,-2.583c0.059,-0.222 0.263,-0.376 0.493,-0.371c0.231,0.004 0.428,0.166 0.478,0.391c0.379,1.695 1.643,3.338 3.556,3.001c0.33,-0.058 0.654,-0.223 0.907,-0.438c0.778,-0.66 1.19,-1.617 1.446,-2.583c0.071,-0.266 0.345,-0.425 0.612,-0.355c0.267,0.071 0.426,0.345 0.355,0.612c-0.308,1.161 -0.83,2.295 -1.765,3.089c-0.385,0.326 -0.88,0.572 -1.381,0.66c-1.943,0.342 -3.43,-0.818 -4.218,-2.393c-0.307,0.655 -0.719,1.255 -1.282,1.733c-0.384,0.326 -0.88,0.572 -1.381,0.66c-1.948,0.343 -3.437,-0.825 -4.224,-2.407c-0.306,0.65 -0.717,1.245 -1.275,1.719c-0.384,0.327 -0.88,0.572 -1.381,0.661c-1.938,0.341 -3.421,-0.812 -4.211,-2.38c-0.307,0.66 -0.722,1.266 -1.288,1.747c-0.385,0.326 -0.88,0.572 -1.381,0.66c-2.479,0.436 -4.215,-1.572 -4.706,-3.768c-0.06,-0.27 0.11,-0.537 0.379,-0.597c0.27,-0.061 0.537,0.109 0.597,0.379c0.379,1.695 1.643,3.338 3.556,3.001c0.33,-0.058 0.654,-0.223 0.907,-0.438c0.764,-0.648 1.174,-1.581 1.432,-2.529Z"${attr_style(`fill:${stringify(stroke)};`)}></path></g></svg></div>`);
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FichteanCurveIcon
}, Symbol.toStringTag, { value: "Module" }));
function FilterIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`,
      scale: "80%"
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FilterIcon
}, Symbol.toStringTag, { value: "Module" }));
function FolderIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 3.34315 2.34315 2 4 2H8.43845C9.81505 2 11.015 2.93689 11.3489 4.27239L11.7808 6H13.5H20C21.6569 6 23 7.34315 23 9V19C23 20.6569 21.6569 22 20 22H4C2.34315 22 1 20.6569 1 19V10V9V5ZM3 9V10V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V9C21 8.44772 20.5523 8 20 8H13.5H11.7808H4C3.44772 8 3 8.44772 3 9ZM9.71922 6H4C3.64936 6 3.31278 6.06015 3 6.17071V5C3 4.44772 3.44772 4 4 4H8.43845C8.89732 4 9.2973 4.3123 9.40859 4.75746L9.71922 6Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FolderIcon
}, Symbol.toStringTag, { value: "Module" }));
function GayIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7H2Z" fill="#058169"></path><rect x="2" y="7" width="20" height="2" fill="#23C0A5"></rect><rect x="2" y="9" width="20" height="2" fill="#8FD8BB"></rect><rect x="2" y="11" width="20" height="2" fill="#ECEDF2"></rect><rect x="2" y="13" width="20" height="2" fill="#73A4DE"></rect><rect x="2" y="15" width="20" height="2" fill="#4B44C5"></rect><path d="M2 17H22C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" fill="#3C1975"></path></g></svg>`);
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GayIcon
}, Symbol.toStringTag, { value: "Module" }));
function GearIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0002 8C9.79111 8 8.00024 9.79086 8.00024 12C8.00024 14.2091 9.79111 16 12.0002 16C14.2094 16 16.0002 14.2091 16.0002 12C16.0002 9.79086 14.2094 8 12.0002 8ZM10.0002 12C10.0002 10.8954 10.8957 10 12.0002 10C13.1048 10 14.0002 10.8954 14.0002 12C14.0002 13.1046 13.1048 14 12.0002 14C10.8957 14 10.0002 13.1046 10.0002 12Z"${attr("fill", stroke)}></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2867 0.5C9.88583 0.5 8.6461 1.46745 8.37171 2.85605L8.29264 3.25622C8.10489 4.20638 7.06195 4.83059 6.04511 4.48813L5.64825 4.35447C4.32246 3.90796 2.83873 4.42968 2.11836 5.63933L1.40492 6.83735C0.67773 8.05846 0.954349 9.60487 2.03927 10.5142L2.35714 10.7806C3.12939 11.4279 3.12939 12.5721 2.35714 13.2194L2.03927 13.4858C0.954349 14.3951 0.67773 15.9415 1.40492 17.1626L2.11833 18.3606C2.83872 19.5703 4.3225 20.092 5.64831 19.6455L6.04506 19.5118C7.06191 19.1693 8.1049 19.7935 8.29264 20.7437L8.37172 21.1439C8.6461 22.5325 9.88584 23.5 11.2867 23.5H12.7136C14.1146 23.5 15.3543 22.5325 15.6287 21.1438L15.7077 20.7438C15.8954 19.7936 16.9384 19.1693 17.9553 19.5118L18.3521 19.6455C19.6779 20.092 21.1617 19.5703 21.8821 18.3606L22.5955 17.1627C23.3227 15.9416 23.046 14.3951 21.9611 13.4858L21.6432 13.2194C20.8709 12.5722 20.8709 11.4278 21.6432 10.7806L21.9611 10.5142C23.046 9.60489 23.3227 8.05845 22.5955 6.83732L21.8821 5.63932C21.1617 4.42968 19.678 3.90795 18.3522 4.35444L17.9552 4.48814C16.9384 4.83059 15.8954 4.20634 15.7077 3.25617L15.6287 2.85616C15.3543 1.46751 14.1146 0.5 12.7136 0.5H11.2867ZM10.3338 3.24375C10.4149 2.83334 10.7983 2.5 11.2867 2.5H12.7136C13.2021 2.5 13.5855 2.83336 13.6666 3.24378L13.7456 3.64379C14.1791 5.83811 16.4909 7.09167 18.5935 6.38353L18.9905 6.24984C19.4495 6.09527 19.9394 6.28595 20.1637 6.66264L20.8771 7.86064C21.0946 8.22587 21.0208 8.69271 20.6764 8.98135L20.3586 9.24773C18.6325 10.6943 18.6325 13.3057 20.3586 14.7523L20.6764 15.0186C21.0208 15.3073 21.0946 15.7741 20.8771 16.1394L20.1637 17.3373C19.9394 17.714 19.4495 17.9047 18.9905 17.7501L18.5936 17.6164C16.4909 16.9082 14.1791 18.1618 13.7456 20.3562L13.6666 20.7562C13.5855 21.1666 13.2021 21.5 12.7136 21.5H11.2867C10.7983 21.5 10.4149 21.1667 10.3338 20.7562L10.2547 20.356C9.82113 18.1617 7.50931 16.9082 5.40665 17.6165L5.0099 17.7501C4.55092 17.9047 4.06104 17.714 3.83671 17.3373L3.1233 16.1393C2.9058 15.7741 2.97959 15.3073 3.32398 15.0186L3.64185 14.7522C5.36782 13.3056 5.36781 10.6944 3.64185 9.24779L3.32398 8.98137C2.97959 8.69273 2.9058 8.2259 3.1233 7.86067L3.83674 6.66266C4.06106 6.28596 4.55093 6.09528 5.0099 6.24986L5.40676 6.38352C7.50938 7.09166 9.82112 5.83819 10.2547 3.64392L10.3338 3.24375Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GearIcon
}, Symbol.toStringTag, { value: "Module" }));
function GraphIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 32 32",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>network</title><path d="M27 21.75c-0.795 0.004-1.538 0.229-2.169 0.616l0.018-0.010-2.694-2.449c0.724-1.105 1.154-2.459 1.154-3.913 0-1.572-0.503-3.027-1.358-4.212l0.015 0.021 3.062-3.062c0.57 0.316 1.249 0.503 1.971 0.508h0.002c2.347 0 4.25-1.903 4.25-4.25s-1.903-4.25-4.25-4.25c-2.347 0-4.25 1.903-4.25 4.25v0c0.005 0.724 0.193 1.403 0.519 1.995l-0.011-0.022-3.062 3.062c-1.147-0.84-2.587-1.344-4.144-1.344-0.868 0-1.699 0.157-2.467 0.443l0.049-0.016-0.644-1.17c0.726-0.757 1.173-1.787 1.173-2.921 0-2.332-1.891-4.223-4.223-4.223s-4.223 1.891-4.223 4.223c0 2.332 1.891 4.223 4.223 4.223 0.306 0 0.605-0.033 0.893-0.095l-0.028 0.005 0.642 1.166c-1.685 1.315-2.758 3.345-2.758 5.627 0 0.605 0.076 1.193 0.218 1.754l-0.011-0.049-0.667 0.283c-0.78-0.904-1.927-1.474-3.207-1.474-2.334 0-4.226 1.892-4.226 4.226s1.892 4.226 4.226 4.226c2.334 0 4.226-1.892 4.226-4.226 0-0.008-0-0.017-0-0.025v0.001c-0.008-0.159-0.023-0.307-0.046-0.451l0.003 0.024 0.667-0.283c1.303 2.026 3.547 3.349 6.1 3.349 1.703 0 3.268-0.589 4.503-1.574l-0.015 0.011 2.702 2.455c-0.258 0.526-0.41 1.144-0.414 1.797v0.001c0 2.347 1.903 4.25 4.25 4.25s4.25-1.903 4.25-4.25c0-2.347-1.903-4.25-4.25-4.25v0zM8.19 5c0-0.966 0.784-1.75 1.75-1.75s1.75 0.784 1.75 1.75c0 0.966-0.784 1.75-1.75 1.75v0c-0.966-0.001-1.749-0.784-1.75-1.75v-0zM5 22.42c-0.966-0.001-1.748-0.783-1.748-1.749s0.783-1.749 1.749-1.749c0.966 0 1.748 0.782 1.749 1.748v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM27 3.25c0.966 0 1.75 0.784 1.75 1.75s-0.784 1.75-1.75 1.75c-0.966 0-1.75-0.784-1.75-1.75v0c0.001-0.966 0.784-1.749 1.75-1.75h0zM11.19 16c0-0.001 0-0.002 0-0.003 0-2.655 2.152-4.807 4.807-4.807 1.328 0 2.53 0.539 3.4 1.409l0.001 0.001 0.001 0.001c0.87 0.87 1.407 2.072 1.407 3.399 0 2.656-2.153 4.808-4.808 4.808s-4.808-2.153-4.808-4.808c0-0 0-0 0-0v0zM27 27.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0z"></path></g></svg>`);
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GraphIcon
}, Symbol.toStringTag, { value: "Module" }));
function HeterosexualIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      viewBox: "0 0 31.385 31.385",
      "xml:space": "preserve"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g><g><path d="M13.684,24.416h-2.225v-2.102c4.412-0.796,7.753-4.655,7.753-9.282c0-1.251-0.239-2.445-0.685-3.538 c-0.486-0.183-1.004-0.281-1.539-0.281c-0.849,0-1.657,0.241-2.354,0.689c0.585,0.903,0.925,1.977,0.925,3.13 c0,3.184-2.587,5.773-5.771,5.773c-3.182,0-5.77-2.589-5.77-5.773c0-2.423,1.501-4.499,3.62-5.354 C8.07,7.001,8.579,6.365,9.161,5.784c0.794-0.793,1.69-1.451,2.661-1.96c-0.654-0.144-1.334-0.222-2.03-0.222 c-5.199,0-9.446,4.232-9.446,9.431c0,4.524,3.208,8.31,7.437,9.22v2.164H5.71c-1.011,0-1.831,0.829-1.831,1.838 c0,1.012,0.82,1.84,1.831,1.84h2.073v1.462c0,1.009,0.828,1.828,1.838,1.828c1.011,0,1.838-0.819,1.838-1.828v-1.462h2.225 c1.011,0,1.829-0.828,1.829-1.84C15.513,25.245,14.694,24.416,13.684,24.416z"></path><path d="M29.13,0c-0.084-0.004-5.847,0.062-5.847,0.062c-1.024,0.012-1.848,1.016-1.834,2.044 c0.013,1.018,0.843,1.996,1.857,1.996c0.006,0,0.016,0,0.024,0l1.073-0.177l-1.955,1.877c-1.594-1.108-3.479-1.753-5.459-1.753 c-2.559,0-4.965,0.977-6.775,2.786c-2.892,2.891-3.544,7.177-1.962,10.702c0.102,0.034,0.205,0.066,0.31,0.095 c0.349,0.095,0.709,0.146,1.068,0.158c0.052,0.002,0.105,0.003,0.158,0.003c0.882,0,1.742-0.245,2.492-0.709 c-1.703-2.294-1.517-5.558,0.564-7.64c1.106-1.107,2.579-1.718,4.146-1.718s3.039,0.61,4.146,1.718 c2.289,2.288,2.289,6.01,0,8.296c-0.844,0.846-1.902,1.401-3.054,1.616c-0.079,0.104-0.16,0.208-0.242,0.309 c-1.078,1.31-2.455,2.335-4.004,2.989c1.001,0.347,2.063,0.528,3.153,0.528c2.56,0,4.966-1.001,6.777-2.811 c3.248-3.249,3.783-8.269,1.385-11.981l2.209-2.092v1.299c0,1.026,0.812,1.859,1.838,1.859c1.027,0,1.84-0.833,1.84-1.859V1.844 C31.039,1.347,30.955,0.113,29.13,0z"></path></g></g></g></svg>`);
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeterosexualIcon
}, Symbol.toStringTag, { value: "Module" }));
function HexagonIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2.46148 12.8001C2.29321 12.5087 2.20908 12.3629 2.17615 12.208C2.14701 12.0709 2.14701 11.9293 2.17615 11.7922C2.20908 11.6373 2.29321 11.4915 2.46148 11.2001L6.53772 4.13984C6.70598 3.8484 6.79011 3.70268 6.90782 3.5967C7.01196 3.50293 7.13465 3.43209 7.26793 3.38879C7.41856 3.33984 7.58683 3.33984 7.92336 3.33984H16.0758C16.4124 3.33984 16.5806 3.33984 16.7313 3.38879C16.8645 3.43209 16.9872 3.50293 17.0914 3.5967C17.2091 3.70268 17.2932 3.8484 17.4615 4.13984L21.5377 11.2001C21.706 11.4915 21.7901 11.6373 21.823 11.7922C21.8522 11.9293 21.8522 12.0709 21.823 12.208C21.7901 12.3629 21.706 12.5087 21.5377 12.8001L17.4615 19.8604C17.2932 20.1518 17.2091 20.2975 17.0914 20.4035C16.9872 20.4973 16.8645 20.5681 16.7313 20.6114C16.5806 20.6604 16.4124 20.6604 16.0758 20.6604H7.92336C7.58683 20.6604 7.41856 20.6604 7.26793 20.6114C7.13465 20.5681 7.01196 20.4973 6.90782 20.4035C6.79011 20.2975 6.70598 20.1518 6.53772 19.8604L2.46148 12.8001Z"${attr("stroke", stroke)} stroke-width="2" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HexagonIcon
}, Symbol.toStringTag, { value: "Module" }));
function HomosexualIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7H2Z" fill="#FF575B"></path><rect x="2" y="7" width="20" height="2" fill="#FF8353"></rect><rect x="2" y="9" width="20" height="2" fill="#FABA2C"></rect><rect x="2" y="11" width="20" height="2" fill="#7AC74D"></rect><rect x="2" y="13" width="20" height="2" fill="#00B0FF"></rect><rect x="2" y="15" width="20" height="2" fill="#B99FE4"></rect><path d="M2 17H22C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" fill="#E39BD1"></path></g></svg>`);
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomosexualIcon
}, Symbol.toStringTag, { value: "Module" }));
function IOIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 512 512",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`,
      scale: "140%"
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>function-block</title><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Combined-Shape"${attr("fill", stroke)}><path d="M362.666667,85.3333333 L362.666333,234.666333 L426.666667,234.666667 L426.666667,277.333333 L362.666333,277.333333 L362.666667,426.666667 L149.333333,426.666667 L149.333333,341.333333 L85.3333333,341.333333 L85.3333333,298.666667 L149.333333,298.666333 L149.333333,213.333333 L85.3333333,213.333333 L85.3333333,170.666667 L149.333333,170.666333 L149.333333,85.3333333 L362.666667,85.3333333 Z M320,128 L192,128 L192,384 L320,384 L320,128 Z"></path></g></g></g></svg>`);
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IOIcon
}, Symbol.toStringTag, { value: "Module" }));
function ItalicIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path${attr("stroke", stroke)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3L8 17m4-14H8m4 0h4M8 17H4m4 0h4"></path></g></svg>`);
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ItalicIcon
}, Symbol.toStringTag, { value: "Module" }));
function KeyboardKeyIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>hotkey_line</title><g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Development" transform="translate(-816.000000, 0.000000)" fill-rule="nonzero"><g id="hotkey_line" transform="translate(816.000000, 0.000000)"><path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"></path><path d="M18,3 C19.597725,3 20.903664,4.24892392 20.9949075,5.82372764 L21,6 L21,18 C21,19.597725 19.7511226,20.903664 18.1762773,20.9949075 L18,21 L6,21 C4.40232321,21 3.09633941,19.7511226 3.00509271,18.1762773 L3,18 L3,6 C3,4.40232321 4.24892392,3.09633941 5.82372764,3.00509271 L6,3 L18,3 Z M15.2934,16.7076 C14.9018,16.895 14.4631,17 14,17 L5,17 L5,18 C5,18.5523 5.44772,19 6,19 L17.5858,19 L15.2934,16.7076 Z M18,5 L17,5 L17,14 C17,14.3859167 16.9270833,14.7548889 16.7943287,15.0937801 L16.7076,15.2934 L19,17.5858 L19,6 C19,5.48716857 18.613973,5.06449347 18.1166239,5.0067278 L18,5 Z M15,5 L6,5 C5.48716857,5 5.06449347,5.38604429 5.0067278,5.88337975 L5,6 L5,15 L14,15 C14.51285,15 14.9355092,14.613973 14.9932725,14.1166239 L15,14 L15,5 Z M9,7 C9.51283143,7 9.93550653,7.38604429 9.9932722,7.88337975 L10,8 L10,8.63148 L11.4453,7.66795 C11.9048,7.3616 12.5257,7.48577 12.8321,7.9453 C13.1165214,8.37200643 13.0297464,8.93782745 12.6479974,9.26176291 L12.5547,9.33205 L11.1778,10.25 L12.5547,11.1679 C13.0142,11.4743 13.1384,12.0952 12.8321,12.5547 C12.5475857,12.9813786 11.9918954,13.1189464 11.5460613,12.8911811 L11.4453,12.8321 L10,11.8685 L10,12 C10,12.5523 9.55228,13 9,13 C8.48716857,13 8.06449347,12.613973 8.0067278,12.1166239 L8,12 L8,8 C8,7.44772 8.44772,7 9,7 Z" id="形状"${attr("fill", stroke)}></path></g></g></g></g></svg>`);
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KeyboardKeyIcon
}, Symbol.toStringTag, { value: "Module" }));
function LesbianIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7H2Z" fill="#C53D1F"></path><rect x="2" y="7" width="20" height="2" fill="#E07C3D"></rect><rect x="2" y="9" width="20" height="2" fill="#F19E63"></rect><rect x="2" y="11" width="20" height="2" fill="#EEECEF"></rect><rect x="2" y="13" width="20" height="2" fill="#C46AA1"></rect><rect x="2" y="15" width="20" height="2" fill="#AA5C8E"></rect><path d="M2 17H22C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" fill="#961F60"></path></g></svg>`);
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LesbianIcon
}, Symbol.toStringTag, { value: "Module" }));
function LicenseIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 36 36",
      version: "1.1",
      preserveAspectRatio: "xMidYMid meet",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>license-line</title><path d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H19l.57-.7.93-1.14L20.41,28H4V8H32l0,8.56a8.41,8.41,0,0,1,2,1.81V8A2,2,0,0,0,32,6Z" class="clr-i-outline clr-i-outline-path-1"></path><rect x="7" y="12" width="17" height="1.6" class="clr-i-outline clr-i-outline-path-2"></rect><rect x="7" y="16" width="11" height="1.6" class="clr-i-outline clr-i-outline-path-3"></rect><rect x="7" y="23" width="10" height="1.6" class="clr-i-outline clr-i-outline-path-4"></rect><path d="M27.46,17.23a6.36,6.36,0,0,0-4.4,11l-1.94,2.37.9,3.61,3.66-4.46a6.26,6.26,0,0,0,3.55,0l3.66,4.46.9-3.61-1.94-2.37a6.36,6.36,0,0,0-4.4-11Zm0,10.68a4.31,4.31,0,1,1,4.37-4.31A4.35,4.35,0,0,1,27.46,27.91Z" class="clr-i-outline clr-i-outline-path-5"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect></g></svg>`);
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LicenseIcon
}, Symbol.toStringTag, { value: "Module" }));
function LineSpacingIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "enable-background": "new 0 0 24 24"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`,
      scale: "130%"
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10,8h11c0.6,0,1-0.4,1-1s-0.4-1-1-1H10C9.4,6,9,6.4,9,7S9.4,8,10,8z M5.7,15.3V8.7C5.9,8.9,6.1,9,6.3,9C6.6,9,6.8,8.9,7,8.8c0.4-0.4,0.5-1,0.1-1.4l-1.7-2C5.2,5.1,5,5,4.7,5S4.1,5.1,3.9,5.4l-1.7,2c-0.3,0.4-0.3,1,0.2,1.4c0.4,0.3,0.9,0.3,1.3,0v6.6c-0.4-0.3-0.9-0.4-1.3,0c-0.4,0.4-0.5,1-0.1,1.4l1.7,2C4.1,18.9,4.4,19,4.7,19s0.6-0.1,0.8-0.4l1.7-2c0.4-0.4,0.3-1.1-0.1-1.4C6.6,14.9,6,14.9,5.7,15.3z M21,11H10c-0.6,0-1,0.4-1,1s0.4,1,1,1h11c0.6,0,1-0.4,1-1S21.6,11,21,11z M21,16H10c-0.6,0-1,0.4-1,1s0.4,1,1,1h11c0.6,0,1-0.4,1-1S21.6,16,21,16z"></path></g></svg>`);
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LineSpacingIcon
}, Symbol.toStringTag, { value: "Module" }));
function LocationIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LocationIcon
}, Symbol.toStringTag, { value: "Module" }));
function LockIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"${attr("stroke", stroke)} stroke-width="1.5"></path><path d="M12 14V18"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path><path d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path></g></svg>`);
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LockIcon
}, Symbol.toStringTag, { value: "Module" }));
function MarkdownIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 5.79086 1.79086 4 4 4H20C22.2091 4 24 5.79086 24 8V16C24 18.2091 22.2091 20 20 20H4C1.79086 20 0 18.2091 0 16V8ZM4 6C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6H4ZM5.68377 8.05132C6.09211 7.9152 6.54174 8.05566 6.8 8.4L9 11.3333L11.2 8.4C11.4583 8.05566 11.9079 7.9152 12.3162 8.05132C12.7246 8.18743 13 8.56957 13 9V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V12L9.8 13.6C9.61115 13.8518 9.31476 14 9 14C8.68524 14 8.38885 13.8518 8.2 13.6L7 12V15C7 15.5523 6.55228 16 6 16C5.44772 16 5 15.5523 5 15V9C5 8.56957 5.27543 8.18743 5.68377 8.05132ZM18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9V12.5858L15.7071 12.2929C15.3166 11.9024 14.6834 11.9024 14.2929 12.2929C13.9024 12.6834 13.9024 13.3166 14.2929 13.7071L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071L19.7071 13.7071C20.0976 13.3166 20.0976 12.6834 19.7071 12.2929C19.3166 11.9024 18.6834 11.9024 18.2929 12.2929L18 12.5858V9Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MarkdownIcon
}, Symbol.toStringTag, { value: "Module" }));
function MinimizeIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M23 4C23 2.34315 21.6569 1 20 1H8C6.34315 1 5 2.34315 5 4V5H4C2.34315 5 1 6.34315 1 8V20C1 21.6569 2.34315 23 4 23H16C17.6569 23 19 21.6569 19 20V19H20C21.6569 19 23 17.6569 23 16V4ZM19 17H20C20.5523 17 21 16.5523 21 16V4C21 3.44772 20.5523 3 20 3H8C7.44772 3 7 3.44772 7 4V5H16C17.6569 5 19 6.34315 19 8V17ZM16 7C16.5523 7 17 7.44772 17 8V20C17 20.5523 16.5523 21 16 21H4C3.44772 21 3 20.5523 3 20V8C3 7.44772 3.44772 7 4 7H16Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MinimizeIcon
}, Symbol.toStringTag, { value: "Module" }));
function MoonIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MoonIcon
}, Symbol.toStringTag, { value: "Module" }));
function NumberSignIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 8H20M4 16H20M8 3V21M16 3V21"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NumberSignIcon
}, Symbol.toStringTag, { value: "Module" }));
function PackageIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10 13H14M19 9V20H5V9M19 9H5M19 9C19.5523 9 20 8.55228 20 8V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V8C4 8.55228 4.44772 9 5 9"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PackageIcon
}, Symbol.toStringTag, { value: "Module" }));
function PageIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8 13H14M8 17H16M13 3H5V21H19V9M13 3H14L19 8V9M13 3V7C13 8 14 9 15 9H19"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageIcon
}, Symbol.toStringTag, { value: "Module" }));
function PansexualIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="9.666" width="20" height="4.666" fill="#F9D949"></rect><path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V9.666H2V7Z" fill="#EC408D"></path><path d="M2 14.332H22V16.998C22 18.1026 21.1046 18.998 20 18.998H4C2.89543 18.998 2 18.1026 2 16.998V14.332Z" fill="#3F93F6"></path></g></svg>`);
}
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PansexualIcon
}, Symbol.toStringTag, { value: "Module" }));
function ParagraphIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,12H5a1,1,0,0,0,0-2H4.635l.586-1.692H8.779L9.365,10H9a1,1,0,0,0,0,2h3a1,1,0,0,0,0-2h-.518L8.945,2.673A1,1,0,0,0,8,2H6a1,1,0,0,0-.945.673L2.518,10H2a1,1,0,0,0,0,2ZM6.712,4h.576l.8,2.308H5.913ZM23,4a1,1,0,0,1-1,1H15a1,1,0,0,1,0-2h7A1,1,0,0,1,23,4Zm0,6a1,1,0,0,1-1,1H15a1,1,0,0,1,0-2h7A1,1,0,0,1,23,10Zm0,5a1,1,0,0,1-1,1H2a1,1,0,0,1,0-2H22A1,1,0,0,1,23,15Zm0,6a1,1,0,0,1-1,1H2a1,1,0,0,1,0-2H22A1,1,0,0,1,23,21Z"></path></g></svg>`);
}
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ParagraphIcon
}, Symbol.toStringTag, { value: "Module" }));
function PencilIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 -0.5 25 25",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PencilIcon
}, Symbol.toStringTag, { value: "Module" }));
function PersonIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`,
      scale: "80%"
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>profile_round [#1342]</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)"${attr("fill", stroke)}><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]"></path></g></g></g></g></svg>`);
}
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PersonIcon
}, Symbol.toStringTag, { value: "Module" }));
function PlugIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M17 9V12C17 14.7614 14.7614 17 12 17M7 9V12C7 14.7614 9.23858 17 12 17M12 17V21M8 3V6M16 3V6M5 9H19"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PlugIcon
}, Symbol.toStringTag, { value: "Module" }));
function PlusIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 12H20M12 4V20"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PlusIcon
}, Symbol.toStringTag, { value: "Module" }));
function PrivacyIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9 12L11 14L15 9.99999M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PrivacyIcon
}, Symbol.toStringTag, { value: "Module" }));
function PyramidIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 12L38 42H4L21 12Z"${attr("stroke", stroke)} stroke-width="4" stroke-linejoin="round"></path><path d="M36.5 42H44L36 28L33 33"${attr("stroke", stroke)} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 12L13 42"${attr("stroke", stroke)} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PyramidIcon
}, Symbol.toStringTag, { value: "Module" }));
function QuestionMarkIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Layer_2" data-name="Layer 2"><g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"></rect></g><g id="Icons"><g><path d="M24.3,6A11.2,11.2,0,0,0,16,9.3a11,11,0,0,0-3.5,8.2,2.5,2.5,0,0,0,5,0,6.5,6.5,0,0,1,2-4.7A6.2,6.2,0,0,1,24.2,11a6.5,6.5,0,0,1,1,12.9,4.4,4.4,0,0,0-3.7,4.4v3.2a2.5,2.5,0,0,0,5,0V28.7a11.6,11.6,0,0,0,9-11.5A11.7,11.7,0,0,0,24.3,6Z"></path><circle cx="24" cy="39.5" r="2.5"></circle></g></g></g></g></svg>`);
}
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QuestionMarkIcon
}, Symbol.toStringTag, { value: "Module" }));
function RenameIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      stroke,
      "stroke-width": "0.28"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.75 2C11.3358 2 11 2.33579 11 2.75C11 3.16421 11.3358 3.5 11.75 3.5H13.25V24.5H11.75C11.3358 24.5 11 24.8358 11 25.25C11 25.6642 11.3358 26 11.75 26H16.25C16.6642 26 17 25.6642 17 25.25C17 24.8358 16.6642 24.5 16.25 24.5H14.75V3.5H16.25C16.6642 3.5 17 3.16421 17 2.75C17 2.33579 16.6642 2 16.25 2H11.75Z"${attr("fill", stroke)}></path><path d="M6.25 6.01958H12.25V7.51958H6.25C5.2835 7.51958 4.5 8.30308 4.5 9.26958V18.7696C4.5 19.7361 5.2835 20.5196 6.25 20.5196H12.25V22.0196H6.25C4.45507 22.0196 3 20.5645 3 18.7696V9.26958C3 7.47465 4.45507 6.01958 6.25 6.01958Z"${attr("fill", stroke)}></path><path d="M21.75 20.5196H15.75V22.0196H21.75C23.5449 22.0196 25 20.5645 25 18.7696V9.26958C25 7.47465 23.5449 6.01958 21.75 6.01958H15.75V7.51958H21.75C22.7165 7.51958 23.5 8.30308 23.5 9.26958V18.7696C23.5 19.7361 22.7165 20.5196 21.75 20.5196Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RenameIcon
}, Symbol.toStringTag, { value: "Module" }));
function ReticleIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,11H19.93A8,8,0,0,0,13,4.07V3a1,1,0,0,0-2,0V4.07A8,8,0,0,0,4.07,11H3a1,1,0,0,0,0,2H4.07A8,8,0,0,0,11,19.93V21a1,1,0,0,0,2,0V19.93A8,8,0,0,0,19.93,13H21a1,1,0,0,0,0-2Zm-4,2h.91A6,6,0,0,1,13,17.91V17a1,1,0,0,0-2,0v.91A6,6,0,0,1,6.09,13H7a1,1,0,0,0,0-2H6.09A6,6,0,0,1,11,6.09V7a1,1,0,0,0,2,0V6.09A6,6,0,0,1,17.91,11H17a1,1,0,0,0,0,2Zm-5-2a1,1,0,1,0,1,1A1,1,0,0,0,12,11Z"></path></g></svg>`);
}
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ReticleIcon
}, Symbol.toStringTag, { value: "Module" }));
function RulerIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5563 1.41421C16.3374 0.633165 17.6037 0.633165 18.3848 1.41421L22.6274 5.65685C23.4085 6.4379 23.4085 7.70423 22.6274 8.48528L8.48527 22.6274C7.70422 23.4085 6.43789 23.4085 5.65684 22.6274L1.4142 18.3848C0.633153 17.6037 0.633154 16.3374 1.4142 15.5563L15.5563 1.41421ZM16.2634 3.53553C16.654 3.14501 17.2871 3.14501 17.6777 3.53553L20.5061 6.36396C20.8966 6.75449 20.8966 7.38765 20.5061 7.77817L19.799 7.07107C19.4085 6.68054 18.7753 6.68054 18.3848 7.07107C17.9942 7.46159 17.9942 8.09476 18.3848 8.48528L19.0919 9.19239L17.6777 10.6066L15.5563 8.48528C15.1658 8.09476 14.5326 8.09476 14.1421 8.48528C13.7516 8.87581 13.7516 9.50897 14.1421 9.89949L16.2634 12.0208L14.8492 13.435L14.1421 12.7279C13.7516 12.3374 13.1184 12.3374 12.7279 12.7279C12.3374 13.1184 12.3374 13.7516 12.7279 14.1421L13.435 14.8492L12.0208 16.2635L9.89948 14.1421C9.50896 13.7516 8.87579 13.7516 8.48527 14.1421C8.09475 14.5327 8.09475 15.1658 8.48527 15.5563L10.6066 17.6777L9.19238 19.0919L8.48527 18.3848C8.09475 17.9943 7.46158 17.9943 7.07106 18.3848C6.68053 18.7753 6.68053 19.4085 7.07106 19.799L7.77816 20.5061C7.38764 20.8966 6.75447 20.8966 6.36395 20.5061L3.53552 17.6777C3.145 17.2871 3.145 16.654 3.53552 16.2635L16.2634 3.53553Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RulerIcon
}, Symbol.toStringTag, { value: "Module" }));
function SaveIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SaveIcon
}, Symbol.toStringTag, { value: "Module" }));
function ScaleIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ScaleIcon
}, Symbol.toStringTag, { value: "Module" }));
function SevenPointStructureIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      height: "200px",
      width: "200px",
      version: "1.1",
      id: "_x32_",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      viewBox: "0 0 512 512",
      "xml:space": "preserve",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`,
      rotate: "-10deg"
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g><path${attr("fill", stroke)} d="M467.138,231.502c-4.793,4.318-8.66,8.652-12.12,12.438c-5.186,5.719-9.459,10.067-13.497,12.63 c-2.029,1.304-3.992,2.252-6.296,2.948c-2.304,0.696-5,1.155-8.571,1.155c-3.63,0-6.356-0.482-8.689-1.185 c-4.022-1.252-7.238-3.297-11.142-6.786c-2.896-2.593-6-5.978-9.541-9.86c-5.319-5.786-11.63-12.852-20.802-18.83 c-4.578-2.963-9.874-5.571-15.801-7.348c-5.933-1.793-12.452-2.756-19.379-2.749c-7.037-0.007-13.653,0.985-19.653,2.83 c-10.564,3.222-18.868,9.008-25.209,14.756c-4.793,4.326-8.66,8.652-12.127,12.438c-5.178,5.719-9.452,10.067-13.482,12.63 c-2.03,1.304-3.993,2.252-6.297,2.948c-2.304,0.696-4.993,1.155-8.571,1.155c-3.63,0-6.348-0.482-8.682-1.185 c-4.015-1.252-7.23-3.297-11.134-6.778c-2.896-2.593-6-5.978-9.534-9.868c-5.326-5.778-11.63-12.852-20.809-18.83 c-4.57-2.963-9.874-5.571-15.801-7.348c-5.926-1.793-12.445-2.756-19.375-2.749c-7.034-0.007-13.649,0.985-19.649,2.83 c-10.56,3.222-18.864,9.016-25.202,14.756c-4.789,4.326-8.652,8.66-12.115,12.438c-5.175,5.726-9.453,10.067-13.483,12.63 c-2.03,1.304-3.989,2.252-6.289,2.948c-2.304,0.696-4.993,1.155-8.564,1.155c-3.63,0-6.352-0.482-8.678-1.185 c-4.019-1.252-7.237-3.297-11.142-6.778c-2.889-2.593-5.989-5.978-9.53-9.868c-5.323-5.778-11.63-12.852-20.801-18.83 c-4.575-2.963-9.875-5.571-15.804-7.348c-5.931-1.793-12.445-2.756-19.372-2.749v37.41c3.63,0.008,6.348,0.482,8.678,1.185 c4.023,1.252,7.237,3.297,11.142,6.778c2.892,2.593,5.993,5.986,9.53,9.868c5.323,5.778,11.63,12.852,20.805,18.83 c4.57,2.963,9.867,5.571,15.801,7.348c5.93,1.793,12.445,2.756,19.371,2.749c7.034,0.007,13.645-0.985,19.649-2.838 c10.564-3.215,18.864-9.008,25.206-14.749c4.789-4.326,8.652-8.66,12.116-12.438c5.17-5.726,9.452-10.067,13.482-12.638 c2.03-1.303,3.986-2.251,6.289-2.948c2.3-0.69,4.989-1.141,8.56-1.148c3.634,0.008,6.352,0.482,8.686,1.185 c4.015,1.252,7.237,3.297,11.142,6.778c2.889,2.593,5.985,5.986,9.526,9.868c5.327,5.778,11.63,12.852,20.809,18.83 c4.57,2.963,9.868,5.571,15.801,7.348c5.926,1.793,12.445,2.756,19.371,2.749c7.038,0.007,13.653-0.985,19.653-2.83 c10.564-3.222,18.869-9.008,25.209-14.756c4.793-4.326,8.66-8.652,12.119-12.438c5.186-5.719,9.46-10.06,13.49-12.63 c2.029-1.304,3.992-2.252,6.296-2.955c2.305-0.69,4.993-1.141,8.571-1.148c3.63,0.008,6.348,0.482,8.682,1.185 c4.022,1.252,7.244,3.297,11.149,6.778c2.888,2.593,5.992,5.986,9.534,9.868c5.319,5.778,11.63,12.852,20.809,18.83 c4.57,2.963,9.874,5.571,15.801,7.348c5.934,1.793,12.452,2.756,19.379,2.749c7.037,0.007,13.645-0.985,19.653-2.83 c10.564-3.222,18.868-9.008,25.209-14.756c4.793-4.326,8.66-8.652,12.12-12.431c5.186-5.726,9.46-10.067,13.497-12.638 c2.03-1.304,3.993-2.252,6.297-2.948c2.304-0.696,4.993-1.148,8.571-1.155v-37.41c-7.038-0.007-13.652,0.985-19.654,2.83 C481.776,219.968,473.479,225.754,467.138,231.502z"></path></g></g></svg>`);
}
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SevenPointStructureIcon
}, Symbol.toStringTag, { value: "Module" }));
function SplitHorizontalIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 4C4.34315 4 3 5.34315 3 7V17C3 18.6569 4.34315 20 6 20H18C19.6569 20 21 18.6569 21 17V7C21 5.34315 19.6569 4 18 4H6ZM5 7C5 6.44772 5.44772 6 6 6H11V18H6C5.44772 18 5 17.5523 5 17V7ZM13 18H18C18.5523 18 19 17.5523 19 17V7C19 6.44772 18.5523 6 18 6H13V18Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SplitHorizontalIcon
}, Symbol.toStringTag, { value: "Module" }));
function SpreadsheetIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 10V20M3 15L21 15M3 10H21M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SpreadsheetIcon
}, Symbol.toStringTag, { value: "Module" }));
function SproutIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      version: "1.1",
      id: "XMLID_125_",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      viewBox: "0 0 24 24",
      "xml:space": "preserve"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="grow"><g><path d="M16.9,24H7.2l-1-7H4v-2h7v-3.1c-1.9,0.3-3.8-0.2-5.2-1.4C4.1,9,3.6,6.8,4.4,4.8l0.2-0.4L5,4.3C7,3.6,9.4,4,11,5.2 c0-1.4,0.6-2.8,1.8-3.8l0,0c1.1-0.9,2.6-1.4,4-1.4c0.7,0,1.5,0.1,2.2,0.3l0.4,0.1l0.2,0.4c0.9,2,0.4,4.2-1.4,5.7 c-1.4,1.2-3.3,1.7-5.2,1.4V9c0,0.1,0,0.3,0,0.4V15h7v2h-2.1L16.9,24z M8.9,22h6.3l0.7-5H8.2L8.9,22z M6.1,6.1 c-0.3,1,0.1,2.1,1,2.9c1,0.9,2.5,1.2,3.8,0.9C11,9.7,11,9.5,11,9.3V9c0-0.8-0.4-1.5-1.1-2.1C8.9,6.1,7.5,5.8,6.1,6.1z M13.1,5.9 c1.4,0.3,2.8,0,3.8-0.9c0.9-0.8,1.3-1.9,1-2.9c-1.4-0.3-2.8,0-3.8,0.9l0,0C13.2,3.7,12.8,4.8,13.1,5.9z"></path></g></g></g></svg>`);
}
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SproutIcon
}, Symbol.toStringTag, { value: "Module" }));
function StartupIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    void 0,
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11 2C11 1.44772 11.4477 1 12 1C12.0161 1 12.0322 1.00038 12.0481 1.00114C12.0632 1.00051 12.0785 1.00026 12.0938 1.00039C14.1199 1.01765 16.1091 1.59455 17.8374 2.67665C19.8492 3.93625 21.3996 5.8128 22.2571 8.02608C23.1146 10.2394 23.2332 12.6706 22.5951 14.9569C21.9571 17.2431 20.5967 19.2616 18.717 20.711C16.8373 22.1604 14.5393 22.9629 12.1659 22.9988C9.79262 23.0346 7.47138 22.3017 5.54884 20.9097C3.6263 19.5177 2.2056 17.5411 1.49889 15.2752C0.891759 13.3285 0.839553 11.258 1.33799 9.29413C1.47385 8.75881 2.05308 8.48753 2.57385 8.67143C3.09462 8.85532 3.36505 9.4271 3.24007 9.96506C2.8794 11.5176 2.93657 13.1446 3.4147 14.6776C3.99248 16.5302 5.15399 18.1461 6.72579 19.2842C8.29758 20.4223 10.1953 21.0214 12.1357 20.9921C14.076 20.9629 15.9548 20.3068 17.4916 19.1218C19.0283 17.9368 20.1405 16.2866 20.6622 14.4174C21.1838 12.5483 21.0869 10.5606 20.3858 8.75108C19.6847 6.94158 18.4172 5.40739 16.7724 4.37759C15.6232 3.65806 14.3329 3.21174 13 3.06259V5C13 5.55229 12.5523 6 12 6C11.4477 6 11 5.55229 11 5V2Z"${attr("fill", stroke)}></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.31205 3.92537C4.91543 3.66095 4.38731 3.71325 4.05025 4.05031C3.71318 4.38738 3.66089 4.9155 3.9253 5.31212L9.30753 13.3855C9.50568 13.6827 9.80929 14.101 10.283 14.3927C10.6282 14.6053 11.1764 14.8627 11.8475 14.871C12.5576 14.8799 13.2918 14.6077 13.9497 13.9498C14.6076 13.2919 14.8798 12.5577 14.871 11.8475C14.8626 11.1764 14.6053 10.6283 14.3927 10.2831C14.1009 9.80935 13.6826 9.50574 13.3854 9.30759L5.31205 3.92537ZM10.9716 12.2761L8.36291 8.36297L12.276 10.9717C12.5267 11.1388 12.6362 11.2449 12.6897 11.3319C12.7963 11.5049 12.8689 11.6951 12.8711 11.8724C12.8728 12.0107 12.8361 12.235 12.5355 12.5356C12.2349 12.8362 12.0106 12.8729 11.8723 12.8712C11.695 12.869 11.5048 12.7964 11.3318 12.6898C11.2448 12.6362 11.1388 12.5267 10.9716 12.2761Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StartupIcon
}, Symbol.toStringTag, { value: "Module" }));
function SunIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SunIcon
}, Symbol.toStringTag, { value: "Module" }));
function SwordIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 1.48416e-05L23 0C23.2652 -9.53668e-07 23.5195 0.105355 23.7071 0.292891C23.8946 0.480426 24 0.73478 24 0.999997L24 5.00001C24 5.26523 23.8946 5.51958 23.7071 5.70712L11.9142 17.5L13.7071 19.2929C14.0976 19.6834 14.0976 20.3166 13.7071 20.7071C13.3166 21.0977 12.6834 21.0977 12.2929 20.7071L9.79289 18.2071L9.46376 17.878L5.9999 20.9955C6.00096 21.7635 5.70873 22.534 5.12132 23.1214C3.94975 24.293 2.05025 24.293 0.87868 23.1214C-0.292893 21.9498 -0.292893 20.0503 0.87868 18.8787C1.46607 18.2913 2.23647 17.9991 3.00451 18.0002L6.12202 14.5363L5.79287 14.2071L3.29289 11.7071C2.90237 11.3166 2.90237 10.6834 3.29289 10.2929C3.68342 9.90239 4.31658 9.90239 4.70711 10.2929L6.49998 12.0858L18.2929 0.292907C18.4804 0.105372 18.7348 1.57952e-05 19 1.48416e-05ZM7.91419 13.5L8.2071 13.7929L10.2071 15.7929L10.5 16.0858L22 4.5858L22 2L19.4142 2.00001L7.91419 13.5ZM7.53819 15.9524L5.00435 18.7678C5.0441 18.8035 5.08311 18.8405 5.12132 18.8787C5.15952 18.9169 5.19648 18.9559 5.23221 18.9957L8.04759 16.4618L7.53819 15.9524ZM3.20676 20.0214C2.88445 19.954 2.54009 20.0458 2.29289 20.293C1.90237 20.6835 1.90237 21.3166 2.29289 21.7072C2.68342 22.0977 3.31658 22.0977 3.70711 21.7072C3.95431 21.46 4.0461 21.1156 3.97862 20.7933C3.94032 20.6103 3.85075 20.4366 3.70711 20.293C3.56346 20.1493 3.3897 20.0597 3.20676 20.0214Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SwordIcon
}, Symbol.toStringTag, { value: "Module" }));
function TextIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 18L8 5H7L3 18M4.23077 14H10.7692M14.5 10C16 9 20 8 20 11.5C20 15 20 18 20 18M20 12.5C18.5 13 14 13 14 16C14 19 18.5 18 20 15.5"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TextIcon
}, Symbol.toStringTag, { value: "Module" }));
function TheaterIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      viewBox: "0 -64 640 640",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M206.86 245.15c-35.88 10.45-59.95 41.2-57.53 74.1 11.4-12.72 28.81-23.7 49.9-30.92l7.63-43.18zM95.81 295L64.08 115.49c-.29-1.62.28-2.62.24-2.65 57.76-32.06 123.12-49.01 189.01-49.01 1.61 0 3.23.17 4.85.19 13.95-13.47 31.73-22.83 51.59-26 18.89-3.02 38.05-4.55 57.18-5.32-9.99-13.95-24.48-24.23-41.77-27C301.27 1.89 277.24 0 253.32 0 176.66 0 101.02 19.42 33.2 57.06 9.03 70.48-3.92 98.48 1.05 126.58l31.73 179.51c14.23 80.52 136.33 142.08 204.45 142.08 3.59 0 6.75-.46 10.01-.8-13.52-17.08-28.94-40.48-39.5-67.58-47.61-12.98-106.06-51.62-111.93-84.79zm97.55-137.46c-.73-4.12-2.23-7.87-4.07-11.4-8.25 8.91-20.67 15.75-35.32 18.32-14.65 2.58-28.67.4-39.48-5.17-.52 3.94-.64 7.98.09 12.1 3.84 21.7 24.58 36.19 46.34 32.37 21.75-3.82 36.28-24.52 32.44-46.22zM606.8 120.9c-88.98-49.38-191.43-67.41-291.98-51.35-27.31 4.36-49.08 26.26-54.04 54.36l-31.73 179.51c-15.39 87.05 95.28 196.27 158.31 207.35 63.03 11.09 204.47-53.79 219.86-140.84l31.73-179.51c4.97-28.11-7.98-56.11-32.15-69.52zm-273.24 96.8c3.84-21.7 24.58-36.19 46.34-32.36 21.76 3.83 36.28 24.52 32.45 46.22-.73 4.12-2.23 7.87-4.07 11.4-8.25-8.91-20.67-15.75-35.32-18.32-14.65-2.58-28.67-.4-39.48 5.17-.53-3.95-.65-7.99.08-12.11zm70.47 198.76c-55.68-9.79-93.52-59.27-89.04-112.9 20.6 25.54 56.21 46.17 99.49 53.78 43.28 7.61 83.82.37 111.93-16.6-14.18 51.94-66.71 85.51-122.38 75.72zm130.3-151.34c-8.25-8.91-20.68-15.75-35.33-18.32-14.65-2.58-28.67-.4-39.48 5.17-.52-3.94-.64-7.98.09-12.1 3.84-21.7 24.58-36.19 46.34-32.37 21.75 3.83 36.28 24.52 32.45 46.22-.73 4.13-2.23 7.88-4.07 11.4z"></path></g></svg>`);
}
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TheaterIcon
}, Symbol.toStringTag, { value: "Module" }));
function TransferIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Transfer</title><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Transfer"><rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"></rect><path d="M19,7 L5,7 M20,17 L5,17" id="Shape"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round"></path><path d="M16,3 L19.2929,6.29289 C19.6834,6.68342 19.6834,7.31658 19.2929,7.70711 L16,11" id="Path"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round"></path><path d="M8,13 L4.70711,16.2929 C4.31658,16.6834 4.31658,17.3166 4.70711,17.7071 L8,21" id="Path"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round"></path></g></g></g></svg>`);
}
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TransferIcon
}, Symbol.toStringTag, { value: "Module" }));
function TrashIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TrashIcon
}, Symbol.toStringTag, { value: "Module" }));
function TreeIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>tree-structure</title><g id="Layer_2" data-name="Layer 2"><g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"></rect></g><g id="Q3_icons" data-name="Q3 icons"><path d="M26,30H42a2,2,0,0,0,2-2V20a2,2,0,0,0-2-2H26a2,2,0,0,0-2,2v2H16V14h6a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4v8a2,2,0,0,0,2,2h6V40a2,2,0,0,0,2,2H24v2a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V36a2,2,0,0,0-2-2H26a2,2,0,0,0-2,2v2H16V26h8v2A2,2,0,0,0,26,30Zm2-8H40v4H28ZM8,6H20v4H8ZM28,38H40v4H28Z"></path></g></g></g></svg>`);
}
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TreeIcon
}, Symbol.toStringTag, { value: "Module" }));
function UnderlineIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`,
      scale: "120%"
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 21H20"${attr("stroke", stroke)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`);
}
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UnderlineIcon
}, Symbol.toStringTag, { value: "Module" }));
function UndoIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.53033 3.46967C7.82322 3.76256 7.82322 4.23744 7.53033 4.53033L5.81066 6.25H15C18.1756 6.25 20.75 8.82436 20.75 12C20.75 15.1756 18.1756 17.75 15 17.75H8.00001C7.58579 17.75 7.25001 17.4142 7.25001 17C7.25001 16.5858 7.58579 16.25 8.00001 16.25H15C17.3472 16.25 19.25 14.3472 19.25 12C19.25 9.65279 17.3472 7.75 15 7.75H5.81066L7.53033 9.46967C7.82322 9.76256 7.82322 10.2374 7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L3.46967 7.53033C3.17678 7.23744 3.17678 6.76256 3.46967 6.46967L6.46967 3.46967C6.76256 3.17678 7.23744 3.17678 7.53033 3.46967Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UndoIcon
}, Symbol.toStringTag, { value: "Module" }));
function UnlockedIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"${attr("stroke", stroke)} stroke-width="1.5"></path><path d="M6 10V8C6 4.68629 8.68629 2 12 2C14.7958 2 17.1449 3.91216 17.811 6.5"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path><path d="M12 14V18"${attr("stroke", stroke)} stroke-width="1.5" stroke-linecap="round"></path></g></svg>`);
}
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UnlockedIcon
}, Symbol.toStringTag, { value: "Module" }));
function UnregisteredIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UnregisteredIcon
}, Symbol.toStringTag, { value: "Module" }));
function VersionControlIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5C8 5.55228 7.55228 6 7 6C6.44772 6 6 5.55228 6 5ZM8 7.82929C9.16519 7.41746 10 6.30622 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.30622 4.83481 7.41746 6 7.82929V16.1707C4.83481 16.5825 4 17.6938 4 19C4 20.6569 5.34315 22 7 22C8.65685 22 10 20.6569 10 19C10 17.7334 9.21506 16.6501 8.10508 16.2101C8.45179 14.9365 9.61653 14 11 14H13C16.3137 14 19 11.3137 19 8V7.82929C20.1652 7.41746 21 6.30622 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.30622 15.8348 7.41746 17 7.82929V8C17 10.2091 15.2091 12 13 12H11C9.87439 12 8.83566 12.3719 8 12.9996V7.82929ZM18 6C18.5523 6 19 5.55228 19 5C19 4.44772 18.5523 4 18 4C17.4477 4 17 4.44772 17 5C17 5.55228 17.4477 6 18 6ZM6 19C6 18.4477 6.44772 18 7 18C7.55228 18 8 18.4477 8 19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VersionControlIcon
}, Symbol.toStringTag, { value: "Module" }));
function WeightScaleIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      height: "200px",
      width: "200px",
      version: "1.1",
      id: "_x32_",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      viewBox: "0 0 512 512",
      "xml:space": "preserve",
      fill: stroke
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`,
      scale: "90%"
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g><path${attr("fill", stroke)} d="M455.998,0.004H56.002C25.063,0.011,0.008,25.067,0,56.006v399.989c0.008,30.938,25.063,55.994,56.002,56.002 h399.997c30.938-0.008,55.994-25.063,56.002-56.002V56.006C511.993,25.067,486.937,0.011,455.998,0.004z M479.999,455.994 c-0.007,6.68-2.664,12.579-7.032,16.969c-4.39,4.367-10.289,7.024-16.969,7.032H56.002c-6.68-0.008-12.579-2.664-16.969-7.032 c-4.367-4.39-7.023-10.289-7.031-16.969V56.006c0.008-6.68,2.664-12.579,7.031-16.977c4.39-4.359,10.289-7.016,16.969-7.023 h399.997c6.68,0.007,12.579,2.664,16.969,7.023c4.367,4.398,7.024,10.297,7.032,16.977V455.994z"></path><path${attr("fill", stroke)} d="M128.012,119.101l26.391,76.783H270.86l16.352-67.947l9.938,2.031l9.93,2.015l-10.696,63.9h61.212 l26.392-76.783C346.612,96.577,302.83,83.6,256.008,83.6C209.178,83.6,165.388,96.577,128.012,119.101z"></path></g></g></svg>`);
}
const __vite_glob_0_72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WeightScaleIcon
}, Symbol.toStringTag, { value: "Module" }));
function WheelIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      fill: stroke,
      height: "200px",
      width: "200px",
      version: "1.1",
      id: "Layer_1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      viewBox: "0 0 511.998 511.998",
      "xml:space": "preserve"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g><g><path d="M256.001,0c-141.159,0-256,114.84-256,255.998s114.84,256,255.998,256s255.998-114.841,255.998-256S397.16,0,256.001,0z M95.292,129.984l100.153,100.153H53.327C58.081,192.661,73.027,158.318,95.292,129.984z M53.323,281.833h142.151L95.292,382.016 C73.022,353.674,58.074,319.32,53.323,281.833z M230.154,458.678c-36.563-4.637-70.135-18.984-98.063-40.354l98.063-98.065 V458.678z M230.154,191.741l-98.063-98.065c27.928-21.37,61.5-35.719,98.063-40.354V191.741z M458.675,230.139H320.274 l98.049-98.049C439.692,160.013,454.038,193.58,458.675,230.139z M281.848,53.322c37.483,4.752,71.83,19.701,100.169,41.969 L281.848,195.46V53.322z M281.848,458.678V316.54l100.167,100.169C353.678,438.977,319.329,453.925,281.848,458.678z M418.323,379.91l-98.077-98.079H458.68C454.045,318.401,439.695,351.978,418.323,379.91z"></path></g></g></g></svg>`);
}
const __vite_glob_0_73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WheelIcon
}, Symbol.toStringTag, { value: "Module" }));
function WordCountIcon($$renderer, $$props) {
  let {
    stroke = "currentcolor",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      ...attributes$1,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    void 0,
    void 0,
    {
      width: `${stringify(scale)}rem`,
      height: `${stringify(scale)}rem`
    },
    3
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H10C10.5523 23 11 22.5523 11 22C11 21.4477 10.5523 21 10 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM12.952 12.694C12.783 12.1682 12.2198 11.879 11.694 12.048C11.1682 12.217 10.879 12.7802 11.048 13.306L13.298 20.306C13.4309 20.7196 13.8156 21 14.25 21C14.6844 21 15.0691 20.7196 15.202 20.306L16.5 16.2679L17.798 20.306C17.9309 20.7196 18.3156 21 18.75 21C19.1844 21 19.5691 20.7196 19.702 20.306L21.952 13.306C22.121 12.7802 21.8318 12.217 21.306 12.048C20.7802 11.879 20.217 12.1682 20.048 12.694L18.75 16.7321L17.452 12.694C17.3191 12.2804 16.9344 12 16.5 12C16.0656 12 15.6809 12.2804 15.548 12.694L14.25 16.7321L12.952 12.694Z"${attr("fill", stroke)}></path></g></svg>`);
}
const __vite_glob_0_74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WordCountIcon
}, Symbol.toStringTag, { value: "Module" }));
const icons = [
  {
    name: "Gay Pride Flag",
    categories: ["LGBT"],
    component: GayIcon
  },
  { name: "ArrowIcon", categories: [], component: ArrowIcon },
  { name: "AsexualIcon", categories: [], component: AsexualIcon },
  {
    name: "BisexualIcon",
    categories: [],
    component: BisexualIcon
  },
  {
    name: "BlankPageIcon",
    categories: [],
    component: BlankPageIcon
  },
  { name: "BoldIcon", categories: [], component: BoldIcon },
  { name: "BookIcon", categories: [], component: BookIcon },
  { name: "BugIcon", categories: [], component: BugIcon },
  {
    name: "CalendarIcon",
    categories: [],
    component: CalendarIcon
  },
  { name: "CatIcon", categories: [], component: CatIcon },
  {
    name: "CharacterCountIcon",
    categories: [],
    component: CharacterCountIcon
  },
  {
    name: "CircledPlusIcon",
    categories: [],
    component: CircledPlusIcon
  },
  { name: "ClockIcon", categories: [], component: ClockIcon },
  { name: "CloseIcon", categories: [], component: CloseIcon },
  {
    name: "ColorPaletteIcon",
    categories: [],
    component: ColorPaletteIcon
  },
  { name: "DashIcon", categories: [], component: DashIcon },
  { name: "DiceIcon", categories: [], component: DiceIcon },
  {
    name: "EllipsisIcon",
    categories: [],
    component: EllipsisIcon
  },
  { name: "EyeIcon", categories: [], component: EyeIcon },
  {
    name: "FichteanCurveIcon",
    categories: [],
    component: FichteanCurveIcon
  },
  { name: "FilterIcon", categories: [], component: FilterIcon },
  { name: "FolderIcon", categories: [], component: FolderIcon },
  { name: "GayIcon", categories: [], component: GayIcon },
  { name: "GearIcon", categories: [], component: GearIcon },
  { name: "GraphIcon", categories: [], component: GraphIcon },
  { name: "HexagonIcon", categories: [], component: HexagonIcon },
  {
    name: "HeterosexualIcon",
    categories: [],
    component: HeterosexualIcon
  },
  {
    name: "HomosexualIcon",
    categories: [],
    component: HomosexualIcon
  },
  { name: "IOIcon", categories: [], component: IOIcon },
  { name: "ItalicIcon", categories: [], component: ItalicIcon },
  {
    name: "KeyboardKeyIcon",
    categories: [],
    component: KeyboardKeyIcon
  },
  { name: "LesbianIcon", categories: [], component: LesbianIcon },
  { name: "LicenseIcon", categories: [], component: LicenseIcon },
  {
    name: "LineSpacingIcon",
    categories: [],
    component: LineSpacingIcon
  },
  {
    name: "LocationIcon",
    categories: [],
    component: LocationIcon
  },
  { name: "LockIcon", categories: [], component: LockIcon },
  {
    name: "MarkdownIcon",
    categories: [],
    component: MarkdownIcon
  },
  {
    name: "MinimizeIcon",
    categories: [],
    component: MinimizeIcon
  },
  { name: "MoonIcon", categories: [], component: MoonIcon },
  {
    name: "NumberSignIcon",
    categories: [],
    component: NumberSignIcon
  },
  { name: "PackageIcon", categories: [], component: PackageIcon },
  { name: "PageIcon", categories: [], component: PageIcon },
  {
    name: "PansexualIcon",
    categories: [],
    component: PansexualIcon
  },
  {
    name: "ParagraphIcon",
    categories: [],
    component: ParagraphIcon
  },
  { name: "PencilIcon", categories: [], component: PencilIcon },
  { name: "PersonIcon", categories: [], component: PersonIcon },
  { name: "PlugIcon", categories: [], component: PlugIcon },
  { name: "PlusIcon", categories: [], component: PlusIcon },
  { name: "PrivacyIcon", categories: [], component: PrivacyIcon },
  { name: "PyramidIcon", categories: [], component: PyramidIcon },
  {
    name: "QuestionMarkIcon",
    categories: [],
    component: QuestionMarkIcon
  },
  { name: "RenameIcon", categories: [], component: RenameIcon },
  { name: "ReticleIcon", categories: [], component: ReticleIcon },
  { name: "RulerIcon", categories: [], component: RulerIcon },
  { name: "SaveIcon", categories: [], component: SaveIcon },
  { name: "ScaleIcon", categories: [], component: ScaleIcon },
  {
    name: "SevenPointStructureIcon",
    categories: [],
    component: SevenPointStructureIcon
  },
  {
    name: "SplitHorizontalIcon",
    categories: [],
    component: SplitHorizontalIcon
  },
  {
    name: "SpreadsheetIcon",
    categories: [],
    component: SpreadsheetIcon
  },
  { name: "SproutIcon", categories: [], component: SproutIcon },
  { name: "StartupIcon", categories: [], component: StartupIcon },
  { name: "SunIcon", categories: [], component: SunIcon },
  { name: "SwordIcon", categories: [], component: SwordIcon },
  { name: "TextIcon", categories: [], component: TextIcon },
  { name: "TheaterIcon", categories: [], component: TheaterIcon },
  {
    name: "TransferIcon",
    categories: [],
    component: TransferIcon
  },
  { name: "TrashIcon", categories: [], component: TrashIcon },
  { name: "TreeIcon", categories: [], component: TreeIcon },
  {
    name: "UnderlineIcon",
    categories: [],
    component: UnderlineIcon
  },
  { name: "UndoIcon", categories: [], component: UndoIcon },
  {
    name: "UnlockedIcon",
    categories: [],
    component: UnlockedIcon
  },
  {
    name: "VersionControlIcon",
    categories: [],
    component: VersionControlIcon
  },
  {
    name: "WeightScaleIcon",
    categories: [],
    component: WeightScaleIcon
  },
  { name: "WheelIcon", categories: [], component: WheelIcon },
  {
    name: "WordCountIcon",
    categories: [],
    component: WordCountIcon
  }
];
function getIcon(identifier) {
  if (typeof identifier === "string") return icons.find((icon2) => icon2.name === identifier);
  if ("categories" in identifier) return icons.find((icon2) => icon2.name === identifier.name);
  return icons.find((icon2) => icon2.component === identifier);
}
Debug.test(getIcon("GearIcon"), "Can get gear icon by name.", import.meta.url);
Debug.test(getIcon(GearIcon), "Can get gear icon by component.", import.meta.url);
const modules = /* @__PURE__ */ Object.assign({
  "../../components/icons/ArrowIcon.svelte": __vite_glob_0_0,
  "../../components/icons/AsexualIcon.svelte": __vite_glob_0_1,
  "../../components/icons/BisexualIcon.svelte": __vite_glob_0_2,
  "../../components/icons/BlankPageIcon.svelte": __vite_glob_0_3,
  "../../components/icons/BoldIcon.svelte": __vite_glob_0_4,
  "../../components/icons/BookIcon.svelte": __vite_glob_0_5,
  "../../components/icons/BugIcon.svelte": __vite_glob_0_6,
  "../../components/icons/CalendarIcon.svelte": __vite_glob_0_7,
  "../../components/icons/CatIcon.svelte": __vite_glob_0_8,
  "../../components/icons/CharacterCountIcon.svelte": __vite_glob_0_9,
  "../../components/icons/CircledPlusIcon.svelte": __vite_glob_0_10,
  "../../components/icons/ClockIcon.svelte": __vite_glob_0_11,
  "../../components/icons/CloseIcon.svelte": __vite_glob_0_12,
  "../../components/icons/ColorPaletteIcon.svelte": __vite_glob_0_13,
  "../../components/icons/DashIcon.svelte": __vite_glob_0_14,
  "../../components/icons/DiceIcon.svelte": __vite_glob_0_15,
  "../../components/icons/EllipsisIcon.svelte": __vite_glob_0_16,
  "../../components/icons/EyeIcon.svelte": __vite_glob_0_17,
  "../../components/icons/FichteanCurveIcon.svelte": __vite_glob_0_18,
  "../../components/icons/FilterIcon.svelte": __vite_glob_0_19,
  "../../components/icons/FolderIcon.svelte": __vite_glob_0_20,
  "../../components/icons/GayIcon.svelte": __vite_glob_0_21,
  "../../components/icons/GearIcon.svelte": __vite_glob_0_22,
  "../../components/icons/GraphIcon.svelte": __vite_glob_0_23,
  "../../components/icons/HeterosexualIcon.svelte": __vite_glob_0_24,
  "../../components/icons/HexagonIcon.svelte": __vite_glob_0_25,
  "../../components/icons/HomosexualIcon.svelte": __vite_glob_0_26,
  "../../components/icons/IOIcon.svelte": __vite_glob_0_27,
  "../../components/icons/ItalicIcon.svelte": __vite_glob_0_28,
  "../../components/icons/KeyboardKeyIcon.svelte": __vite_glob_0_29,
  "../../components/icons/LesbianIcon.svelte": __vite_glob_0_30,
  "../../components/icons/LicenseIcon.svelte": __vite_glob_0_31,
  "../../components/icons/LineSpacingIcon.svelte": __vite_glob_0_32,
  "../../components/icons/LocationIcon.svelte": __vite_glob_0_33,
  "../../components/icons/LockIcon.svelte": __vite_glob_0_34,
  "../../components/icons/MarkdownIcon.svelte": __vite_glob_0_35,
  "../../components/icons/MinimizeIcon.svelte": __vite_glob_0_36,
  "../../components/icons/MoonIcon.svelte": __vite_glob_0_37,
  "../../components/icons/NumberSignIcon.svelte": __vite_glob_0_38,
  "../../components/icons/PackageIcon.svelte": __vite_glob_0_39,
  "../../components/icons/PageIcon.svelte": __vite_glob_0_40,
  "../../components/icons/PansexualIcon.svelte": __vite_glob_0_41,
  "../../components/icons/ParagraphIcon.svelte": __vite_glob_0_42,
  "../../components/icons/PencilIcon.svelte": __vite_glob_0_43,
  "../../components/icons/PersonIcon.svelte": __vite_glob_0_44,
  "../../components/icons/PlugIcon.svelte": __vite_glob_0_45,
  "../../components/icons/PlusIcon.svelte": __vite_glob_0_46,
  "../../components/icons/PrivacyIcon.svelte": __vite_glob_0_47,
  "../../components/icons/PyramidIcon.svelte": __vite_glob_0_48,
  "../../components/icons/QuestionMarkIcon.svelte": __vite_glob_0_49,
  "../../components/icons/RenameIcon.svelte": __vite_glob_0_50,
  "../../components/icons/ReticleIcon.svelte": __vite_glob_0_51,
  "../../components/icons/RulerIcon.svelte": __vite_glob_0_52,
  "../../components/icons/SaveIcon.svelte": __vite_glob_0_53,
  "../../components/icons/ScaleIcon.svelte": __vite_glob_0_54,
  "../../components/icons/SevenPointStructureIcon.svelte": __vite_glob_0_55,
  "../../components/icons/SplitHorizontalIcon.svelte": __vite_glob_0_56,
  "../../components/icons/SpreadsheetIcon.svelte": __vite_glob_0_57,
  "../../components/icons/SproutIcon.svelte": __vite_glob_0_58,
  "../../components/icons/StartupIcon.svelte": __vite_glob_0_59,
  "../../components/icons/SunIcon.svelte": __vite_glob_0_60,
  "../../components/icons/SwordIcon.svelte": __vite_glob_0_61,
  "../../components/icons/TextIcon.svelte": __vite_glob_0_62,
  "../../components/icons/TheaterIcon.svelte": __vite_glob_0_63,
  "../../components/icons/TransferIcon.svelte": __vite_glob_0_64,
  "../../components/icons/TrashIcon.svelte": __vite_glob_0_65,
  "../../components/icons/TreeIcon.svelte": __vite_glob_0_66,
  "../../components/icons/UnderlineIcon.svelte": __vite_glob_0_67,
  "../../components/icons/UndoIcon.svelte": __vite_glob_0_68,
  "../../components/icons/UnlockedIcon.svelte": __vite_glob_0_69,
  "../../components/icons/UnregisteredIcon.svelte": __vite_glob_0_70,
  "../../components/icons/VersionControlIcon.svelte": __vite_glob_0_71,
  "../../components/icons/WeightScaleIcon.svelte": __vite_glob_0_72,
  "../../components/icons/WheelIcon.svelte": __vite_glob_0_73,
  "../../components/icons/WordCountIcon.svelte": __vite_glob_0_74
});
for (const path in modules) {
  let component = modules[path].default;
  const iconName = path.split("/").pop().replace(/\.svelte$/, "");
  if (!getIcon(iconName)) {
    if (iconName === "UnregisteredIcon") {
      Debug.success(`The icon "UnregisteredIcon" has not been registered. This icon is not used and acts as a test that registry validation correctly detects unregistered icons.`, import.meta.url);
    } else {
      Debug.warn(`The icon "${iconName}" has not been registered. This may cause issues if the icon is used. Adding a default registry entry for it.`, import.meta.url);
      icons.push({ name: iconName, categories: [], component });
    }
  }
}
class Color {
  red = assignedLater();
  green = assignedLater();
  blue = assignedLater();
  alpha = assignedLater();
  constructor(red, green, blue, alpha = 1) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  serialize() {
    return this.hex;
  }
  static deserialize(color) {
    return Color.hex(color);
  }
  static get black() {
    return Color.rgb(0, 0, 0);
  }
  static get white() {
    return Color.rgb(255, 255, 255);
  }
  static rgb(red, green, blue, alpha = 1) {
    return new Color(red, green, blue, alpha);
  }
  static css(name, alpha = 1) {
    let { r, g, b } = cssColorMap[name];
    return new Color(r, g, b, alpha);
  }
  static from(value) {
    if (typeof value === "string") return Color.hex(value);
    if (Array.isArray(value)) return Color.rgb(value[0], value[1], value[2]);
    if ("r" in value) return Color.rgb(value.r, value.g, value.b);
    return value.clone();
  }
  clone() {
    return new Color(this.red, this.green, this.blue);
  }
  get name() {
    return Object.values(namer(this.hex)).map((nameList) => ({ name: nameList[0].name, distance: nameList[0].distance })).toSorted((a, b) => a.distance - b.distance)[0].name;
  }
  get hue() {
    return this.hsl.h;
  }
  get saturation() {
    return this.hsl.s;
  }
  get lightness() {
    return this.hsl.l;
  }
  get value() {
    return this.hsv.v;
  }
  static tryHex(color) {
    try {
      return Color.hex(color);
    } catch (error) {
      return null;
    }
  }
  static hex(color) {
    if (color.startsWith("#")) color = color.substring(1);
    if (color.length === 3 || color.length === 4) {
      color = color.split("").map((c) => c + c).join("");
    }
    let alpha = 1;
    if (color.length === 8) {
      alpha = parseInt(color.substring(6, 8), 16) / 255;
      color = color.substring(0, 6);
    }
    if (color.length !== 6) throw new Error("Invalid hex color: #" + color);
    const rgb = [0, 0, 0];
    for (let segment = 0; segment < 3; segment++) {
      rgb[segment] = parseInt(color.substring(segment * 2, segment * 2 + 2), 16);
    }
    return new Color(rgb[0], rgb[1], rgb[2], alpha);
  }
  static hsl(h, s, l, alpha = 1) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return new Color(Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4)), alpha);
  }
  static hsv(h, s, v, alpha = 1) {
    s /= 100;
    v /= 100;
    const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return new Color(Math.round(255 * f(5)), Math.round(255 * f(3)), Math.round(255 * f(1)), alpha);
  }
  get rgb() {
    return this.red << 16 | this.green << 8 | this.blue;
  }
  get hex() {
    const toHex = (c) => c.toString(16).padStart(2, "0");
    let hex = `#${toHex(this.red)}${toHex(this.green)}${toHex(this.blue)}`;
    if (this.alpha < 1) hex += toHex(Math.round(this.alpha * 255));
    return hex.toUpperCase();
  }
  get hsl() {
    const r = this.red / 255, g = this.green / 255, b = this.blue / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
  get hsv() {
    const r = this.red / 255, g = this.green / 255, b = this.blue / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = max === 0 ? 0 : (max - min) / max, v = max;
    if (max !== min) {
      const d = max - min;
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }
  get brightness() {
    return (this.red * 299 + this.green * 587 + this.blue * 114) / 1e3;
  }
  get luma() {
    return 0.2126 * this.red + 0.7152 * this.green + 0.0722 * this.blue;
  }
  get constrastColor() {
    return this.luma >= 165 ? new Color(0, 0, 0) : new Color(255, 255, 255);
  }
  contrastRatio(other) {
    const l1 = Math.max(this.luma, other.luma) / 255;
    const l2 = Math.min(this.luma, other.luma) / 255;
    return (l1 + 0.05) / (l2 + 0.05);
  }
  /**
   * Linearly interpolates (lerp) between this color and another.
   * @param other The color to mix with.
   * @param ratio A value between 0 and 1 (0 = this, 1 = other).
   */
  mix(other, ratio) {
    ratio = Math.max(0, Math.min(1, ratio));
    const r = Math.round(this.red + (other.red - this.red) * ratio);
    const g = Math.round(this.green + (other.green - this.green) * ratio);
    const b = Math.round(this.blue + (other.blue - this.blue) * ratio);
    const a = this.alpha + (other.alpha - this.alpha) * ratio;
    return new Color(r, g, b, a);
  }
  lighten(amount) {
    const { h, s, l } = this.hsl;
    return Color.hsl(h, s, Math.min(100, l + amount), this.alpha);
  }
  darken(amount) {
    const { h, s, l } = this.hsl;
    return Color.hsl(h, s, Math.max(0, l - amount), this.alpha);
  }
  saturate(amount) {
    const { h, s, l } = this.hsl;
    return Color.hsl(h, Math.min(100, s + amount), l, this.alpha);
  }
  desaturate(amount) {
    const { h, s, l } = this.hsl;
    return Color.hsl(h, Math.max(0, s - amount), l, this.alpha);
  }
  toString() {
    if (this.alpha === 1) {
      return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha.toFixed(2)})`;
  }
}
const cssColorMap = {
  aliceblue: { r: 240, g: 248, b: 255 },
  antiquewhite: { r: 250, g: 235, b: 215 },
  aqua: { r: 0, g: 255, b: 255 },
  aquamarine: { r: 127, g: 255, b: 212 },
  azure: { r: 240, g: 255, b: 255 },
  beige: { r: 245, g: 245, b: 220 },
  bisque: { r: 255, g: 228, b: 196 },
  black: { r: 0, g: 0, b: 0 },
  blanchedalmond: { r: 255, g: 235, b: 205 },
  blue: { r: 0, g: 0, b: 255 },
  blueviolet: { r: 138, g: 43, b: 226 },
  brown: { r: 165, g: 42, b: 42 },
  burlywood: { r: 222, g: 184, b: 135 },
  cadetblue: { r: 95, g: 158, b: 160 },
  chartreuse: { r: 127, g: 255, b: 0 },
  chocolate: { r: 210, g: 105, b: 30 },
  coral: { r: 255, g: 127, b: 80 },
  cornflowerblue: { r: 100, g: 149, b: 237 },
  cornsilk: { r: 255, g: 248, b: 220 },
  crimson: { r: 220, g: 20, b: 60 },
  cyan: { r: 0, g: 255, b: 255 },
  darkblue: { r: 0, g: 0, b: 139 },
  darkcyan: { r: 0, g: 139, b: 139 },
  darkgoldenrod: { r: 184, g: 134, b: 11 },
  darkgray: { r: 169, g: 169, b: 169 },
  darkgreen: { r: 0, g: 100, b: 0 },
  darkgrey: { r: 169, g: 169, b: 169 },
  darkkhaki: { r: 189, g: 183, b: 107 },
  darkmagenta: { r: 139, g: 0, b: 139 },
  darkolivegreen: { r: 85, g: 107, b: 47 },
  darkorange: { r: 255, g: 140, b: 0 },
  darkorchid: { r: 153, g: 50, b: 204 },
  darkred: { r: 139, g: 0, b: 0 },
  darksalmon: { r: 233, g: 150, b: 122 },
  darkseagreen: { r: 143, g: 188, b: 143 },
  darkslateblue: { r: 72, g: 61, b: 139 },
  darkslategray: { r: 47, g: 79, b: 79 },
  darkslategrey: { r: 47, g: 79, b: 79 },
  darkturquoise: { r: 0, g: 206, b: 209 },
  darkviolet: { r: 148, g: 0, b: 211 },
  deeppink: { r: 255, g: 20, b: 147 },
  deepskyblue: { r: 0, g: 191, b: 255 },
  dimgray: { r: 105, g: 105, b: 105 },
  dimgrey: { r: 105, g: 105, b: 105 },
  dodgerblue: { r: 30, g: 144, b: 255 },
  firebrick: { r: 178, g: 34, b: 34 },
  floralwhite: { r: 255, g: 250, b: 240 },
  forestgreen: { r: 34, g: 139, b: 34 },
  fuchsia: { r: 255, g: 0, b: 255 },
  gainsboro: { r: 220, g: 220, b: 220 },
  ghostwhite: { r: 248, g: 248, b: 255 },
  gold: { r: 255, g: 215, b: 0 },
  goldenrod: { r: 218, g: 165, b: 32 },
  gray: { r: 128, g: 128, b: 128 },
  green: { r: 0, g: 128, b: 0 },
  greenyellow: { r: 173, g: 255, b: 47 },
  grey: { r: 128, g: 128, b: 128 },
  honeydew: { r: 240, g: 255, b: 240 },
  hotpink: { r: 255, g: 105, b: 180 },
  indianred: { r: 205, g: 92, b: 92 },
  indigo: { r: 75, g: 0, b: 130 },
  ivory: { r: 255, g: 255, b: 240 },
  khaki: { r: 240, g: 230, b: 140 },
  lavender: { r: 230, g: 230, b: 250 },
  lavenderblush: { r: 255, g: 240, b: 245 },
  lawngreen: { r: 124, g: 252, b: 0 },
  lemonchiffon: { r: 255, g: 250, b: 205 },
  lightblue: { r: 173, g: 216, b: 230 },
  lightcoral: { r: 240, g: 128, b: 128 },
  lightcyan: { r: 224, g: 255, b: 255 },
  lightgoldenrodyellow: { r: 250, g: 250, b: 210 },
  lightgray: { r: 211, g: 211, b: 211 },
  lightgreen: { r: 144, g: 238, b: 144 },
  lightgrey: { r: 211, g: 211, b: 211 },
  lightpink: { r: 255, g: 182, b: 193 },
  lightsalmon: { r: 255, g: 160, b: 122 },
  lightseagreen: { r: 32, g: 178, b: 170 },
  lightskyblue: { r: 135, g: 206, b: 250 },
  lightslategray: { r: 119, g: 136, b: 153 },
  lightslategrey: { r: 119, g: 136, b: 153 },
  lightsteelblue: { r: 176, g: 196, b: 222 },
  lightyellow: { r: 255, g: 255, b: 224 },
  lime: { r: 0, g: 255, b: 0 },
  limegreen: { r: 50, g: 205, b: 50 },
  linen: { r: 250, g: 240, b: 230 },
  magenta: { r: 255, g: 0, b: 255 },
  maroon: { r: 128, g: 0, b: 0 },
  mediumaquamarine: { r: 102, g: 205, b: 170 },
  mediumblue: { r: 0, g: 0, b: 205 },
  mediumorchid: { r: 186, g: 85, b: 211 },
  mediumpurple: { r: 147, g: 112, b: 219 },
  mediumseagreen: { r: 60, g: 179, b: 113 },
  mediumslateblue: { r: 123, g: 104, b: 238 },
  mediumspringgreen: { r: 0, g: 250, b: 154 },
  mediumturquoise: { r: 72, g: 209, b: 204 },
  mediumvioletred: { r: 199, g: 21, b: 133 },
  midnightblue: { r: 25, g: 25, b: 112 },
  mintcream: { r: 245, g: 255, b: 250 },
  mistyrose: { r: 255, g: 228, b: 225 },
  moccasin: { r: 255, g: 228, b: 181 },
  navajowhite: { r: 255, g: 222, b: 173 },
  navy: { r: 0, g: 0, b: 128 },
  oldlace: { r: 253, g: 245, b: 230 },
  olive: { r: 128, g: 128, b: 0 },
  olivedrab: { r: 107, g: 142, b: 35 },
  orange: { r: 255, g: 165, b: 0 },
  orangered: { r: 255, g: 69, b: 0 },
  orchid: { r: 218, g: 112, b: 214 },
  palegoldenrod: { r: 238, g: 232, b: 170 },
  palegreen: { r: 152, g: 251, b: 152 },
  paleturquoise: { r: 175, g: 238, b: 238 },
  palevioletred: { r: 219, g: 112, b: 147 },
  papayawhip: { r: 255, g: 239, b: 213 },
  peachpuff: { r: 255, g: 218, b: 185 },
  peru: { r: 205, g: 133, b: 63 },
  pink: { r: 255, g: 192, b: 203 },
  plum: { r: 221, g: 160, b: 221 },
  powderblue: { r: 176, g: 224, b: 230 },
  purple: { r: 128, g: 0, b: 128 },
  rebeccapurple: { r: 102, g: 51, b: 153 },
  red: { r: 255, g: 0, b: 0 },
  rosybrown: { r: 188, g: 143, b: 143 },
  royalblue: { r: 65, g: 105, b: 225 },
  saddlebrown: { r: 139, g: 69, b: 19 },
  salmon: { r: 250, g: 128, b: 114 },
  sandybrown: { r: 244, g: 164, b: 96 },
  seagreen: { r: 46, g: 139, b: 87 },
  seashell: { r: 255, g: 245, b: 238 },
  sienna: { r: 160, g: 82, b: 45 },
  silver: { r: 192, g: 192, b: 192 },
  skyblue: { r: 135, g: 206, b: 235 },
  slateblue: { r: 106, g: 90, b: 205 },
  slategray: { r: 112, g: 128, b: 144 },
  slategrey: { r: 112, g: 128, b: 144 },
  snow: { r: 255, g: 250, b: 250 },
  springgreen: { r: 0, g: 255, b: 127 },
  steelblue: { r: 70, g: 130, b: 180 },
  tan: { r: 210, g: 180, b: 140 },
  teal: { r: 0, g: 128, b: 128 },
  thistle: { r: 216, g: 191, b: 216 },
  tomato: { r: 255, g: 99, b: 71 },
  turquoise: { r: 64, g: 224, b: 208 },
  violet: { r: 238, g: 130, b: 238 },
  wheat: { r: 245, g: 222, b: 179 },
  white: { r: 255, g: 255, b: 255 },
  whitesmoke: { r: 245, g: 245, b: 245 },
  yellow: { r: 255, g: 255, b: 0 },
  yellowgreen: { r: 154, g: 205, b: 50 }
};
class DateTime {
  month = assignedLater();
  day = assignedLater();
  serialize() {
    todo("implement ser/de on datetime");
  }
  static deserialize(date) {
    todo("implement ser/de on datetime");
  }
}
class MeasurementTypeInstance {
  _tag = "type instance";
}
class Measurement {
  count_ = assignedLater();
  constructor(value) {
    this.count_ = value;
  }
  serialize() {
    return { count: this.count, units: this.unit().abbreviation() };
  }
  static deserialize(measurement) {
    const builder = units[measurement.units];
    return new builder(measurement.count);
  }
  to(unit) {
    return unit.fromStandard(this.toStandard());
  }
  get count() {
    return this.count_;
  }
}
class Length extends MeasurementTypeInstance {
  static of(value, unit) {
    return new unit(value);
  }
  static units() {
    return [Meters, Kilometers];
  }
  static standard() {
    return Meters;
  }
  static name() {
    return "length";
  }
}
class Meters extends Measurement {
  _meters = true;
  clone() {
    return new Meters(this.count);
  }
  type() {
    return Length;
  }
  toStandard() {
    return this;
  }
  unit() {
    return Meters;
  }
  static fromStandard(value) {
    return value;
  }
  static abbreviation() {
    return "m";
  }
}
class Kilometers extends Measurement {
  _kilometers = true;
  clone() {
    return new Kilometers(this.count);
  }
  type() {
    return Length;
  }
  toStandard() {
    return Length.of(this.count * 1e3, Meters);
  }
  static fromStandard(value) {
    return Length.of(value.count / 1e3, Kilometers);
  }
  unit() {
    return Kilometers;
  }
  static abbreviation() {
    return "km";
  }
}
class Weight extends MeasurementTypeInstance {
  static of(value, unit) {
    return new unit(value);
  }
  static units() {
    return [Kilograms, Grams];
  }
  static standard() {
    return Kilograms;
  }
  static name() {
    return "weight";
  }
}
class Kilograms extends Measurement {
  _kilograms = true;
  clone() {
    return new Kilograms(this.count);
  }
  type() {
    return Weight;
  }
  toStandard() {
    return this;
  }
  unit() {
    return Kilograms;
  }
  static fromStandard(value) {
    return value;
  }
  static abbreviation() {
    return "kg";
  }
}
class Grams extends Measurement {
  _grams = true;
  clone() {
    return new Grams(this.count);
  }
  type() {
    return Weight;
  }
  toStandard() {
    return Weight.of(this.count * 1e3, Kilograms);
  }
  static fromStandard(value) {
    return Weight.of(value.count / 1e3, Grams);
  }
  unit() {
    return Grams;
  }
  static abbreviation() {
    return "g";
  }
}
const units = { m: Meters, km: Kilometers, kg: Kilograms, g: Grams };
class PrimitiveArrayAttribute {
  values = assignedLater();
  constructor(value) {
    this.values = value;
  }
  serialize() {
    return this.values;
  }
}
class PrimitiveAttributeValue {
  value = assignedLater();
  constructor(value) {
    this.value = value;
  }
  serialize() {
    return this.value;
  }
}
class StringAttribute extends PrimitiveAttributeValue {
  static deserialize(value) {
    return new StringAttribute(value);
  }
}
class NumberAttribute extends PrimitiveAttributeValue {
  static deserialize(value) {
    return new NumberAttribute(value);
  }
}
class EntriesAttribute extends PrimitiveArrayAttribute {
  static deserialize(value) {
    return new EntriesAttribute(value);
  }
}
class ImmutableContainer {
  data = assignedLater();
  constructor(data) {
    this.data = data;
  }
  clone() {
    if (Array.isArray(this.data)) return this.data.map((item) => item.clone());
    return this.data.clone();
  }
  cloneContainer() {
    return new Container(this.clone());
  }
  ref() {
    return this.data;
  }
}
class Container extends ImmutableContainer {
  overwrite(data) {
    this.data = data;
  }
  bindSet() {
    return (value) => {
      this.overwrite(value);
    };
  }
  bindGet() {
    return () => this.ref();
  }
}
class Style {
  bold = assignedLater();
  italic = assignedLater();
  constructor({ bold, italic }) {
    this.bold = bold;
    this.italic = italic;
  }
  clone() {
    return new Style({ bold: this.bold, italic: this.italic });
  }
  equals(other) {
    return this.bold === other.bold && this.italic === other.italic;
  }
}
class StyledText {
  text = assignedLater();
  style = assignedLater();
  constructor(text, style) {
    this.text = text;
    this.style = new Container(new Style({ bold: style.bold ?? false, italic: style.italic ?? false }));
  }
  clone() {
    return new StyledText(this.text, { bold: this.style.ref().bold, italic: this.style.ref().italic });
  }
  toHTML(index, addCursor = false) {
    let element = document.createElement("pre");
    element.setAttribute("data-part-index", `${index}`);
    let html2 = "";
    if (this.style.ref().bold) html2 += "<b>";
    for (let character of this.text) {
      if (character === "\n") {
        html2 += "<br>";
      } else {
        html2 += `<span class="character">${character}</span>`;
      }
    }
    if (this.style.ref().bold) html2 += "</b>";
    if (addCursor) html2 += "<span class='cursor'>|</span>";
    element.innerHTML = html2;
    return element;
  }
}
class RichText {
  parts = assignedLater();
  constructor(parts) {
    this.parts = parts ?? [];
    if (this.parts.length < 1) this.parts = [
      new StyledText("", new Style({ bold: false, italic: false }))
    ];
  }
  serialize() {
    return {
      parts: this.parts.map((part) => ({
        text: part.text,
        style: { bold: part.style.ref().bold, italic: part.style.ref().italic }
      }))
    };
  }
  static deserialize(doc) {
    return new RichText(doc.parts.map((part) => new StyledText(part.text, part.style)));
  }
  addPart(part) {
    this.parts.push(part);
  }
  addPartAtIndex(part, index) {
    this.parts.splice(index, 0, part);
  }
  prependPart(part) {
    this.parts.unshift(part);
  }
  clone() {
    return new RichText();
  }
  partAtIndex(index) {
    return new Container(this.parts[index]);
  }
  toHTML(cursor) {
    return this.parts.map((part, index) => part.toHTML(index, cursor ?? false));
  }
  some(callback) {
    return this.parts.some(callback);
  }
  filter(predicate) {
    return new RichText(this.parts.map((part) => part.clone()).filter(predicate));
  }
  partCount() {
    return this.parts.length;
  }
}
function attributeType(name, type, icon2) {
  return {
    icon: getIcon(icon2),
    name,
    type,
    serialize(value) {
      return value.serialize();
    },
    deserialize(value) {
      return type.deserialize(value);
    }
  };
}
const attributeTypes = [
  attributeType("shortText", StringAttribute, TextIcon),
  attributeType("longText", RichText, ParagraphIcon),
  attributeType("number", NumberAttribute, NumberSignIcon),
  attributeType("color", Color, ColorPaletteIcon),
  attributeType("entries", EntriesAttribute, GraphIcon),
  attributeType("date", DateTime, CalendarIcon),
  attributeType("length", Measurement, RulerIcon),
  attributeType("weight", Measurement, WeightScaleIcon)
];
var AttributeType;
((AttributeType2) => {
  function fromName(name) {
    return attributeTypes.find((type) => type.name === name);
  }
  AttributeType2.fromName = fromName;
  function fromValue(value) {
    return attributeTypes.find((type) => value instanceof type.type);
  }
  AttributeType2.fromValue = fromValue;
  function names() {
    return attributeTypes.map((type) => type.name);
  }
  AttributeType2.names = names;
})(AttributeType || (AttributeType = {}));
class AttributeDefinition {
  name = assignedLater();
  type = assignedLater();
  id_ = assignedLater();
  group = assignedLater();
  static nextID = 0;
  constructor(name, type, group, id) {
    this.name = name;
    this.type = type;
    this.group = group;
    this.id_ = id ?? AttributeDefinition.nextID++;
  }
  serialize() {
    return {
      name: this.name,
      type: this.type.name,
      id: this.id_,
      groupId: this.group.id
    };
  }
  static deserialize(attribute, group) {
    if (AttributeDefinition.nextID <= attribute.id) AttributeDefinition.nextID = attribute.id + 1;
    const definition = new AttributeDefinition(attribute.name, AttributeType.fromName(attribute.type), null);
    definition.group = group;
    return definition;
  }
  get id() {
    return this.id_;
  }
  static basic(name, type) {
    return (group) => new AttributeDefinition(name, AttributeType.fromName(type), group);
  }
}
var AttributeValue;
((AttributeValue2) => {
  function deserialize(value) {
    return AttributeType.fromName(value.type).deserialize(value.value);
  }
  AttributeValue2.deserialize = deserialize;
  function serialize(value) {
    return {
      type: AttributeType.fromValue(value).name,
      value: value.serialize()
    };
  }
  AttributeValue2.serialize = serialize;
})(AttributeValue || (AttributeValue = {}));
let nextID = 0;
class TreeNode {
  static paddingMultiplier = 1.1;
  parent_ = assignedLater();
  outline_ = assignedLater();
  /**
   * A unique numeric ID for this tree node. Some notes on this:
   *
   * - Every tree node has a unique ID, **except tree nodes from differen't trees**. Tree nodes from
   * different trees **may or may not** have the same ID.
   * - IDs tell you nothing about the structure or data of the node&mdash;the node with ID
   * 0 is not necessarily the root, for example, and a node with ID 1 is not necessarily its child
   * - IDs are not reused when nodes are deleted in the current implementation. The ID of a deleted
   * node remains a null pointer forever.
   * - No IDs are guaranteed to exist&mdash;Just because you have a reference to a node of ID 12 doesn't
   * mean there exists one with ID 11.
   */
  id;
  constructor() {
    this.id = nextID++;
  }
  get parent() {
    return this.parent_;
  }
  get siblingCountIncludingMe() {
    return this.parent?.children.length ?? 1;
  }
  get index() {
    if (!this.parent) return null;
    return this.parent.children.indexOf(this.self);
  }
  calculateIntrinsicSize() {
    this.children.forEach((child) => child.calculateIntrinsicSize());
    if (this.isLeaf()) {
      this.outline_ = GraphOutline.originCircle(15);
    } else if (this.isntGrandparent) {
      this.outline_ = GraphOutline.originCircle(this.children.length * 75 + 150);
    } else if (this.hasOnlyChild) {
      this.outline_ = GraphOutline.originCircle(this.children[0].outline_.shape.radius * TreeNode.paddingMultiplier);
    } else {
      let maxChildRadius = Math.max(...this.children.map((c) => c.outline_.shape.radius));
      maxChildRadius *= TreeNode.paddingMultiplier;
      const { parentRadius } = getPrettyPacking(this.children.length, maxChildRadius);
      this.outline_ = GraphOutline.originCircle(parentRadius);
    }
    return this.outline_.shape.radius;
  }
  applyLayout(targetRadius, parentCenter) {
    const scaleFactor = targetRadius / this.outline_.shape.radius;
    this.outline_.shape.radius = targetRadius;
    if (!this.parent) {
      this.outline_.shape.center = Point2D.origin();
    } else if (this.hasNoChildrenOrNiblings) {
      const dist = this.parent.outline_.shape.radius * 0.6;
      const angle = this.index * (2 * Math.PI) / this.siblingCountIncludingMe;
      this.outline_.shape.center = Point2D.polar(dist, angle).plus(parentCenter);
    } else if (this.isOnlyChild) {
      this.outline_.shape.center = parentCenter;
    } else {
      let siblingMax = Math.max(...this.siblingsIncludingMe.map((s) => s.outline_.shape.radius));
      const { circles } = getPrettyPacking(this.siblingCountIncludingMe, siblingMax);
      this.outline_.shape.center = parentCenter.plus(circles[this.index]);
    }
    const maxChildRadius = this.children.length > 0 ? Math.max(...this.children.map((c) => c.outline_.shape.radius)) * scaleFactor : 0;
    this.children.forEach((child) => {
      child.applyLayout(maxChildRadius, this.outline_.shape.center);
    });
  }
  resetLayout() {
    this.clearLayoutCache();
    const intrinsicRadius = this.calculateIntrinsicSize();
    let targetRadius = intrinsicRadius;
    let startCenter = Point2D.origin();
    if (this.parent) {
      targetRadius = Math.max(...this.siblingsIncludingMe.map((sibling) => sibling.outline_.shape.radius));
      startCenter = this.parent.outline_.shape.center;
    }
    this.applyLayout(targetRadius, startCenter);
  }
  resetColors() {
    if (!this.parent) {
      this.outline_.color = Color.hex("#181825");
      this.outline_.isVisible = false;
    } else this.outline_.color = this.parent.outline_.color.darken(2);
    this.children.forEach((child) => child.resetColors());
  }
  /**
   * Makes all nodes visible, assembling them all together again.
   */
  thanksgivingDinner() {
    this.root().dfs().forEach((node) => node.outline.isVisible = true);
  }
  cutOff() {
    this.root().dfs().filter((node) => node !== this.self && !node.isDescendantOf(this.self)).forEach((node) => node.outline.isVisible = false);
  }
  shift(amount) {
    let difference = new Point2D(amount);
    this.outline.shape.center = this.outline.shape.center.plus(difference);
    this.children.forEach((child) => child.shift(amount));
  }
  clearLayoutCache() {
    this.outline_ = assignedLater();
    this.children.forEach((child) => child.clearLayoutCache());
  }
  get hasOnlyLeaves() {
    return this.children.every((child) => child.isLeaf);
  }
  get isntGrandparent() {
    return this.children.every((child) => child.isLeaf());
  }
  get hasNoGrandchildren() {
    return this.children.every((child) => child.isBranch());
  }
  get hasNoChildrenOrNiblings() {
    return this.siblingsIncludingMe.every((sibling) => sibling.isLeaf());
  }
  get isOnlyChild() {
    return this.siblingCountIncludingMe === 1;
  }
  get hasChildren() {
    return this.children.length > 0;
  }
  get hasOnlyChild() {
    return this.children.length === 1;
  }
  get siblingsIncludingMe() {
    return this.parent?.children ?? [this.self];
  }
  get previousSibling() {
    return this.parent && this.index > 0 ? this.parent?.children[this.index - 1] : null;
  }
  generateOutline() {
    if (this.outline_) return;
    this.root().resetLayout();
    this.root().resetColors();
  }
  get outline() {
    this.generateOutline();
    return this.outline_;
  }
  root() {
    let root = this.self;
    while (root.parent) root = root.parent;
    return root;
  }
  isOverlapping() {
    return this.cousins.some((node) => node.outline.shape.overlaps(this.outline.shape, this.outline.shape.radius / 100));
  }
  isEscapingParent() {
    if (!this.parent) return false;
    return !this.parent.outline.shape.contains(this.outline.shape, this.outline.shape.radius / 100);
  }
  wouldEscapeParentIfShifted(point) {
    if (!this.parent) return false;
    let newCenter = this.outline.shape.center.plus(point);
    let newShape = this.outline.shape.clone();
    newShape.center = newCenter;
    return !this.parent.outline.shape.contains(this.outline.shape, this.outline.shape.radius / 100);
  }
  wouldOverlapIfShifted(point) {
    let newCenter = this.outline.shape.center.plus(point);
    let newShape = this.outline.shape.clone();
    newShape.center = newCenter;
    return this.cousins.some((node) => node.outline.shape.overlaps(newShape, this.outline.shape.radius / 2));
  }
  getCollisionConstrainedShift(desiredShift) {
    let [dx, dy] = desiredShift;
    const myShape = this.outline.shape;
    const cousins = this.cousins;
    for (const node of cousins) {
      const other = node.outline.shape;
      const minDistance = myShape.radius + other.radius - 0.1;
      const nextCenter = myShape.center.plus([dx, dy]);
      const nextDistance = nextCenter.distanceTo(other.center);
      if (nextDistance < minDistance) {
        const angle = Math.atan2(nextCenter.y - other.center.y, nextCenter.x - other.center.x);
        const safePointX = other.center.x + Math.cos(angle) * minDistance;
        const safePointY = other.center.y + Math.sin(angle) * minDistance;
        dx = safePointX - myShape.center.x;
        dy = safePointY - myShape.center.y;
      }
    }
    return [dx, dy];
  }
  get cousins() {
    return this.root().dfs().filter((node) => node !== this.self && !node.isDescendantOf(this.self) && !this.isDescendantOf(node));
  }
  isDescendantOf(other) {
    if (!this.parent) return false;
    if (this.parent === other) return true;
    return this.parent.isDescendantOf(other);
  }
  get isRoot() {
    return !this.parent;
  }
  get height() {
    return 1 + this.children.map((child) => child.height).reduce((max, height) => Math.max(max, height), 0);
  }
  dfs() {
    let visited = [];
    visited.push(this.self);
    this.children.forEach((child) => {
      visited = [...visited, ...child.dfs()];
    });
    return visited;
  }
  dfsLeaves() {
    let visited = [];
    if (this.isLeaf()) visited.push(this);
    this.children.forEach((child) => {
      let childLeaves = child.isBranch() ? child.dfsLeaves() : [child];
      visited = [...visited, ...childLeaves];
    });
    return visited;
  }
  dfsBranches() {
    let visited = [];
    if (this.isBranch()) visited.push(this);
    this.children.forEach((child) => {
      let childLeaves = child.isBranch() ? child.dfsBranches() : [];
      visited = [...visited, ...childLeaves];
    });
    return visited;
  }
  dfsYoungParents() {
    let visited = [];
    if (this.isBranch() && this.children[0].isLeaf()) visited.push(this);
    this.children.forEach((child) => {
      let childLeaves = child.isBranch() ? child.dfsYoungParents() : [];
      visited = [...visited, ...childLeaves];
    });
    return visited;
  }
}
class TreeLeaf extends TreeNode {
  _treeLeaf = void 0;
  get children() {
    return [];
  }
  get self() {
    return this;
  }
  isLeaf() {
    return true;
  }
  isBranch() {
    return false;
  }
}
class TreeBranch extends TreeNode {
  leaves = [];
  branches = [];
  constructor(...children) {
    super();
    children.forEach((child) => this.addChild(child));
  }
  addChild(child) {
    if (child.isLeaf()) this.leaves.push(child);
    else this.branches.push(child);
    child.parent_ = this;
  }
  filterChildrenInPlace(predicate) {
    this.leaves = this.leaves.filter(predicate);
    this.branches = this.branches.filter(predicate);
  }
  get children() {
    return [...this.leaves, ...this.branches];
  }
  get self() {
    return this;
  }
  isLeaf() {
    return false;
  }
  isBranch() {
    return true;
  }
}
class GraphOutline {
  shape = assignedLater();
  color = Color.black;
  isVisible = true;
  constructor(shape, color) {
    this.shape = shape;
    this.color = color;
  }
  static originCircle(radius) {
    return new GraphOutline(new Circle(radius, Point2D.origin()), Color.black);
  }
  static fromShapeAndColor(shape, color) {
    return new GraphOutline(shape, color);
  }
}
class Item extends TreeLeaf {
  attributes = assignedLater();
  constructor(value) {
    super();
    this.attributes = typeof value === "string" ? { name: new StringAttribute(value) } : value;
  }
  serialize() {
    return {
      id: this.id,
      attributes: Objects.mapValues(this.attributes, (attribute) => attribute ? AttributeValue.serialize(attribute) : null)
    };
  }
  static deserializeUnsafe(item) {
    let created = new Item(Objects.mapValues(item.attributes, (attribute) => attribute ? AttributeValue.deserialize(attribute) : null));
    created.id = item.id;
    return created;
  }
  getAttributeValue(name) {
    return this.attributes[name] ?? null;
  }
  overwriteAttributeValue(name, value) {
    if (!this.getAttributeValue(name)) {
      throw `Invalid attribute overwrite: Attempted to overwrite the attribute "${name}" on an item, but no such attribute exists. If this was intentional, use addNewAttributeValue().`;
    }
    this.attributes[name] = value;
  }
  addNewAttributeValue(name, value) {
    if (this.getAttributeValue(name)) {
      throw `Invalid attribute additoin: Attempted to overwrite the attribute "${name}" on an item, but no such attribute exists. If this was intentional, use addNewAttributeValue().`;
    }
    this.attributes[name] = value;
  }
  get icon() {
    if (this.isRoot) {
      return getIcon(BookIcon);
    }
    return this.parent.icon;
  }
  get name() {
    return this.attributes.name.value;
  }
  toString() {
    return `Item[ ${this.name} ]`;
  }
  dfsGroups() {
    return [];
  }
  dfsItems() {
    return [this];
  }
}
class Group extends TreeBranch {
  name = assignedLater();
  description = assignedLater();
  attributes_ = assignedLater();
  icon_ = assignedLater();
  constructor(arg, ...children) {
    super(...children);
    this.name = typeof arg === "string" ? arg : arg.name;
    this.description = typeof arg === "object" ? arg.description ?? "" : "";
    let icon2 = typeof arg === "object" ? arg.icon ?? "inherit" : "inherit";
    this.icon_ = icon2 === "inherit" ? "inherit" : getIcon(icon2);
    if (typeof arg === "object") {
      if (!arg.attributes || arg.attributes === "inherit") this.attributes_ = "inherit";
      else this.attributes_ = arg.attributes.map((attribute) => attribute(this));
    } else {
      this.attributes_ = "inherit";
    }
  }
  serializeStandalone() {
    return {
      id: this.id,
      children: this.children.map((child) => child.id),
      name: this.name,
      description: this.description,
      iconName: this.icon_ === "inherit" ? "inherit" : getIcon(this.icon).name,
      attributes: this.attributes_ === "inherit" ? { type: "inherit" } : {
        type: "own",
        own: this.attributes_.map((attribute) => attribute.serialize())
      }
    };
  }
  /**
   * Returns the icon associated with this group. If this group is set to inherit its icon from
   * its parent, the parent icon is returned.
   */
  get icon() {
    if (this.isRoot) return getIcon(BookIcon);
    if (this.icon_ === "inherit") {
      return this.parent.icon;
    } else {
      return this.icon_;
    }
  }
  deleteAttributeDefinition(attribute) {
    if (!this.getAttributeDefinition(attribute.name)) {
      throw `Error deleting attribute: Attempted to delete the attribute "${attribute}", but no such attribute exists on this object.`;
    }
    if (this.attributes_ === "inherit") {
      if (this.isRoot) return;
      this.parent.deleteAttributeDefinition(attribute);
      return;
    }
    this.attributes_ = this.attributes_.filter((other) => other !== attribute);
  }
  getAttributeDefinition(name) {
    if (this.attributes_ === "inherit") {
      if (this.isRoot) return null;
      return this.parent.getAttributeDefinition(name);
    }
    return this.attributes_.find((attribute) => attribute.name === name) ?? null;
  }
  /**
   * Defines a new attribute definition for this group. If an attribute definition with the same
   * name as the one provided already exists on this group, an error is thrown. If you intend to
   * do so, use `overwriteAttributeDefinition()`.
   *
   * @param builder The attribute builder. Generally you'll get one of these from a static method
   * on `AttributeDefinition`.
   */
  addNewAttributeDefinition(builder) {
    if (this.attributes_ === "inherit") {
      if (this.isRoot) {
        let attribute = builder(this);
        this.attributes_ = [attribute];
        return;
      }
      this.parent.addNewAttributeDefinition(builder);
    } else {
      let attribute = builder(this);
      if (this.getAttributeDefinition(attribute.name)) {
        throw `Duplicate attribute: Attempted to add the attribute "${attribute.name}", but the attribute already exists. If this was intentional, use overwriteAttribute().`;
      }
      this.attributes_.push(attribute);
    }
  }
  overwriteAttributeDefinition(builder) {
    if (this.attributes_ === "inherit") {
      if (this.isRoot) {
        let attribute2 = builder(this);
        this.attributes_ = [attribute2];
        return;
      }
      this.parent?.overwriteAttributeDefinition(builder);
      return;
    }
    let attribute = builder(this);
    let newAttributes = this.attributes_.filter((other) => other.name !== attribute.name);
    if (newAttributes.length === this.attributes_.length) {
      throw `Invalid attribute overwrite: Attempted to overwrite the attribute "${attribute.name}", but no such attribute exists. If this was intentional, use addNewAttribute().`;
    }
    this.attributes_.push(attribute);
  }
  get attributeDefinitions() {
    if (this.attributes_ === "inherit") {
      if (this.isRoot) {
        this.attributes_ = [];
        return this.attributes_;
      }
      return this.parent.attributeDefinitions;
    }
    return this.attributes_;
  }
  removeItem(item) {
    this.filterChildrenInPlace((child) => child !== item);
  }
  serialize() {
    return {
      groups: this.root().dfsGroups().map((group) => group.serializeStandalone()),
      items: this.root().dfsItems().map((item) => item.serialize()),
      root: this.root().id
    };
  }
  /**
   * Deserializes this group without building it into a tree with others. The returned node
   * **has no children or parent assigned**. This is used internally in `deserialize()` before
   * the tree is built.
   *
   * @param group The serialized group passed from the Rust backend
   *
   * @returns A deserialized group object, isolated without being part of a tree.
   */
  static deserializeUnsafe(group) {
    let created = new Group({
      name: group.name,
      description: group.description,
      icon: group.iconName === "inherit" ? "inherit" : getIcon(group.iconName),
      attributes: "inherit"
    });
    if (group.attributes.type !== "inherit") {
      created.attributes_ = group.attributes.own.map((attribute) => AttributeDefinition.deserialize(attribute, created));
    }
    created.id = group.id;
    return created;
  }
  static deserialize(database) {
    const groups = database.groups.map((group) => Group.deserializeUnsafe(group));
    const items = database.items.map((item) => Item.deserializeUnsafe(item));
    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      let group = groups[groupIndex];
      let serializedGroup = database.groups[groupIndex];
      for (let childIndex = 0; childIndex < serializedGroup.children.length; childIndex++) {
        let childID = serializedGroup.children[childIndex];
        let itemChild = items.find((item) => item.id === childID);
        if (itemChild) {
          group.addChild(itemChild);
          continue;
        }
        let groupChild = groups.find((group2) => group2.id === childID);
        if (groupChild) {
          group.addChild(groupChild);
          continue;
        }
        throw new Error(`Error deserializing database: The group "${group.name}" was serialized as having a child of ID = ${childID}, but no item with that ID exists on the serialized database object.`);
      }
    }
    const root = groups.find((group) => group.id === database.root);
    return root;
  }
  toString() {
    let items = this.children.map((child) => child.toString().split("\n")).flat().map((line) => `	${line}`).join("\n");
    return `${this.name} {
${items}
}`;
  }
  dfsGroups() {
    let visited = [this];
    this.children.forEach((child) => {
      let childLeaves = child instanceof Group ? child.dfsGroups() : [];
      visited = [...visited, ...childLeaves];
    });
    return visited;
  }
  dfsItems() {
    let visited = [];
    this.children.forEach((child) => {
      let childLeaves = child instanceof Item ? [child] : child.dfsItems();
      visited = [...visited, ...childLeaves];
    });
    return visited;
  }
}
let storedUserData = null;
function userData() {
  if (!storedUserData) {
    storedUserData = {
      templates: [
        new Group(
          {
            name: "Basic",
            icon: BookIcon,
            description: "A basic, opinionated setup with minimal scaffolding."
          },
          new Group({
            name: "Plot Events",
            icon: BookIcon,
            description: "The events of this story. The actual scene prose exists here."
          }),
          new Group({
            name: "Characters",
            icon: PersonIcon,
            description: "The characters of this story."
          }),
          new Group({
            name: "Locations",
            icon: LocationIcon,
            description: "The locations in this story.",
            attributes: [AttributeDefinition.basic("Name", "shortText")]
          })
        ),
        new Group(
          {
            name: "Three Act Structure",
            icon: TheaterIcon,
            description: "A basic, opinionated setup with minimal scaffolding."
          },
          new Group(
            {
              name: "Plot Events",
              icon: ParagraphIcon,
              description: "The events of this story. The actual scene prose exists here.",
              attributes: [
                AttributeDefinition.basic("Name", "shortText"),
                AttributeDefinition.basic("Script", "longText"),
                AttributeDefinition.basic("Notes", "longText")
              ]
            },
            new Group({ name: "Act I" }, new Group("Hook", new Group(new Group("Chapter 1", new Item("Scene 1")))), new Group("Inciting Incident"), new Group("First Plot Point")),
            new Group({ name: "Act II" }, new Group("First Pinch Point"), new Group("Midpoint"), new Group("Second Pinch Point")),
            new Group({ name: "Act III" }, new Group("Third Plot Point"), new Group("Climax"), new Group("Resolution"))
          ),
          new Group({
            name: "Characters",
            icon: PersonIcon,
            description: "The characters of this story.",
            attributes: [
              AttributeDefinition.basic("Name", "shortText"),
              AttributeDefinition.basic("Gender", "shortText"),
              AttributeDefinition.basic("Sexuality", "shortText"),
              AttributeDefinition.basic("Height", "length"),
              AttributeDefinition.basic("Partner", "entries")
            ]
          }),
          new Group({
            name: "Locations",
            icon: LocationIcon,
            description: "The locations in this story.",
            attributes: [AttributeDefinition.basic("Name", "shortText")]
          })
        ),
        new Group({
          name: "Hero's Journey",
          icon: SwordIcon,
          description: "A book outlined with the Hero's Journey structure."
        }),
        new Group({
          name: "Save the Cat",
          icon: CatIcon,
          description: "A book outlined with the Hero's Journey structure."
        }),
        new Group({
          name: "Freytag's Pyramid",
          icon: PyramidIcon,
          description: "A book outlined with the Hero's Journey structure."
        }),
        new Group({
          name: "Story Wheel",
          icon: WheelIcon,
          description: "A book outlined with the Hero's Journey structure."
        }),
        new Group({
          name: "Fichtean Curve",
          icon: FichteanCurveIcon,
          description: "A book outlined with the Hero's Journey structure."
        }),
        new Group({
          name: "Seven Point Story Structure",
          icon: SevenPointStructureIcon,
          description: "A book outlined with the Hero's Journey structure."
        }),
        new Group({
          name: "Blank",
          icon: BlankPageIcon,
          description: "A blank project with no datasets. This is not recommended for first time users; Use Basic instead."
        }),
        new Group(
          { name: "Dev", icon: GearIcon, description: "dev testing" },
          new Group(
            {
              name: "Plot Events",
              icon: ParagraphIcon,
              description: "The events of this story. The actual scene prose exists here.",
              attributes: [
                AttributeDefinition.basic("Name", "shortText"),
                AttributeDefinition.basic("Script", "longText"),
                AttributeDefinition.basic("Notes", "longText")
              ]
            },
            new Group({ name: "Act I" }, new Group("Hook", new Group(new Group("Chapter 1", new Item("Scene 1")))), new Group("Inciting Incident"), new Group("First Plot Point")),
            new Group({ name: "Act II" }, new Group("First Pinch Point"), new Group("Midpoint"), new Group("Second Pinch Point")),
            new Group({ name: "Act III" }, new Group("Third Plot Point"), new Group("Climax"), new Group("Resolution"))
          ),
          new Group(
            {
              name: "Characters",
              icon: PersonIcon,
              description: "The characters of this story.",
              attributes: [
                AttributeDefinition.basic("Name", "shortText"),
                AttributeDefinition.basic("Gender", "shortText"),
                AttributeDefinition.basic("Sexuality", "shortText"),
                AttributeDefinition.basic("Height", "length"),
                AttributeDefinition.basic("Partner", "entries")
              ]
            },
            new Group("Main Characters"),
            new Group("Side Characters")
          ),
          new Group({
            name: "Locations",
            icon: LocationIcon,
            description: "The locations in this story.",
            attributes: [AttributeDefinition.basic("Name", "shortText")]
          })
        )
      ]
    };
  }
  return storedUserData;
}
let sessionData = loadSessionData();
function loadSessionData() {
  return JSON.parse(localStorage.getItem("session-data") ?? JSON.stringify({ lastProjectPath: null }));
}
function saveSessionData() {
  localStorage.setItem("session-data", JSON.stringify(sessionData));
}
function cache(values) {
  sessionData = { ...sessionData, ...values };
  saveSessionData();
}
class Project {
  location = assignedLater();
  database = assignedLater();
  constructor({ location, database }) {
    this.location = location;
    this.database = database;
  }
  static set(project) {
    currentProject = project;
    Debug.info("Set new project:");
    Debug.log(`${project.database}`);
    cache({
      lastProjectPath: `${project.location}/${project.database.name}`
    });
  }
  static get() {
    return currentProject;
  }
  static deserialize(project) {
    return new Project({
      location: project.location,
      database: Group.deserialize(project.database)
    });
  }
  serialize() {
    return { location: this.location, database: this.database.serialize() };
  }
  static async openFromLocation(location) {
    const serializedProject = await invoke("read_project", { path: location });
    const project = Project.deserialize(serializedProject);
    Project.set(project);
  }
  static async open() {
    const selected = await open({
      directory: true,
      multiple: false,
      title: "Select a directory"
    });
    if (typeof selected === "string") {
      const serializedProject = await invoke("read_project", { path: selected });
      const project = Project.deserialize(serializedProject);
      Project.set(project);
    } else {
      console.log("No directory selected");
    }
  }
  static async save() {
    let project = Project.get();
    const bytes = project.serialize();
    await invoke("save_project", { project: bytes });
  }
}
let currentProject = null;
class Mouse {
  client_ = Point2D.origin();
  offset_ = Point2D.origin();
  leftClicking_ = false;
  rightClicking_ = false;
  middleClicking_ = false;
  isMoving_ = false;
  isDragging_ = false;
  handlers = [];
  get isLeftClicking() {
    return this.leftClicking_;
  }
  get isRightClicking() {
    return this.rightClicking_;
  }
  get isMiddleClicking() {
    return this.middleClicking_;
  }
  get client() {
    return this.client_;
  }
  get offsetY() {
    return this.offset_;
  }
  relativeTo(element) {
    if (!element.offsetParent) return Point2D.origin();
    return new Point2D(this.client.x - element.offsetParent.getBoundingClientRect().left, this.client.y - element.offsetParent.getBoundingClientRect().top);
  }
  get isMoving() {
    return this.isMoving_;
  }
  get isDragging() {
    return this.isDragging_;
  }
  onClick(callback) {
    this.handlers.push({ event: "mousedown", callback });
  }
  onClickAndRelease(callback) {
    this.handlers.push({ event: "click", callback });
  }
  onRelease(callback) {
    this.handlers.push({ event: "mouseup", callback });
  }
}
let mouseState = new Mouse();
function mouse() {
  return mouseState;
}
function InputHandler($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
  });
}
function ContextMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { left = void 0, right, bottom, top = void 0, children } = $$props;
    let visible = false;
    let doneTransitioning = true;
    let transitionTimer = 0;
    let domElement = null;
    let flipX = derived(() => {
      return false;
    });
    let transformOriginX = derived(() => left ? flipX() ? "100%" : "0%" : flipX() ? "0%" : "100%");
    let transformOriginY = derived(() => top ? "0%" : "100%");
    function toggle() {
      if (visible) close2();
      else open2();
    }
    function open2() {
      if (!doneTransitioning) return;
      forceOpen();
    }
    function forceOpen() {
      doneTransitioning = false;
      visible = true;
      if (transitionTimer) clearTimeout(transitionTimer);
      transitionTimer = setTimeout(
        () => {
          doneTransitioning = true;
        },
        100
      );
    }
    function openAtMouse(event) {
      event?.preventDefault();
      let position = mouse().relativeTo(domElement);
      left = `${position.x}px`;
      top = `${position.y}px`;
      open2();
    }
    function close2() {
      if (!doneTransitioning) return;
      forceClose();
    }
    function forceClose() {
      doneTransitioning = false;
      visible = false;
      if (transitionTimer) clearTimeout(transitionTimer);
      transitionTimer = setTimeout(
        () => {
          doneTransitioning = true;
        },
        100
      );
    }
    function element() {
      return domElement;
    }
    function openingState() {
      if (doneTransitioning && visible) return "open";
      if (!doneTransitioning && visible) return "opening";
      if (doneTransitioning && !visible) return "closing";
      return "closed";
    }
    $$renderer2.push(`<section${attr_class(clsx(["context-menu", visible && "open"]), "svelte-1saxqnf")}${attr_style("", { top, bottom, right, left })}><div class="inner svelte-1saxqnf"${attr_style("", {
      scale: visible ? "100%" : "0%",
      transform: flipX() ? "translateX(-170px)" : void 0,
      "transform-origin": `${stringify(transformOriginX())} ${stringify(transformOriginY())}`
    })}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></div></section>`);
    bind_props($$props, {
      left,
      top,
      toggle,
      open: open2,
      forceOpen,
      openAtMouse,
      close: close2,
      forceClose,
      element,
      openingState
    });
  });
}
const icon = "/_app/immutable/assets/icon.CsvkJIeS.png";
let popupID = 0;
function Popup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, reset, width = "70%", height = "85%" } = $$props;
    let visible = false;
    let id = popupID++;
    function open2() {
      visible = true;
    }
    function close2() {
      visible = false;
      reset();
    }
    $$renderer2.push(`<div class="background svelte-d6p9tu" role="combobox"${attr("aria-expanded", visible)}${attr("aria-controls", `popup-${stringify(id)}`)} tabindex="0"${attr_style("", {
      "background-color": visible ? "rgba(0, 0, 0, 50%)" : "rgba(0, 0, 0, 0%)",
      "pointer-events": visible ? "auto" : "none"
    })}><section${attr_class(clsx(["popup", visible && "visible"]), "svelte-d6p9tu")}${attr("id", `popup-${stringify(id)}`)}${attr_style("", { scale: visible ? "100%" : "0%", width, height })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----> <button class="close-button svelte-d6p9tu">`);
    CloseIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
    $$renderer2.push(`<!----></button></section></div>`);
    bind_props($$props, { open: open2, close: close2 });
  });
}
function ManualPopup($$renderer, $$props) {
  let popup;
  let view = "introduction";
  function open2(viewName) {
    if (viewName) view = viewName;
    popup.open();
  }
  function reset() {
  }
  Popup($$renderer, {
    reset,
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="popup svelte-ip7hp8"><div class="sidebar svelte-ip7hp8"><h1 class="title svelte-ip7hp8"><img${attr("src", icon)} alt="wallflower" class="svelte-ip7hp8"/> Wallflower Manual</h1> <h1 class="svelte-ip7hp8">The essentials</h1> <button class="svelte-ip7hp8">`);
      SproutIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Introduction</span></button> <button class="svelte-ip7hp8">`);
      TreeIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Interface</span></button> <button class="svelte-ip7hp8">`);
      SpreadsheetIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Entries</span></button> <button class="svelte-ip7hp8">`);
      PackageIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Templates</span></button> <button class="svelte-ip7hp8">`);
      GraphIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Views</span></button> <button class="svelte-ip7hp8">`);
      PencilIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">The Editor</span></button> <button class="svelte-ip7hp8">`);
      PageIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Manuscript</span></button> <h1 class="svelte-ip7hp8">Advanced</h1> <button class="svelte-ip7hp8">`);
      RulerIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Measurements &amp; Units</span></button> <button class="svelte-ip7hp8">`);
      DiceIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Randomization</span></button> <button class="svelte-ip7hp8">`);
      IOIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Generated Attributes</span></button> <button class="svelte-ip7hp8">`);
      ParagraphIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Suggestions</span></button> <button class="svelte-ip7hp8">`);
      PlugIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Plugins</span></button> <h1 class="svelte-ip7hp8">Development</h1> <button class="svelte-ip7hp8">`);
      PlugIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Plugin Development</span></button> <button class="svelte-ip7hp8">`);
      BugIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Bug Reporting</span></button> <button class="svelte-ip7hp8">`);
      VersionControlIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Contributing</span></button> <h1 class="svelte-ip7hp8">Legal</h1> <button class="svelte-ip7hp8">`);
      LicenseIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">License</span></button> <button class="svelte-ip7hp8">`);
      PrivacyIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-ip7hp8">Privacy Policy</span></button></div> <div class="content svelte-ip7hp8">`);
      if (view === "introduction") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<h1 class="svelte-ip7hp8">Introduction</h1> <p class="svelte-ip7hp8">Welcome to Wallflower!</p> <p class="svelte-ip7hp8">Wallflower is a data editor designed for novel writing. Wallflower lets you keep track of your characters, scenes,
					locations, and more, and visualize how they all connect to one another. You can write scenes independently in their own
					documents, and automatically join them all into a full manuscript. Additionally, Wallflower comes with a bunch of little
					utilities for novel writing—name generators, structure templates, randomizers, location mapping, and more.</p> <p class="svelte-ip7hp8">Technically, Wallflower can be used to hold any kind of data—not just novels. That being said, it's designed for
					long-form novel writing, and works best as a tool for that.</p> <p class="svelte-ip7hp8">Wallflower has always been and will always be a <i class="svelte-ip7hp8">completely free tool.</i> Writing is beautiful, and I refuse to be exploitative or predatory in an artisic industry that's already overly bureaucratized.</p> <div class="nav-buttons svelte-ip7hp8"><button class="next svelte-ip7hp8">Next</button></div>`);
      } else if (view === "interface") {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<h1 class="svelte-ip7hp8">Interface</h1> <p class="svelte-ip7hp8">Wallflower is divided into <i class="svelte-ip7hp8">panes.</i> You can think of a pane like a window— It's its own little workspace with tabs and settings. Panes are divided into
					multiple <i class="svelte-ip7hp8">tabs</i> . Each tab holds one group or editor—don't worry about those right now, we'll talk more about that later. Panes can
					be infinitely split horizontally or vertically into more panes.</p>`);
      } else if (view === "entries") {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<h1 class="svelte-ip7hp8">Groups</h1> <h1 class="svelte-ip7hp8">Attributes &amp; Items</h1> <p class="svelte-ip7hp8"><i class="svelte-ip7hp8">Attributes</i> are where all of your actual data lives. Your characters physical appearances, location information, and even your actual
					prose will all be stored as attributes.</p> <p class="svelte-ip7hp8">Generally you'll be editing your attributes in the <i class="svelte-ip7hp8">spreadsheet view.</i> One notable exception to this is any longText data with formatting like bold and italics, which can be edited in the <i class="svelte-ip7hp8">editor</i> panel. This is where your actual writing will take place.</p>`);
      } else if (view === "license") {
        $$renderer2.push("<!--[3-->");
        $$renderer2.push(`<h1 class="svelte-ip7hp8">License</h1> <p class="svelte-ip7hp8">The Wallflower project is FOSS and licensed under the <i class="svelte-ip7hp8">Attribution-NonCommercial-ShareAlike 4.0 International</i> license. The TL;DR is, you can copy, redistribute, and modify the code as much as you'd like, as long as it's:</p> <ul class="svelte-ip7hp8"><li class="svelte-ip7hp8"><b class="svelte-ip7hp8">Attributed</b> - You must link to the original project</li> <li class="svelte-ip7hp8"><b class="svelte-ip7hp8">Non-Commercial</b> - You cannot use any form of this code for profit or commercial gain, including modified and old versions.</li> <li class="svelte-ip7hp8"><b class="svelte-ip7hp8">Share-Alike</b> - Any versions, adaptations, or redistributions you release of the project's code <b class="svelte-ip7hp8">must be licensed under this same license.</b></li></ul> <p class="svelte-ip7hp8">That's pretty much it. I'd like to think it's mostly common sense—credit me, don't sell my work, and don't let
					others sell your work. Wallflower was designed to be a free community tool for all to use, and I will not see it made
					predatory.</p> <p class="svelte-ip7hp8">The full license spec is below.</p> <h2 class="svelte-ip7hp8">Attribution-NonCommercial-ShareAlike 4.0 International</h2> <p class="svelte-ip7hp8">Creative Commons Corporation ("Creative Commons") is not a law firm and does not provide legal services or legal advice.
					Distribution of Creative Commons public licenses does not create a lawyer-client or other relationship. Creative Commons
					makes its licenses and related information available on an "as-is" basis. Creative Commons gives no warranties regarding
					its licenses, any material licensed under their terms and conditions, or any related information. Creative Commons
					disclaims all liability for damages resulting from their use to the fullest extent possible.</p> <p class="svelte-ip7hp8">Using Creative Commons Public Licenses</p> <p class="svelte-ip7hp8">Creative Commons public licenses provide a standard set of terms and conditions that creators and other rights holders
					may use to share original works of authorship and other material subject to copyright and certain other rights specified
					in the public license below. The following considerations are for informational purposes only, are not exhaustive, and
					do not form part of our licenses.</p> <p class="indent svelte-ip7hp8">Considerations for licensors: Our public licenses are intended for use by those authorized to give the public permission
					to use material in ways otherwise restricted by copyright and certain other rights. Our licenses are irrevocable.
					Licensors should read and understand the terms and conditions of the license they choose before applying it. Licensors
					should also secure all rights necessary before applying our licenses so that the public can reuse the material as
					expected. Licensors should clearly mark any material not subject to the license. This includes other CC- licensed
					material, or material used under an exception or limitation to copyright. More considerations for licensors:
					wiki.creativecommons.org/Considerations_for_licensors</p> <p class="indent svelte-ip7hp8">Considerations for the public: By using one of our public licenses, a licensor grants the public permission to use the
					licensed material under specified terms and conditions. If the licensor's permission is not necessary for any
					reason--for example, because of any applicable exception or limitation to copyright--then that use is not regulated by
					the license. Our licenses grant only permissions under copyright and certain other rights that a licensor has authority
					to grant. Use of the licensed material may still be restricted for other reasons, including because others have
					copyright or other rights in the material. A licensor may make special requests, such as asking that all changes be
					marked or described. Although not required by our licenses, you are encouraged to respect those requests where
					reasonable. More considerations for the public: wiki.creativecommons.org/Considerations_for_licensees</p> <hr/> <h1 class="svelte-ip7hp8">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License</h1> <p class="svelte-ip7hp8">By exercising the Licensed Rights (defined below), You accept and agree to be bound by the terms and conditions of this
					Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License ("Public License"). To the extent
					this Public License may be interpreted as a contract, You are granted the Licensed Rights in consideration of Your
					acceptance of these terms and conditions, and the Licensor grants You such rights in consideration of benefits the
					Licensor receives from making the Licensed Material available under these terms and conditions.</p> <h2 class="svelte-ip7hp8">Section 1 - Definitions.</h2> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Adapted Material means material subject to Copyright and Similar Rights that is derived from or based upon the
							Licensed Material and in which the Licensed Material is translated, altered, arranged, transformed, or otherwise
							modified in a manner requiring permission under the Copyright and Similar Rights held by the Licensor. For purposes
							of this Public License, where the Licensed Material is a musical work, performance, or sound recording, Adapted
							Material is always produced where the Licensed Material is synched in timed relation with a moving image.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Adapter's License means the license You apply to Your Copyright and Similar Rights in Your contributions to Adapted
							Material in accordance with the terms and conditions of this Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">BY-NC-SA Compatible License means a license listed at creativecommons.org/compatiblelicenses, approved by Creative
							Commons as essentially the equivalent of this Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Copyright and Similar Rights means copyright and/or similar rights closely related to copyright including, without
							limitation, performance, broadcast, sound recording, and Sui Generis Database Rights, without regard to how the
							rights are labeled or categorized. For purposes of this Public License, the rights specified in Section 2(b)(1)-(2)
							are not Copyright and Similar Rights.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Effective Technological Measures means those measures that, in the absence of proper authority, may not be
							circumvented under laws fulfilling obligations under Article 11 of the WIPO Copyright Treaty adopted on December 20,
							1996, and/or similar international agreements.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Exceptions and Limitations means fair use, fair dealing, and/or any other exception or limitation to Copyright and
							Similar Rights that applies to Your use of the Licensed Material.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">License Elements means the license attributes listed in the name of a Creative Commons Public License. The License
							Elements of this Public License are Attribution, NonCommercial, and ShareAlike.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Licensed Material means the artistic or literary work, database, or other material to which the Licensor applied
							this Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Licensed Rights means the rights granted to You subject to the terms and conditions of this Public License, which
							are limited to all Copyright and Similar Rights that apply to Your use of the Licensed Material and that the
							Licensor has authority to license.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Licensor means the individual(s) or entity(ies) granting rights under this Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">NonCommercial means not primarily intended for or directed towards commercial advantage or monetary compensation.
							For purposes of this Public License, the exchange of the Licensed Material for other material subject to Copyright
							and Similar Rights by digital file-sharing or similar means is NonCommercial provided there is no payment of
							monetary compensation in connection with the exchange.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Share means to provide material to the public by any means or process that requires permission under the Licensed
							Rights, such as reproduction, public display, public performance, distribution, dissemination, communication, or
							importation, and to make material available to the public including in ways that members of the public may access
							the material from a place and at a time individually chosen by them.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Sui Generis Database Rights means rights other than copyright resulting from Directive 96/9/EC of the European
							Parliament and of the Council of 11 March 1996 on the legal protection of databases, as amended and/or succeeded, as
							well as other essentially equivalent rights anywhere in the world.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">You means the individual or entity exercising the Licensed Rights under this Public License. Your has a
							corresponding meaning.</p></li></ol> <h2 class="svelte-ip7hp8">Section 2 - Scope.</h2> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">a. License grant.</p> <ol><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">1. Subject to the terms and conditions of this Public License, the Licensor hereby grants You a worldwide,
									royalty-free, non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights in the
									Licensed Material to:</p> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">a. reproduce and Share the Licensed Material, in whole or in part, for NonCommercial purposes only; and</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">b. produce, reproduce, and Share Adapted Material for NonCommercial purposes only.</p></li></ol></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">2. Exceptions and Limitations. For the avoidance of doubt, where Exceptions and Limitations apply to Your use,
									this Public License does not apply, and You do not need to comply with its terms and conditions.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">3. Term. The term of this Public License is specified in Section 6(a).</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">4. Media and formats; technical modifications allowed. The Licensor authorizes You to exercise the Licensed
									Rights in all media and formats whether now known or hereafter created, and to make technical modifications
									necessary to do so. The Licensor waives and/or agrees not to assert any right or authority to forbid You from
									making technical modifications necessary to exercise the Licensed Rights, including technical modifications
									necessary to circumvent Effective Technological Measures. For purposes of this Public License, simply making
									modifications authorized by this Section 2(a) (4) never produces Adapted Material.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">5. Downstream recipients.</p> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">a. Offer from the Licensor -- Licensed Material. Every recipient of the Licensed Material automatically
											receives an offer from the Licensor to exercise the Licensed Rights under the terms and conditions of this
											Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">b. Additional offer from the Licensor -- Adapted Material. Every recipient of Adapted Material from You
											automatically receives an offer from the Licensor to exercise the Licensed Rights in the Adapted Material
											under the conditions of the Adapter's License You apply.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">c. No downstream restrictions. You may not offer or impose any additional or different terms or conditions
											on, or apply any Effective Technological Measures to, the Licensed Material if doing so restricts exercise
											of the Licensed Rights by any recipient of the Licensed Material.</p></li></ol></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">6. No endorsement. Nothing in this Public License constitutes or may be construed as permission to assert or
									imply that You are, or that Your use of the Licensed Material is, connected with, or sponsored, endorsed, or
									granted official status by, the Licensor or others designated to receive attribution as provided in Section
									3(a)(1)(A)(i).</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">b. Other rights.</p> <ol><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">1. Moral rights, such as the right of integrity, are not licensed under this Public License, nor are
											publicity, privacy, and/or other similar personality rights; however, to the extent possible, the Licensor
											waives and/or agrees not to assert any such rights held by the Licensor to the limited extent necessary to
											allow You to exercise the Licensed Rights, but not otherwise.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">2. Patent and trademark rights are not licensed under this Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">3. To the extent possible, the Licensor waives any right to collect royalties from You for the exercise of
											the Licensed Rights, whether directly or through a collecting society under any voluntary or waivable
											statutory or compulsory licensing scheme. In all other cases the Licensor expressly reserves any right to
											collect such royalties, including when the Licensed Material is used other than for NonCommercial purposes.</p></li></ol></li></ol> <h2 class="svelte-ip7hp8">Section 3 - License Conditions.</h2> <p class="svelte-ip7hp8">Your exercise of the Licensed Rights is expressly made subject to the following conditions.</p> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Attribution.</p> <ol><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">1. If You Share the Licensed Material (including in modified form), You must:</p> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">retain the following if it is supplied by the Licensor with the Licensed Material:</p> <ol type="i"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">identification of the creator(s) of the Licensed Material and any others designated to receive
															attribution, in any reasonable manner requested by the Licensor (including by pseudonym if
															designated);</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">ii. a copyright notice;</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">a notice that refers to this Public License;</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">a notice that refers to the disclaimer of warranties;</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">a URI or hyperlink to the Licensed Material to the extent reasonably practicable;</p></li></ol></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">b. indicate if You modified the Licensed Material and retain an indication of any previous
													modifications; and</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">c. indicate the Licensed Material is licensed under this Public License, and include the text of, or the
													URI or hyperlink to, this Public License.</p></li></ol></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">2. You may satisfy the conditions in Section 3(a)(1) in any reasonable manner based on the medium, means,
											and context in which You Share the Licensed Material. For example, it may be reasonable to satisfy the
											conditions by providing a URI or hyperlink to a resource that includes the required information.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">3. If requested by the Licensor, You must remove any of the information required by Section 3(a)(1)(A) to
											the extent reasonably practicable.</p></li></ol></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">ShareAlike.</p> <p class="svelte-ip7hp8">In addition to the conditions in Section 3(a), if You Share Adapted Material You produce, the following
									conditions also apply.</p> <ol><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">1. The Adapter's License You apply must be a Creative Commons license with the same License Elements, this
											version or later, or a BY-NC-SA Compatible License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">2. You must include the text of, or the URI or hyperlink to, the Adapter's License You apply. You may
											satisfy this condition in any reasonable manner based on the medium, means, and context in which You Share
											Adapted Material.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">3. You may not offer or impose any additional or different terms or conditions on, or apply any Effective
											Technological Measures to, Adapted Material that restrict exercise of the rights granted under the Adapter's
											License You apply.</p></li></ol></li></ol> <h2 class="svelte-ip7hp8">Section 4 - Sui Generis Database Rights.</h2> <p class="svelte-ip7hp8">Where the Licensed Rights include Sui Generis Database Rights that apply to Your use of the Licensed Material:</p> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">for the avoidance of doubt, Section 2(a)(1) grants You the right to extract, reuse, reproduce, and Share all or
									a substantial portion of the contents of the database for NonCommercial purposes only;</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">if You include all or a substantial portion of the database contents in a database in which You have Sui Generis
									Database Rights, then the database in which You have Sui Generis Database Rights (but not its individual
									contents) is Adapted Material, including for purposes of Section 3(b); and</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">You must comply with the conditions in Section 3(a) if You Share all or a substantial portion of the contents of
									the database.</p></li></ol> <p class="svelte-ip7hp8">For the avoidance of doubt, this Section 4 supplements and does not replace Your obligations under this Public
							License where the Licensed Rights include other Copyright and Similar Rights.</p> <h2 class="svelte-ip7hp8">Section 5 - Disclaimer of Warranties and Limitation of Liability.</h2> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">a. UNLESS OTHERWISE SEPARATELY UNDERTAKEN BY THE LICENSOR, TO THE EXTENT POSSIBLE, THE LICENSOR OFFERS THE
									LICENSED MATERIAL AS-IS AND AS-AVAILABLE, AND MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND CONCERNING THE
									LICENSED MATERIAL, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHER. THIS INCLUDES, WITHOUT LIMITATION, WARRANTIES
									OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ABSENCE OF LATENT OR OTHER
									DEFECTS, ACCURACY, OR THE PRESENCE OR ABSENCE OF ERRORS, WHETHER OR NOT KNOWN OR DISCOVERABLE. WHERE DISCLAIMERS
									OF WARRANTIES ARE NOT ALLOWED IN FULL OR IN PART, THIS DISCLAIMER MAY NOT APPLY TO YOU.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">b. TO THE EXTENT POSSIBLE, IN NO EVENT WILL THE LICENSOR BE LIABLE TO YOU ON ANY LEGAL THEORY (INCLUDING,
									WITHOUT LIMITATION, NEGLIGENCE) OR OTHERWISE FOR ANY DIRECT, SPECIAL, INDIRECT, INCIDENTAL, CONSEQUENTIAL,
									PUNITIVE, EXEMPLARY, OR OTHER LOSSES, COSTS, EXPENSES, OR DAMAGES ARISING OUT OF THIS PUBLIC LICENSE OR USE OF
									THE LICENSED MATERIAL, EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSSES, COSTS, EXPENSES,
									OR DAMAGES. WHERE A LIMITATION OF LIABILITY IS NOT ALLOWED IN FULL OR IN PART, THIS LIMITATION MAY NOT APPLY TO
									YOU.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">c. The disclaimer of warranties and limitation of liability provided above shall be interpreted in a manner
									that, to the extent possible, most closely approximates an absolute disclaimer and waiver of all liability.</p></li></ol> <h2 class="svelte-ip7hp8">Section 6 - Term and Termination.</h2> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">This Public License applies for the term of the Copyright and Similar Rights licensed here. However, if You fail
									to comply with this Public License, then Your rights under this Public License terminate automatically.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Where Your right to use the Licensed Material has terminated under Section 6(a), it reinstates:</p> <ol><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">1. automatically as of the date the violation is cured, provided it is cured within 30 days of Your
											discovery of the violation; or</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">2. upon express reinstatement by the Licensor.</p></li></ol> <p class="svelte-ip7hp8">For the avoidance of doubt, this Section 6(b) does not affect any right the Licensor may have to seek remedies
									for Your violations of this Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">For the avoidance of doubt, the Licensor may also offer the Licensed Material under separate terms or conditions
									or stop distributing the Licensed Material at any time; however, doing so will not terminate this Public
									License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Sections 1, 5, 6, 7, and 8 survive termination of this Public License.</p></li></ol> <h2 class="svelte-ip7hp8">Section 7 - Other Terms and Conditions.</h2> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">The Licensor shall not be bound by any additional or different terms or conditions communicated by You unless
									expressly agreed.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Any arrangements, understandings, or agreements regarding the Licensed Material not stated herein are separate
									from and independent of the terms and conditions of this Public License.</p></li></ol> <h2 class="svelte-ip7hp8">Section 8 - Interpretation.</h2> <ol type="a"><li class="svelte-ip7hp8"><p class="svelte-ip7hp8">For the avoidance of doubt, this Public License does not, and shall not be interpreted to, reduce, limit,
									restrict, or impose conditions on any use of the Licensed Material that could lawfully be made without
									permission under this Public License.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">To the extent possible, if any provision of this Public License is deemed unenforceable, it shall be
									automatically reformed to the minimum extent necessary to make it enforceable. If the provision cannot be
									reformed, it shall be severed from this Public License without affecting the enforceability of the remaining
									terms and conditions.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">No term or condition of this Public License will be waived and no failure to comply consented to unless
									expressly agreed to by the Licensor.</p></li> <li class="svelte-ip7hp8"><p class="svelte-ip7hp8">Nothing in this Public License constitutes or may be interpreted as a limitation upon, or waiver of, any
									privileges and immunities that apply to the Licensor or You, including from the legal processes of any
									jurisdiction or authority.</p></li></ol> <hr/> <p class="svelte-ip7hp8">Creative Commons is not a party to its public licenses. Notwithstanding, Creative Commons may elect to apply one of
							its public licenses to material it publishes and in those instances will be considered the “Licensor.” The text of
							the Creative Commons public licenses is dedicated to the public domain under the CC0 Public Domain Dedication.
							Except for the limited purpose of indicating that material is shared under a Creative Commons public license or as
							otherwise permitted by the Creative Commons policies published at creativecommons.org/policies, Creative Commons
							does not authorize the use of the trademark "Creative Commons" or any other trademark or logo of Creative Commons
							without its prior written consent including, without limitation, in connection with any unauthorized modifications
							to any of its public licenses or any other arrangements, understandings, or agreements concerning use of licensed
							material. For the avoidance of doubt, this paragraph does not form part of the public licenses.</p> <p class="svelte-ip7hp8">Creative Commons may be contacted at creativecommons.org.</p></li></ol>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    },
    $$slots: { default: true }
  });
  bind_props($$props, { open: open2 });
}
function LittleButton($$renderer, $$props) {
  let {
    Icon,
    accent = "#b4befe",
    scale = 1,
    $$slots,
    $$events,
    ...attributes$1
  } = $$props;
  $$renderer.push(`<button${attributes({ ...attributes$1 }, "svelte-1g3nbt2", void 0, { "--accent": accent })}>`);
  if (Icon) {
    $$renderer.push("<!--[-->");
    Icon($$renderer, {
      stroke: "var(--stroke)",
      style: `width: ${stringify(scale)}rem; height: ${stringify(scale)}rem;`
    });
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
  $$renderer.push(`</button>`);
}
function Select($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      options,
      locked = false,
      lockable = void 0,
      onunlock = (unlock2) => {
        unlock2();
      },
      itemOverride,
      value = void 0,
      title = void 0,
      children,
      width = "20rem",
      height = "fit-content",
      additionalButtonText,
      additionalButtonClick,
      isError,
      emptyText = "None Selected",
      noarrow = false,
      $$slots,
      $$events,
      ...rest
    } = $$props;
    if (lockable === void 0) lockable = locked;
    let optionsVisible = false;
    function unlock() {
      locked = false;
    }
    function toggleLocked() {
      console.log("toggle", locked);
      if (!locked) {
        locked = true;
        return;
      }
      console.log("calling onunlock");
      onunlock(unlock);
    }
    $$renderer2.push(`<div${attributes({ class: "select", ...rest }, "svelte-b4ffmr", void 0, { cursor: locked ? "not-allowed" : "pointer", width })}><div class="input svelte-b4ffmr">`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="header svelte-b4ffmr"${attr_style("", {
        cursor: locked ? "not-allowed" : "pointer",
        display: "contents"
      })}>`);
      children($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<button class="header svelte-b4ffmr"${attr_style("", {
        height,
        cursor: locked ? "not-allowed" : "pointer",
        outline: isError ? "2px solid var(--red)" : "none"
      })}>`);
      if (title) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`${escape_html(title)}`);
      } else if (value) {
        $$renderer2.push("<!--[1-->");
        const option = options.find((option2) => typeof option2 !== "string" && option2.name === (typeof value === "string" ? value : value.name));
        if (option) {
          $$renderer2.push("<!--[0-->");
          if (option.icon) {
            $$renderer2.push("<!--[0-->");
            if (option.icon) {
              $$renderer2.push("<!--[-->");
              option.icon($$renderer2, {
                stroke: option.color ?? "#a6adc8",
                style: "width: 1rem; height: 1rem;"
              });
              $$renderer2.push("<!--]-->");
            } else {
              $$renderer2.push("<!--[!-->");
              $$renderer2.push("<!--]-->");
            }
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--> <span${attr_style(option.style ?? "")}>${escape_html(option.name)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`${escape_html(value)}`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`${escape_html(emptyText)}`);
      }
      $$renderer2.push(`<!--]--> `);
      if (!noarrow) {
        $$renderer2.push("<!--[0-->");
        ArrowIcon($$renderer2, {
          stroke: "#b4befe",
          style: `width: 1rem; height: 1rem; margin-left: auto; transform: rotate(${stringify("90deg")}); transition: transform 0.1s;`
        });
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (lockable) {
      $$renderer2.push("<!--[0-->");
      LittleButton($$renderer2, {
        onmousedown: toggleLocked,
        scale: 1.5,
        style: "border: 1px solid #313244;",
        Icon: locked ? LockIcon : UnlockedIcon
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div${attr_class(clsx(["options", optionsVisible]), "svelte-b4ffmr")}><!--[-->`);
    const each_array = ensure_array_like(options);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$renderer2.push(`<div${attr_style(typeof option !== "string" && option.style ? option.style : "")} class="svelte-b4ffmr">`);
      if (typeof option === "string") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`${escape_html(option)}`);
      } else {
        $$renderer2.push("<!--[-1-->");
        if (option.icon) {
          $$renderer2.push("<!--[0-->");
          if (option.icon) {
            $$renderer2.push("<!--[-->");
            option.icon($$renderer2, {
              stroke: option.color ?? "#a6adc8",
              style: "width: 1rem; height: 1rem;"
            });
            $$renderer2.push("<!--]-->");
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push("<!--]-->");
          }
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (itemOverride) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`${escape_html(itemOverride)}`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`${escape_html(option.name)}`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (additionalButtonText) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="svelte-b4ffmr">${escape_html(additionalButtonText)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { value });
  });
}
function ColorPicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = null } = $$props;
    let visible = false;
    let popup;
    let left = "0px";
    let top = "0px";
    function open2() {
      let position = mouse().relativeTo(popup);
      left = `${position.x}px`;
      top = `${position.y}px`;
      visible = true;
    }
    function hide() {
      value = previewColor;
      visible = false;
    }
    let opener;
    mouse().onClick((event) => {
      if (!event.composedPath().includes(popup) && !event.composedPath().includes(opener)) {
        hide();
      }
    });
    let previewColor = value ?? Color.hex("#b4befe");
    let boxX = 0;
    let boxY = 0;
    let sliderY = 208 * previewColor.hue / 360;
    let palette = [Color.black, Color.white];
    $$renderer2.push(`<div class="popup svelte-rczam"${attr_style("", {
      color: `${previewColor.constrastColor}`,
      "--hue": previewColor.hue,
      left,
      top,
      scale: visible ? "100%" : "0%"
    })}><div class="top svelte-rczam"><div class="picker svelte-rczam"><div class="box svelte-rczam"${attr_style("", {
      "border-color": `${previewColor.constrastColor}`,
      left: `${stringify(boxX)}px`,
      top: `${stringify(boxY)}px`
    })}></div></div> <div class="hue-picker svelte-rczam"><div class="hue-slider svelte-rczam"${attr_style("", { left: "0px", top: `${stringify(sliderY)}px` })}></div></div></div> <div class="preview svelte-rczam"${attr_style("", { background: `${previewColor}` })}>${escape_html(previewColor.name)}</div> <div class="bottom svelte-rczam"><input${attr("value", (() => previewColor.hex)())} class="svelte-rczam"/> <!--[-->`);
    const each_array = ensure_array_like(palette);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let color = each_array[$$index];
      $$renderer2.push(`<button class="palette-color svelte-rczam"${attr_style("", { background: `${color}` })}></button>`);
    }
    $$renderer2.push(`<!--]--> <button class="new palette-color svelte-rczam">`);
    PlusIcon($$renderer2, { stroke: "#cdd6f4", style: "height: 100%; aspect-ratio: 1;" });
    $$renderer2.push(`<!----></button></div> <button class="set-color svelte-rczam">Select</button></div> <button class="preview svelte-rczam"${attr_style("", {
      "background-color": `${value ?? Color.white}`,
      color: `${(value ?? Color.white).constrastColor}`
    })}>${escape_html(value?.name ?? "None")}</button> `);
    ContextMenu($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<button>`);
        TrashIcon($$renderer3, { stroke: "#f38ba8", style: "width: 1.2rem; height: 1.2rem;" });
        $$renderer3.push(`<!----> <span${attr_style("", { color: "#f37ba8" })}>Remove from palette</span></button>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
    bind_props($$props, { value, open: open2, hide });
  });
}
function LongTextInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { openEditor, context, value = void 0 } = $$props;
    $$renderer2.push(`<button${attr_class(clsx({ "settings-button": context === "settings" }), "svelte-cy07bc")}>Open in Editor</button>`);
    bind_props($$props, { value });
  });
}
function MeasurementInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = void 0, type } = $$props;
    let count = `${value?.count ?? ""}`;
    $$renderer2.push(`<div class="wrapper svelte-1j7mpkr"><input${attr("value", count)} class="svelte-1j7mpkr"/> <button class="svelte-1j7mpkr">${escape_html(type.units()[0].abbreviation())}</button> <button class="transfer svelte-1j7mpkr">`);
    TransferIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
    $$renderer2.push(`<!----></button></div>`);
    bind_props($$props, { value });
  });
}
function NumberInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = void 0, background = "transparent" } = $$props;
    $$renderer2.push(`<input${attr("value", (() => value?.value)())} class="svelte-xa90uk"${attr_style("", { background })}/>`);
    bind_props($$props, { value });
  });
}
function ShortTextInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = void 0, background = "transparent" } = $$props;
    $$renderer2.push(`<input${attr("value", (() => value?.value)())} class="svelte-1kqkp3u"${attr_style("", { background })}/>`);
    bind_props($$props, { value });
  });
}
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      type,
      value = void 0,
      openEditor,
      context = "none",
      background = "transparent"
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (type === "length") {
        $$renderer3.push("<!--[0-->");
        MeasurementInput($$renderer3, {
          type: Length,
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          }
        });
      } else if (type === "shortText") {
        $$renderer3.push("<!--[1-->");
        ShortTextInput($$renderer3, {
          background,
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          }
        });
      } else if (type === "number") {
        $$renderer3.push("<!--[2-->");
        NumberInput($$renderer3, {
          background,
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          }
        });
      } else if (type === "longText") {
        $$renderer3.push("<!--[3-->");
        LongTextInput($$renderer3, {
          context,
          openEditor,
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          }
        });
      } else if (type === "color") {
        $$renderer3.push("<!--[4-->");
        ColorPicker($$renderer3, {});
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value });
  });
}
function SettingsPopup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let popup;
    function open2(viewName) {
      if (viewName) view = viewName;
      popup.open();
    }
    let view = "appearance";
    function reset() {
    }
    Popup($$renderer2, {
      reset,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="popup svelte-1qktjv"><div class="sidebar svelte-1qktjv"><h1 class="title svelte-1qktjv">`);
        GearIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> Settings</h1> <h1 class="svelte-1qktjv">General</h1> <button class="svelte-1qktjv">`);
        ColorPaletteIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> <span class="svelte-1qktjv">Appearance</span></button> <button class="svelte-1qktjv">`);
        KeyboardKeyIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> <span class="svelte-1qktjv">Hotkeys</span></button> <button class="svelte-1qktjv">`);
        StartupIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> <span class="svelte-1qktjv">Startup</span></button> <button class="svelte-1qktjv">`);
        PlugIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> <span class="svelte-1qktjv">Plugins</span></button> <h1 class="svelte-1qktjv">Presets</h1> <button${attr_class(clsx([view === "templates" && "selected"]), "svelte-1qktjv")}>`);
        PackageIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> <span class="svelte-1qktjv">Templates</span></button> <button class="svelte-1qktjv">`);
        DiceIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> <span class="svelte-1qktjv">Randomizers</span></button> <button class="svelte-1qktjv">`);
        ParagraphIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
        $$renderer3.push(`<!----> <span class="svelte-1qktjv">Suggestions</span></button> <h1 class="svelte-1qktjv">Plugins</h1></div> <div class="content svelte-1qktjv">`);
        if (view === "appearance") {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<h1 class="svelte-1qktjv">Appearance</h1> <div class="section svelte-1qktjv"><div class="option svelte-1qktjv"><div class="left svelte-1qktjv"><h2 class="svelte-1qktjv">Theme</h2> <p class="svelte-1qktjv">Set the color theme for Wallflower.</p></div> `);
          Select($$renderer3, {
            style: "background: #1e1e2e;",
            options: ["Catppuccin Mocha"],
            value: "Catppuccin Mocha"
          });
          $$renderer3.push(`<!----></div> <div class="option svelte-1qktjv"><div class="left svelte-1qktjv"><h2 class="svelte-1qktjv">UI Scale</h2> <p class="svelte-1qktjv">Set the color theme for Wallflower.</p></div> <input class="svelte-1qktjv"/></div></div>`);
        } else if (view === "templates") {
          $$renderer3.push("<!--[1-->");
          $$renderer3.push(`<h1 style="margin-top: 1rem;" class="svelte-1qktjv">Templates</h1> <div class="templates svelte-1qktjv"><!--[-->`);
          const each_array = ensure_array_like(userData().templates);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let template = each_array[$$index];
            $$renderer3.push(`<button class="header svelte-1qktjv"><div class="svelte-1qktjv"><h1 class="svelte-1qktjv">${escape_html(template.name)}</h1> <p class="svelte-1qktjv">${escape_html(template.description)}</p></div> `);
            ArrowIcon($$renderer3, {
              stroke: "#cdd6f4",
              style: "width: 1.5rem; height: 1.5rem; rotate: 90deg;"
            });
            $$renderer3.push(`<!----></button>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        } else if (view === "template-editor") {
          $$renderer3.push("<!--[2-->");
          {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--></div></div>`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, { open: open2 });
  });
}
function HierarchyView_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      tree,
      hideRoot = false,
      subtree = false,
      demo = false,
      rightClick = onRightClick
    } = $$props;
    let expanded = hideRoot || demo;
    if (!tree) tree = Project.get().database;
    let menuTop = "";
    let menuLeft = "";
    let rightClickMenu = null;
    function onRightClick(event) {
      rightClickMenu.openAtMouse(event);
    }
    $$renderer2.push(`<section class="svelte-87xnpf">`);
    if (!hideRoot || subtree) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="node svelte-87xnpf">`);
      if (tree.isBranch()) {
        $$renderer2.push("<!--[0-->");
        PackageIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      } else {
        $$renderer2.push("<!--[-1-->");
        if (tree.icon.component) {
          $$renderer2.push("<!--[-->");
          tree.icon.component($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
      }
      $$renderer2.push(`<!--]--> <span class="node-name svelte-87xnpf" contenteditable="" spellcheck="false">`);
      const $$body = escape_html(tree.name);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</span> `);
      if (tree.isBranch()) {
        $$renderer2.push("<!--[0-->");
        ArrowIcon($$renderer2, {
          stroke: "var(--arrow)",
          style: `width: 1rem; transition: rotate 0.1s; height: 1rem; rotate: ${stringify(expanded ? "180deg" : "90deg")};`
        });
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (tree.children.length !== 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<ul${attr_class(clsx({ expanded }), "svelte-87xnpf")}${attr_style("", {
        "border-left": hideRoot ? "none" : "1px solid #45475a",
        "margin-top": subtree || !expanded ? "0px" : "0.5rem"
      })}><!--[-->`);
      const each_array = ensure_array_like(tree.children);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let child = each_array[$$index];
        $$renderer2.push(`<li${attr_style("", { "padding-left": hideRoot && tree.isRoot ? "0px" : "1.25rem" })}>`);
        HierarchyView_1($$renderer2, { demo, hideRoot, tree: child, subtree: true, rightClick });
        $$renderer2.push(`<!----></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    ContextMenu($$renderer2, {
      left: menuLeft,
      top: menuTop,
      children: ($$renderer3) => {
        $$renderer3.push(`<button>`);
        CircledPlusIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
        $$renderer3.push(`<!----> Create new item</button> <button>`);
        PackageIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
        $$renderer3.push(`<!----> Create new group</button> <hr/> <button>`);
        RenameIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
        $$renderer3.push(`<!----> <span>Rename</span></button> <button>`);
        TrashIcon($$renderer3, { stroke: "#f38ba8", style: "width: 0.85rem; height: 0.85rem;" });
        $$renderer3.push(`<!----> <span style="color: #f38ba8;">Delete</span></button>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></section>`);
  });
}
function NewProjectPopup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let popup;
    function open$1() {
      popup.open();
    }
    let settingsPopup;
    let location = "";
    let name = "";
    let template = userData().templates[0];
    let startedTypingLocation = false;
    let startedTypingName = false;
    let locationError = derived(() => {
      if (location.length === 0) return "Location cannot be empty";
      if (!/^([a-zA-Z]:)?[\w\.\/\\]+$/.test(location)) return "Location contains invalid characters";
      return null;
    });
    let nameError = derived(() => {
      if (name.length === 0) return "Name cannot be empty";
      if (!/^[\w\. ]+$/.test(name)) return "Name contains invalid characters";
      return null;
    });
    let hasErrors = derived(() => !!nameError() || !!locationError());
    let triedToCreate = false;
    function reset() {
      location = "";
      name = "";
      startedTypingLocation = false;
      startedTypingName = false;
      template = userData().templates[0];
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Popup($$renderer3, {
        reset,
        width: "50rem",
        children: ($$renderer4) => {
          var bind_get = () => template.name;
          var bind_set = (choice) => template = userData().templates.find((other) => other.name === choice);
          $$renderer4.push(`<section class="popup svelte-dmtq7h"><h1 class="svelte-dmtq7h">New Project</h1> <div${attr_class(
            clsx([
              "template",
              (nameError() || locationError()) && triedToCreate
            ]),
            "svelte-dmtq7h"
          )}><div class="svelte-dmtq7h"><h2 class="svelte-dmtq7h">Location</h2> <div class="wrapper svelte-dmtq7h"><input${attr_class(clsx([locationError() && startedTypingLocation && "invalid-input"]), "svelte-dmtq7h")}${attr("value", location)} placeholder="/path/to/books/folder"/> <button class="input-button svelte-dmtq7h">`);
          FolderIcon($$renderer4, { stroke: "#a6adc8", style: "width: 1rem; height: 1rem;" });
          $$renderer4.push(`<!----></button></div> `);
          if (locationError() && startedTypingLocation) {
            $$renderer4.push("<!--[0-->");
            $$renderer4.push(`<span class="error svelte-dmtq7h">${escape_html(locationError())}</span>`);
          } else {
            $$renderer4.push("<!--[-1-->");
          }
          $$renderer4.push(`<!--]--></div> <div class="svelte-dmtq7h"><h2 class="svelte-dmtq7h">Name</h2> <input${attr_class(clsx([nameError() && startedTypingName && "invalid-input"]), "svelte-dmtq7h")}${attr("value", name)} placeholder="Book title"/> `);
          if (nameError() && startedTypingName) {
            $$renderer4.push("<!--[0-->");
            $$renderer4.push(`<span class="error svelte-dmtq7h">${escape_html(nameError())}</span>`);
          } else {
            $$renderer4.push("<!--[-1-->");
          }
          $$renderer4.push(`<!--]--> `);
          if (!locationError() && !nameError() && startedTypingLocation && startedTypingName) {
            $$renderer4.push("<!--[0-->");
            $$renderer4.push(`<span class="svelte-dmtq7h">Project will be created at <span class="svelte-dmtq7h"${attr_style("", { color: "#cdd6f4" })}>${escape_html(location)}/${escape_html(name)}</span></span>`);
          } else {
            $$renderer4.push("<!--[-1-->");
          }
          $$renderer4.push(`<!--]--></div></div> <div class="template svelte-dmtq7h"><div class="svelte-dmtq7h"><h2 class="svelte-dmtq7h">Template</h2> <div class="templates svelte-dmtq7h"><div class="select svelte-dmtq7h">`);
          Select($$renderer4, {
            width: "calc(100% - 1.75rem)",
            options: userData().templates.map((template2) => ({ name: template2.name, icon: template2.icon.component })),
            get value() {
              return bind_get();
            },
            set value($$value) {
              bind_set($$value);
            }
          });
          $$renderer4.push(`<!----> <button class="svelte-dmtq7h">`);
          GearIcon($$renderer4, {
            stroke: "var(--stroke)",
            style: "width: 1rem; height: 1rem;",
            onmousedown: () => settingsPopup.open("templates")
          });
          $$renderer4.push(`<!----></button></div></div></div> <p class="svelte-dmtq7h">${escape_html(template.description)}</p> <div class="svelte-dmtq7h"><h2 class="svelte-dmtq7h">Entries</h2> <div class="tree svelte-dmtq7h">`);
          HierarchyView_1($$renderer4, { hideRoot: true, tree: template });
          $$renderer4.push(`<!----></div></div></div> <button${attr_class(clsx(["create-button", hasErrors() && "disabled"]), "svelte-dmtq7h")}>Create</button></section>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      SettingsPopup($$renderer3, {});
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open: open$1 });
  });
}
function ProjectSettingsPopup($$renderer, $$props) {
  let popup;
  function open2() {
    popup.open();
  }
  function reset() {
  }
  Popup($$renderer, {
    reset,
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="popup svelte-2dta6u"><div class="sidebar svelte-2dta6u"><button class="svelte-2dta6u">`);
      GearIcon($$renderer2, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer2.push(`<!----> <span class="svelte-2dta6u">General</span></button></div></div>`);
    },
    $$slots: { default: true }
  });
  bind_props($$props, { open: open2 });
}
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let projectMenu;
    let manualPopup;
    let settingsPopup;
    function close2() {
      const appWindow = getCurrentWindow();
      appWindow.close();
    }
    function minimize() {
      const appWindow = getCurrentWindow();
      appWindow.minimize();
    }
    function maximize() {
      const appWindow = getCurrentWindow();
      appWindow.toggleMaximize();
    }
    $$renderer2.push(`<nav class="svelte-d8j1hi"><div class="svelte-d8j1hi"><div class="wrapper svelte-d8j1hi">`);
    LittleButton($$renderer2, { Icon: FolderIcon, onmousedown: () => projectMenu.toggle() });
    $$renderer2.push(`<!----> `);
    ContextMenu($$renderer2, {
      top: "120%",
      left: "0px",
      children: ($$renderer3) => {
        $$renderer3.push(`<div${attr_class(clsx(["cm-button"]), "svelte-d8j1hi")}>`);
        FolderIcon($$renderer3, {
          stroke: "var(--stroke)",
          style: "width: 0.85rem; height: 0.85rem;"
        });
        $$renderer3.push(`<!----> <span>Open project</span> `);
        ArrowIcon($$renderer3, {
          stroke: "var(--stroke)",
          style: "width: 1rem; height: 1rem; rotate: 90deg; margin-left: auto;"
        });
        $$renderer3.push(`<!----> `);
        ContextMenu($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<button class="svelte-d8j1hi">`);
            ClockIcon($$renderer4, {
              stroke: "var(--stroke)",
              style: "width: 0.85rem; height: 0.85rem;"
            });
            $$renderer4.push(`<!----> <span>Recent</span></button> <button class="svelte-d8j1hi">`);
            FolderIcon($$renderer4, {
              stroke: "var(--stroke)",
              style: "width: 0.85rem; height: 0.85rem;"
            });
            $$renderer4.push(`<!----> <span>Browse</span></button>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div> <button class="svelte-d8j1hi">`);
        CircledPlusIcon($$renderer3, {
          stroke: "var(--stroke)",
          style: "width: 0.85rem; height: 0.85rem;"
        });
        $$renderer3.push(`<!----> <span>New project</span></button> <hr/> <div${attr_class(clsx(["cm-button", !Project.get() && "disabled"]), "svelte-d8j1hi")}>`);
        GearIcon($$renderer3, {
          stroke: "var(--stroke)",
          style: "width: 0.85rem; height: 0.85rem;"
        });
        $$renderer3.push(`<!----> <span>Project settings</span></div> <button${attr("disabled", !Project.get(), true)} class="svelte-d8j1hi">`);
        SaveIcon($$renderer3, {
          stroke: "var(--stroke)",
          style: "width: 0.85rem; height: 0.85rem;"
        });
        $$renderer3.push(`<!----> <span>Save project</span></button> <button${attr("disabled", !Project.get(), true)} class="svelte-d8j1hi">`);
        SaveIcon($$renderer3, {
          stroke: "var(--stroke)",
          style: "width: 0.85rem; height: 0.85rem;"
        });
        $$renderer3.push(`<!----> <span>Save project as...</span></button>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> `);
    LittleButton($$renderer2, { Icon: GearIcon, onmousedown: () => settingsPopup.open() });
    $$renderer2.push(`<!----> `);
    LittleButton($$renderer2, {
      Icon: QuestionMarkIcon,
      onmousedown: () => manualPopup.open()
    });
    $$renderer2.push(`<!----></div> `);
    if (Project.get()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="svelte-d8j1hi">${escape_html(Project.get().database.name)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="svelte-d8j1hi">`);
    LittleButton($$renderer2, { Icon: DashIcon, onmousedown: minimize, scale: 0.85 });
    $$renderer2.push(`<!----> `);
    LittleButton($$renderer2, { Icon: MinimizeIcon, onmousedown: maximize, scale: 0.85 });
    $$renderer2.push(`<!----> `);
    LittleButton($$renderer2, {
      Icon: CloseIcon,
      onmousedown: close2,
      accent: "#f38ba8",
      scale: 0.85
    });
    $$renderer2.push(`<!----></div></nav> `);
    NewProjectPopup($$renderer2, {});
    $$renderer2.push(`<!----> `);
    if (Project.get()) {
      $$renderer2.push("<!--[0-->");
      ProjectSettingsPopup($$renderer2, {});
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    ManualPopup($$renderer2, {});
    $$renderer2.push(`<!----> `);
    SettingsPopup($$renderer2, {});
    $$renderer2.push(`<!---->`);
  });
}
function NoProject($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section class="svelte-7b9jag"><p class="svelte-7b9jag">No project opened. Create a new one now or open an existing one.</p> <div class="svelte-7b9jag"><button class="svelte-7b9jag">Open project</button> <button class="svelte-7b9jag">Create project</button></div> <button class="svelte-7b9jag">Where am I?</button></section> `);
    ManualPopup($$renderer2, {});
    $$renderer2.push(`<!----> `);
    NewProjectPopup($$renderer2, {});
    $$renderer2.push(`<!---->`);
  });
}
class Tab {
  static tabID = 0;
  id = assignedLater();
  constructor() {
    this.id = Tab.tabID++;
  }
}
class GroupTab extends Tab {
  group = assignedLater();
  view = "hierarchy";
  constructor(group) {
    super();
    this.group = group;
  }
}
class EditorTab extends Tab {
  content = assignedLater();
  constructor(content) {
    super();
    this.content = content;
  }
}
class TabList {
  tabs = [new Tab()];
  appendTab(tab) {
    this.tabs.push(tab);
  }
  prependTab(tab) {
    this.tabs.unshift(tab);
  }
  insertTab(tab, index) {
    this.tabs.splice(index, 0, tab);
  }
  replace(id, newTab) {
    this.tabs.splice(this.indexOfID(id), 1, newTab);
  }
  tabExists(id) {
    return this.tabs.find((tab) => tab.id === id);
  }
  getTabByID(id) {
    return this.tabs.find((tab) => tab.id === id);
  }
  indexOfID(id) {
    return this.tabs.map((tab, index) => [tab, index]).find(([tab]) => tab.id === id)[1];
  }
  getTabByIndex(index) {
    return this.tabs[index];
  }
  deleteTab(id) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
  }
  isEmpty() {
    return this.tabs.length === 0;
  }
  count() {
    return this.tabs.length;
  }
}
const MIN_SCALE = 1e-6;
class Camera {
  translation = Matrix3x3.translation({ x: 0, y: 0 });
  rotation = Matrix3x3.rotation(0);
  dilation = Matrix3x3.scale(1);
  get transformation() {
    return this.translation.times(this.rotation).times(this.dilation);
  }
  get viewMatrix() {
    return this.transformation.inverse;
  }
  getWorldSpaceOrigin() {
    return this.project(Point2D.origin());
  }
  project(point) {
    return this.viewMatrix.timesPoint(point);
  }
  unproject(point) {
    return this.transformation.timesPoint(point);
  }
  viewOrigin() {
    return this.viewMatrix.timesPoint(Point2D.origin());
  }
  moveTo(point) {
    this.translation = Matrix3x3.translation(point);
  }
  get transformCSS() {
    return this.viewMatrix.css;
  }
  shift(point) {
    this.translation = this.translation.times(Matrix3x3.translation(point));
  }
  setRotation(angle) {
    this.rotation = Matrix3x3.rotation(angle);
  }
  rotate(angle) {
    this.rotation = this.rotation.times(Matrix3x3.rotation(angle));
  }
  scale(pointLike) {
    let point = new Point2D(typeof pointLike === "object" ? pointLike : [pointLike, pointLike]);
    if (Math.abs(point.x) < MIN_SCALE || Math.abs(point.y) < MIN_SCALE) return;
    this.dilation = this.dilation.times(Matrix3x3.scale(point));
  }
  getScale() {
    return this.dilation.getScale();
  }
  setScale(pointLike) {
    let point = new Point2D(typeof pointLike === "object" ? pointLike : [pointLike, pointLike]);
    const safeX = Math.max(Math.abs(point.x), MIN_SCALE) * Math.sign(point.x || 1);
    const safeY = Math.max(Math.abs(point.y), MIN_SCALE) * Math.sign(point.y || 1);
    this.dilation = Matrix3x3.scale({ x: safeX, y: safeY });
  }
  rotateAround(pivot, angle) {
    const p = new Point2D(pivot);
    const rotationMatrix = Matrix3x3.rotation(angle);
    const currentPos = new Point2D([this.translation.values[0][2], this.translation.values[1][2]]);
    const offset = { x: currentPos.x - p.x, y: currentPos.y - p.y };
    const rotatedOffset = rotationMatrix.timesPoint(offset);
    this.translation = Matrix3x3.translation({ x: p.x + rotatedOffset.x, y: p.y + rotatedOffset.y });
    this.rotate(angle);
  }
  setScaleAround(pivot, newScale) {
    const p = new Point2D(pivot);
    const target = new Point2D(typeof newScale === "object" ? newScale : [newScale, newScale]);
    const current = this.getScale();
    const factor = new Point2D({ x: target.x / current.x, y: target.y / current.y });
    if (Math.abs(factor.x) < MIN_SCALE || Math.abs(factor.y) < MIN_SCALE) return;
    const scaleMatrix = Matrix3x3.scale(factor);
    const currentPos = new Point2D([this.translation.values[0][2], this.translation.values[1][2]]);
    const offset = { x: currentPos.x - p.x, y: currentPos.y - p.y };
    const scaledOffset = scaleMatrix.timesPoint(offset);
    this.translation = Matrix3x3.translation({ x: p.x + scaledOffset.x, y: p.y + scaledOffset.y });
    this.setScale(target);
  }
  scaleAround(pivot, factor) {
    const p = new Point2D(pivot);
    const factorPoint = new Point2D(typeof factor === "object" ? factor : [factor, factor]);
    if (Math.abs(factorPoint.x) < MIN_SCALE || Math.abs(factorPoint.y) < MIN_SCALE) return;
    const scaleMatrix = Matrix3x3.scale(factorPoint);
    const currentPos = new Point2D([this.translation.values[0][2], this.translation.values[1][2]]);
    const offset = { x: currentPos.x - p.x, y: currentPos.y - p.y };
    const scaledOffset = scaleMatrix.timesPoint(offset);
    this.translation = Matrix3x3.translation({ x: p.x + scaledOffset.x, y: p.y + scaledOffset.y });
    this.scale(factorPoint);
  }
}
function CameraView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, camera = new Camera(), canPan = true } = $$props;
    let cursor = derived(() => "grab");
    $$renderer2.push(`<section class="outer svelte-19ttu1f"${attr_style("", { cursor })}><div class="inner svelte-19ttu1f"${attr_style("", { transform: camera.transformCSS })}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></div></section>`);
    bind_props($$props, { camera });
  });
}
function GraphView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tree = Project.get().database;
    let nodes = derived(() => tree.dfs());
    let items = derived(() => nodes().filter((node) => node.isLeaf()));
    let groups = derived(() => nodes().filter((node) => node.isBranch()));
    function center() {
      camera.moveTo([0, 0]);
      camera.setScale(8);
    }
    let clickedNode = null;
    let camera = new Camera();
    let cameraScale = derived(() => camera.getScale().x);
    center();
    let canPan = derived(() => !clickedNode);
    tree.outline;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<section class="graph svelte-8hj8dk">`);
      CameraView($$renderer3, {
        canPan: canPan(),
        get camera() {
          return camera;
        },
        set camera($$value) {
          camera = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array = ensure_array_like(groups());
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let group = each_array[$$index];
            if (group.outline.isVisible) {
              $$renderer4.push("<!--[0-->");
              $$renderer4.push(`<div${attr_class(clsx(["group", clickedNode === group && "active"]), "svelte-8hj8dk")}${attr_style("", {
                left: `${stringify(group.outline.shape.center.x)}px`,
                top: `${stringify(group.outline.shape.center.y)}px`,
                width: `${stringify(group.outline.shape.radius * 2)}px`,
                height: `${stringify(group.outline.shape.radius * 2)}px`,
                "border-width": `${stringify(cameraScale())}px`,
                "font-size": `${stringify(0.05 * group.outline.shape.radius)}px`,
                "background-color": `${group.outline.color}`
              })}><span tabindex="0" role="tree" class="svelte-8hj8dk">${escape_html(group.name)}</span></div>`);
            } else {
              $$renderer4.push("<!--[-1-->");
            }
            $$renderer4.push(`<!--]-->`);
          }
          $$renderer4.push(`<!--]--> <!--[-->`);
          const each_array_1 = ensure_array_like(items());
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let item = each_array_1[$$index_1];
            $$renderer4.push(`<button aria-label="Node" class="node svelte-8hj8dk"${attr_style("", {
              "background-color": clickedNode === item ? "#f38ba8" : void 0,
              "--text": `'${stringify(item.attributes.name)}'`,
              left: `${stringify(item.outline.shape.center.x)}px`,
              top: `${stringify(item.outline.shape.center.y)}px`,
              width: `${stringify(item.outline.shape.radius * 2)}px`,
              height: `${stringify(item.outline.shape.radius * 2)}px`,
              "font-size": `${stringify(item.outline.shape.radius * 2)}px`
            })}></button>`);
          }
          $$renderer4.push(`<!--]--> <svg class="svelte-8hj8dk"></svg>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="controls svelte-8hj8dk">`);
      LittleButton($$renderer3, { Icon: GearIcon, style: "border: 1px solid #313244" });
      $$renderer3.push(`<!----> `);
      LittleButton($$renderer3, {
        Icon: ReticleIcon,
        onmousedown: center,
        style: "border: 1px solid #313244"
      });
      $$renderer3.push(`<!----></div></section> `);
      ContextMenu($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<button class="svelte-8hj8dk">`);
          RenameIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Rename group</span></button> <button class="svelte-8hj8dk">`);
          PackageIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Add subgroup</span></button> <button class="svelte-8hj8dk">`);
          PlusIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Add item</span></button> <button class="svelte-8hj8dk">`);
          SpreadsheetIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Open in view</span> `);
          ArrowIcon($$renderer4, {
            stroke: "#cdd6f4",
            style: "width: 1rem; height: 1rem; margin-left: auto; rotate: 90deg;"
          });
          $$renderer4.push(`<!----> `);
          ContextMenu($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<button class="svelte-8hj8dk">`);
              TreeIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
              $$renderer5.push(`<!----> <span class="svelte-8hj8dk">Hierarchy</span></button> <button class="svelte-8hj8dk">`);
              SpreadsheetIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
              $$renderer5.push(`<!----> <span class="svelte-8hj8dk">Spreadsheet</span></button>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></button> <hr class="svelte-8hj8dk"/> <button class="svelte-8hj8dk">`);
          ReticleIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Focus</span></button> <button class="svelte-8hj8dk">`);
          ColorPaletteIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Change color</span></button> <div class="svelte-8hj8dk">`);
          HexagonIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Change shape</span> `);
          ArrowIcon($$renderer4, {
            stroke: "#cdd6f4",
            style: "width: 1rem; height: 1rem; margin-left: auto; rotate: 90deg;"
          });
          $$renderer4.push(`<!----> `);
          ContextMenu($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<button class="svelte-8hj8dk">`);
              HexagonIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
              $$renderer5.push(`<!----> <span class="svelte-8hj8dk">Circle</span></button> <button class="svelte-8hj8dk">`);
              HexagonIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
              $$renderer5.push(`<!----> <span class="svelte-8hj8dk">Rectangle</span></button>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></div> <button class="svelte-8hj8dk">`);
          ScaleIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Resize outline</span></button> <button class="svelte-8hj8dk">`);
          EyeIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Hide outline</span></button> <button class="svelte-8hj8dk">`);
          EyeIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Hide group</span></button> <button class="svelte-8hj8dk">`);
          EyeIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk">Hide others</span></button> <hr class="svelte-8hj8dk"/> <button class="svelte-8hj8dk">`);
          TrashIcon($$renderer4, { stroke: "#f38ba8", style: "width: 1.2rem; height: 1.2rem;" });
          $$renderer4.push(`<!----> <span class="svelte-8hj8dk"${attr_style("", { color: "#f38ba8" })}>Delete group</span></button>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function ConfirmationPopup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      confirmText = "Confirm",
      cancelText = "Cancel",
      onconfirm = () => {
      },
      title,
      children
    } = $$props;
    let popup;
    function open2() {
      popup.open();
    }
    function reset() {
    }
    Popup($$renderer2, {
      reset,
      width: "20rem",
      height: "fit-content",
      children: ($$renderer3) => {
        $$renderer3.push(`<section class="svelte-gwwcj3"><h1 class="svelte-gwwcj3">${escape_html(title)}</h1> `);
        children($$renderer3);
        $$renderer3.push(`<!----> <div class="buttons svelte-gwwcj3"><button class="svelte-gwwcj3">${escape_html(cancelText)}</button> <button class="svelte-gwwcj3">${escape_html(confirmText)}</button></div></section>`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, { open: open2 });
  });
}
function AttributeSettingsPopup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { owner, attribute = void 0 } = $$props;
    function reset() {
    }
    let popup;
    let confirmUnlockTypePopup;
    let unlockType = () => {
    };
    function open2() {
      popup.open();
    }
    function onunlock(unlock) {
      unlockType = unlock;
      confirmUnlockTypePopup.open();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Popup($$renderer3, {
        reset,
        children: ($$renderer4) => {
          if (attribute) {
            $$renderer4.push("<!--[0-->");
            $$renderer4.push(`<section class="svelte-8jivgt"><div class="sidebar svelte-8jivgt"><h1 class="title svelte-8jivgt">`);
            SpreadsheetIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
            $$renderer4.push(`<!----> ${escape_html(attribute.name)}</h1> <button class="svelte-8jivgt">`);
            GearIcon($$renderer4, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
            $$renderer4.push(`<!----> <span class="svelte-8jivgt">General</span></button> <button class="svelte-8jivgt">`);
            ItalicIcon($$renderer4, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
            $$renderer4.push(`<!----> <span class="svelte-8jivgt">Formatting</span></button> <button class="svelte-8jivgt">`);
            PrivacyIcon($$renderer4, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
            $$renderer4.push(`<!----> <span class="svelte-8jivgt">Restrictions</span></button> <button class="svelte-8jivgt">Delete field</button></div> <div class="content svelte-8jivgt"><h2 class="svelte-8jivgt">Name</h2> <input${attr("value", attribute.name)} class="svelte-8jivgt"/> <h2 class="svelte-8jivgt">Type</h2> <div class="type svelte-8jivgt">`);
            Select($$renderer4, {
              onunlock,
              locked: true,
              width: "100%",
              options: AttributeType.names(),
              get value() {
                return attribute.type.name;
              },
              set value($$value) {
                attribute.type.name = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <h2 class="svelte-8jivgt">Default</h2> `);
            Input($$renderer4, {
              context: "settings",
              background: "#181825",
              type: attribute.type.name,
              value: null,
              openEditor: () => {
              }
            });
            $$renderer4.push(`<!----></div></section>`);
          } else {
            $$renderer4.push("<!--[-1-->");
          }
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      ConfirmationPopup($$renderer3, {
        title: "Delete field?",
        onconfirm: () => {
          owner.deleteAttributeDefinition(attribute);
          close();
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<p class="svelte-8jivgt">All entries that have values in this field will have the value deleted.</p>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      ConfirmationPopup($$renderer3, {
        title: "Change type?",
        onconfirm: unlockType,
        children: ($$renderer4) => {
          $$renderer4.push(`<p class="svelte-8jivgt">Changing the type of this attribute will delete all entries' data for this attribute.</p>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { attribute, open: open2 });
  });
}
function SpreadsheetView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { group = void 0, openEditor } = $$props;
    let bottomGroups = derived(() => {
      return group.dfsYoungParents();
    });
    let editingAttribute = null;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="columns svelte-1o9pa1e"><div class="column svelte-1o9pa1e"><div class="control cell svelte-1o9pa1e"${attr_style("", { width: "100%" })}><button disabled="" class="svelte-1o9pa1e"${attr_style("", { opacity: "0%" })}>`);
      TrashIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button></div> <!--[-->`);
      const each_array = ensure_array_like(bottomGroups());
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let group2 = each_array[$$index_1];
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(group2.children);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          each_array_1[$$index];
          $$renderer3.push(`<div class="control cell svelte-1o9pa1e"><button class="svelte-1o9pa1e">`);
          TrashIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
          $$renderer3.push(`<!----></button></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> <div class="new control cell svelte-1o9pa1e"><button class="svelte-1o9pa1e">`);
      PlusIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button></div></div> <!---->`);
      {
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(group.attributeDefinitions);
        for (let $$index_4 = 0, $$length = each_array_2.length; $$index_4 < $$length; $$index_4++) {
          let attribute = each_array_2[$$index_4];
          $$renderer3.push(`<div class="column svelte-1o9pa1e"><div class="cell svelte-1o9pa1e">`);
          if (attribute.type.icon.component) {
            $$renderer3.push("<!--[-->");
            attribute.type.icon.component($$renderer3, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(` ${escape_html(attribute.name)} <button style="width: fit-content; margin-right: 0px;" class="svelte-1o9pa1e">`);
          GearIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
          $$renderer3.push(`<!----></button></div> <!--[-->`);
          const each_array_3 = ensure_array_like(bottomGroups());
          for (let $$index_3 = 0, $$length2 = each_array_3.length; $$index_3 < $$length2; $$index_3++) {
            let group2 = each_array_3[$$index_3];
            $$renderer3.push(`<!--[-->`);
            const each_array_4 = ensure_array_like(group2.children);
            for (let $$index_2 = 0, $$length3 = each_array_4.length; $$index_2 < $$length3; $$index_2++) {
              let item = each_array_4[$$index_2];
              var bind_get = () => item.getAttributeValue(attribute.name);
              var bind_set = (value) => item.overwriteAttributeValue(attribute.name, value);
              $$renderer3.push(`<div class="cell svelte-1o9pa1e">`);
              Input($$renderer3, {
                context: "spreadsheet",
                openEditor,
                type: attribute.type.name,
                get value() {
                  return bind_get();
                },
                set value($$value) {
                  bind_set($$value);
                }
              });
              $$renderer3.push(`<!----></div>`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]--> <div class="new cell svelte-1o9pa1e"></div></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!----> <div class="column svelte-1o9pa1e"><button class="new header cell svelte-1o9pa1e">`);
      PlusIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----> New</button> <!--[-->`);
      const each_array_5 = ensure_array_like(bottomGroups());
      for (let $$index_6 = 0, $$length = each_array_5.length; $$index_6 < $$length; $$index_6++) {
        let group2 = each_array_5[$$index_6];
        $$renderer3.push(`<!--[-->`);
        const each_array_6 = ensure_array_like(group2.children);
        for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
          each_array_6[$$index_5];
          $$renderer3.push(`<div class="new cell svelte-1o9pa1e"></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> <div class="new cell svelte-1o9pa1e"></div></div></div> `);
      ContextMenu($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<button>`);
          RenameIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
          $$renderer4.push(`<!----> Rename</button> <button>`);
          GearIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
          $$renderer4.push(`<!----> Properties</button> <hr/> <button${attr_style("", { color: "#f38ba8" })}>`);
          CloseIcon($$renderer4, { stroke: "#f38ba8", style: "width: 1rem; height: 1rem;" });
          $$renderer4.push(`<!----> Delete attribute</button>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AttributeSettingsPopup($$renderer3, {
        owner: group,
        get attribute() {
          return editingAttribute;
        },
        set attribute($$value) {
          editingAttribute = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { group });
  });
}
let fonts = [];
async function loadFonts() {
  fonts = await invoke("get_fonts");
}
async function getFonts() {
  if (fonts.length === 0) await loadFonts();
  return fonts;
}
function Editor($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title, doc = void 0 } = $$props;
    let internalDocument = doc ?? new RichText();
    function getTitle() {
      return title;
    }
    function getIcon2() {
      return BookIcon;
    }
    let currentPartIndex = 0;
    let cursorPosition = internalDocument.partAtIndex(currentPartIndex).ref().text.length;
    let cursorContentHTML = derived(() => {
      let html2 = "";
      internalDocument.some((part, index) => {
        let partClone = part.clone();
        if (index === currentPartIndex) partClone.text = partClone.text.substring(0, cursorPosition);
        html2 += partClone.toHTML(index, index === internalDocument.partCount() - 1).outerHTML;
        return index === currentPartIndex;
      });
      return html2;
    });
    let font = "Garamond";
    let fontSize = "16";
    let viewMode = "dark";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr_class(clsx(["wrapper", viewMode === "light"]), "svelte-1aa9466")}>`);
      if (title) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<h1 contenteditable="" class="svelte-1aa9466">`);
        const $$body = escape_html(title);
        if ($$body) {
          $$renderer3.push(`${$$body}`);
        }
        $$renderer3.push(`</h1>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <div class="toolbar svelte-1aa9466"><div class="formatting svelte-1aa9466"><button class="svelte-1aa9466">`);
      UndoIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button> <button class="svelte-1aa9466">`);
      UndoIcon($$renderer3, {
        stroke: "var(--stroke)",
        style: "width: 1rem; height: 1rem; transform: scaleX(-100%);"
      });
      $$renderer3.push(`<!----></button></div> <div class="font-size svelte-1aa9466"><button class="svelte-1aa9466">`);
      DashIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button> <input${attr("value", fontSize)} class="svelte-1aa9466"/> <button class="svelte-1aa9466">`);
      PlusIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button></div> `);
      await_block($$renderer3, getFonts(), () => {
      }, (fonts2) => {
        Select($$renderer3, {
          style: `background-color: transparent; border: none; color: ${stringify("#cdd6f4")};`,
          options: fonts2.map((font2) => ({ name: font2, style: `font-family: "${font2}"` })),
          width: "7rem",
          get value() {
            return font;
          },
          set value($$value) {
            font = $$value;
            $$settled = false;
          }
        });
      });
      $$renderer3.push(`<!--]--> <div class="formatting svelte-1aa9466"><button class="svelte-1aa9466">`);
      BoldIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button> <button class="svelte-1aa9466">`);
      ItalicIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button> <button class="svelte-1aa9466">`);
      UnderlineIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button></div> <div class="formatting svelte-1aa9466"><button class="svelte-1aa9466">`);
      LineSpacingIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button> <button class="svelte-1aa9466">`);
      {
        $$renderer3.push("<!--[0-->");
        SunIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      }
      $$renderer3.push(`<!--]--></button></div> <div class="formatting svelte-1aa9466"><button class="svelte-1aa9466">`);
      SaveIcon($$renderer3, { stroke: "var(--stroke)", style: "width: 1rem; height: 1rem;" });
      $$renderer3.push(`<!----></button></div></div> <div class="content svelte-1aa9466"><div class="editor svelte-1aa9466" tabindex="0"${attr_style("", {
        "font-family": font,
        "font-size": `${stringify(fontSize)}px`
      })}></div> <div class="cursor-content svelte-1aa9466"${attr_style("", {
        "font-family": font,
        "font-size": `${stringify(fontSize)}px`
      })}>${html(cursorContentHTML())}</div></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { doc, getTitle, getIcon: getIcon2 });
  });
}
const views = {
  hierarchy: { icon: TreeIcon },
  graph: { icon: GraphIcon },
  spreadsheet: { icon: SpreadsheetIcon },
  timeline: { icon: ClockIcon }
};
function Tabline($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      tabs = void 0,
      background,
      subpane,
      split,
      onclose,
      isMasterPaneAlive = void 0,
      selectedTabID = void 0
    } = $$props;
    let tabWidth = derived(() => {
      return "0px";
    });
    $$renderer2.push(`<div class="tabs svelte-vybefw"><!--[-->`);
    const each_array = ensure_array_like(tabs.tabs);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let tab = each_array[index];
      const Icon = tab instanceof EditorTab ? PencilIcon : tab instanceof GroupTab ? tab.group.icon.component : void 0;
      $$renderer2.push(`<div${attr_class(clsx(["tab", selectedTabID === tab.id && "selected"]), "svelte-vybefw")}${attr_style("", {
        left: `calc(min(13rem, ${stringify(tabWidth())}) * ${stringify(index)} + 1rem)`,
        width: tabWidth(),
        background
      })}><span class="svelte-vybefw">`);
      if (Icon) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
      $$renderer2.push(` ${escape_html(tab instanceof EditorTab ? "Editor" : tab instanceof GroupTab ? tab.group.name : "Empty")}</span> <button class="svelte-vybefw">`);
      CloseIcon($$renderer2, {
        stroke: "var(--stroke)",
        style: "width: 0.85rem; height: 0.85rem;"
      });
      $$renderer2.push(`<!----></button></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="new-tab-wrapper svelte-vybefw"${attr_style("", {
      left: `calc(min(${stringify(tabWidth())}, 13rem) * ${stringify(tabs.count())})`
    })}><button class="new-tab svelte-vybefw">`);
    PlusIcon($$renderer2, {
      stroke: "var(--stroke)",
      style: "width: 0.85rem; height: 0.85rem;"
    });
    $$renderer2.push(`<!----></button> `);
    ContextMenu($$renderer2, {
      top: "100%",
      left: "0px",
      children: ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(Project.get().database.children.filter((child) => child.isBranch()));
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let group = each_array_1[$$index_1];
          $$renderer3.push(`<button>`);
          if (group.icon.component) {
            $$renderer3.push("<!--[-->");
            group.icon.component($$renderer3, { stroke: "#cdd6f4", style: "width: 0.9rem; height: 0.9rem;" });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
          $$renderer3.push(` <span>${escape_html(group.name)}</span></button>`);
        }
        $$renderer3.push(`<!--]--> <hr/> <button>`);
        CircledPlusIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
        $$renderer3.push(`<!----> <span>New Dataset</span></button>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="controls svelte-vybefw"><button class="svelte-vybefw">`);
    GearIcon($$renderer2, {
      stroke: "var(--stroke)",
      style: "width: 0.85rem; height: 0.85rem;"
    });
    $$renderer2.push(`<!----></button> `);
    if (subpane || split) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="svelte-vybefw">`);
      CloseIcon($$renderer2, {
        stroke: "var(--stroke)",
        style: "width: 0.85rem; height: 0.85rem;"
      });
      $$renderer2.push(`<!----></button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    ContextMenu($$renderer2, {
      top: "100%",
      right: "0.25rem",
      children: ($$renderer3) => {
        $$renderer3.push(`<button class="svelte-vybefw">`);
        SplitHorizontalIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
        $$renderer3.push(`<!----> <span>Split horizontally</span></button> <button class="svelte-vybefw">`);
        SplitHorizontalIcon($$renderer3, {
          stroke: "#cdd6f4",
          style: "width: 1.2rem; height: 1.2rem; rotate: 90deg;"
        });
        $$renderer3.push(`<!----> <span>Split vertically</span></button> <hr/> <button${attr("disabled", !subpane && !split, true)} class="svelte-vybefw">`);
        CloseIcon($$renderer3, {
          stroke: subpane || split ? "#f38ba8" : "#6c7086",
          style: "width: 0.85rem; height: 0.85rem;"
        });
        $$renderer3.push(`<!----> <span${attr_style(`color: ${stringify(subpane || split ? "#f38ba8" : "#6c7086")}`)}>Close pane</span></button>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div> `);
    ContextMenu($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<button>`);
        SpreadsheetIcon($$renderer3, {
          stroke: "#cdd6f4",
          style: "width: 0.85rem; height: 0.85rem; margin-left: 0.15rem;"
        });
        $$renderer3.push(`<!----> <span>Open dataset</span> `);
        ContextMenu($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array_2 = ensure_array_like(Project.get().database.children.filter((child) => child.isBranch()));
            for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
              let group = each_array_2[$$index_3];
              $$renderer4.push(`<div>`);
              if (group.icon.component) {
                $$renderer4.push("<!--[-->");
                group.icon.component($$renderer4, { stroke: "#cdd6f4", style: "width: 0.9rem; height: 0.9rem;" });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(` <span>${escape_html(group.name)}</span> `);
              ContextMenu($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!--[-->`);
                  const each_array_3 = ensure_array_like(Object.entries(views));
                  for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                    let [viewName, info] = each_array_3[$$index_2];
                    $$renderer5.push(`<div>`);
                    if (info.icon) {
                      $$renderer5.push("<!--[-->");
                      info.icon($$renderer5, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
                      $$renderer5.push("<!--]-->");
                    } else {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push("<!--]-->");
                    }
                    $$renderer5.push(` <span>As ${escape_html(viewName)}</span> `);
                    ArrowIcon($$renderer5, {
                      style: "width: 1rem; height: 1rem; rotate: 90deg; margin-left: auto;"
                    });
                    $$renderer5.push(`<!----> `);
                    ContextMenu($$renderer5, {
                      children: ($$renderer6) => {
                        $$renderer6.push(`<button>`);
                        EyeIcon($$renderer6, {});
                        $$renderer6.push(`<!----> <span>In this tab</span></button> <button>`);
                        PlusIcon($$renderer6, {});
                        $$renderer6.push(`<!----> <span>In new tab</span></button> <button>`);
                        PlusIcon($$renderer6, {});
                        $$renderer6.push(`<!----> <span>In new tab to the left</span></button> <hr/> <button>`);
                        SplitHorizontalIcon($$renderer6, {});
                        $$renderer6.push(`<!----> <span>In split right</span></button> <button>`);
                        SplitHorizontalIcon($$renderer6, {});
                        $$renderer6.push(`<!----> <span>In split left</span></button> <button>`);
                        SplitHorizontalIcon($$renderer6, { style: "rotate: 90deg;" });
                        $$renderer6.push(`<!----> <span>In split bottom</span></button> <button>`);
                        SplitHorizontalIcon($$renderer6, { style: "rotate: 90deg;" });
                        $$renderer6.push(`<!----> <span>In split top</span></button>`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----></div>`);
                  }
                  $$renderer5.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></div>`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></button> <button>`);
        EyeIcon($$renderer3, {
          stroke: "#cdd6f4",
          style: "width: 0.85rem; height: 0.85rem; margin-left: 0.15rem;"
        });
        $$renderer3.push(`<!----> <span>Open view</span> `);
        ContextMenu($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array_4 = ensure_array_like(Object.entries(views));
            for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
              let [viewName, info] = each_array_4[$$index_4];
              $$renderer4.push(`<div>`);
              if (info.icon) {
                $$renderer4.push("<!--[-->");
                info.icon($$renderer4, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(` <span${attr_style("", { "text-transform": "capitalize" })}>${escape_html(viewName)}</span> `);
              ArrowIcon($$renderer4, {
                stroke: "#cdd6f4",
                style: "width: 1rem; height: 1rem; rotate: 90deg; margin-left: auto;"
              });
              $$renderer4.push(`<!----> `);
              ContextMenu($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<button>`);
                  EyeIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
                  $$renderer5.push(`<!----> <span>In this tab</span></button> <button>`);
                  PlusIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
                  $$renderer5.push(`<!----> <span>In new tab</span></button> <button>`);
                  PlusIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
                  $$renderer5.push(`<!----> <span>In new tab to the left</span></button> <hr/> <button>`);
                  SplitHorizontalIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
                  $$renderer5.push(`<!----> <span>In split right</span></button> <button>`);
                  SplitHorizontalIcon($$renderer5, { stroke: "#cdd6f4", style: "width: 1rem; height: 1rem;" });
                  $$renderer5.push(`<!----> <span>In split left</span></button> <button>`);
                  SplitHorizontalIcon($$renderer5, {
                    stroke: "#cdd6f4",
                    style: "width: 1rem; height: 1rem; rotate: 90deg;"
                  });
                  $$renderer5.push(`<!----> <span>In split bottom</span></button> <button>`);
                  SplitHorizontalIcon($$renderer5, {
                    stroke: "#cdd6f4",
                    style: "width: 1rem; height: 1rem; rotate: 90deg;"
                  });
                  $$renderer5.push(`<!----> <span>In split top</span></button>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----></div>`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></button> <hr/> <button>`);
        RenameIcon($$renderer3, { stroke: "#cdd6f4", style: "width: 1.2rem; height: 1.2rem;" });
        $$renderer3.push(`<!----> <span>Rename tab</span></button> <div${attr_class(clsx([!subpane && !split && "disabled"]))}>`);
        CloseIcon($$renderer3, {
          stroke: subpane || split ? "#f38ba8" : "#6c7086",
          style: "width: 0.85rem; height: 0.85rem;"
        });
        $$renderer3.push(`<!----> <span${attr_style(`color: ${stringify(subpane || split ? "#f38ba8" : "#6c7086")}`)}>Close tab</span> `);
        ContextMenu($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<button>`);
            CloseIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
            $$renderer4.push(`<!----> <span>Close others</span></button> <button>`);
            CloseIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
            $$renderer4.push(`<!----> <span>Close tabs to the left</span></button> <button>`);
            CloseIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
            $$renderer4.push(`<!----> <span>Close tabs to the right</span></button> <button>`);
            CloseIcon($$renderer4, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
            $$renderer4.push(`<!----> <span>Close tabs to the left</span></button>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
    bind_props($$props, { tabs, isMasterPaneAlive, selectedTabID });
  });
}
function Pane_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      width = "500px",
      height = "1000px",
      background = "#1e1e2e",
      subpane = false,
      split = void 0,
      onclose = () => {
      }
    } = $$props;
    let dragging = "none";
    let selectedTabID = 0;
    let tabline = new TabList();
    let masterHeight = `${parseInt(height) / 2}px`;
    let masterWidth = `${parseInt(width) / 2}px`;
    let isMasterPaneAlive = true;
    function openEditor(content) {
      let tab2 = new EditorTab(content);
      tabline.appendTab(tab2);
      selectedTabID = tab2.id;
    }
    let tab = derived(() => tabline.getTabByID(selectedTabID));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<section${attr_class(clsx({ "pane-wrapper": true }), "svelte-12uuzv1")}${attr_style("", {
        "flex-direction": split === "horizontal" ? "row" : "column",
        "flex-grow": subpane ? "1" : void 0
      })}><section class="pane svelte-12uuzv1"${attr_style("", {
        "max-width": isMasterPaneAlive ? "100vmax" : "0px",
        "max-height": isMasterPaneAlive ? "100vmax" : "0px",
        height: split === "vertical" ? masterHeight : "100%",
        width: split === "horizontal" ? masterWidth : "100%"
      })}>`);
      Tabline($$renderer3, {
        background,
        split,
        subpane,
        onclose,
        get isMasterPaneAlive() {
          return isMasterPaneAlive;
        },
        set isMasterPaneAlive($$value) {
          isMasterPaneAlive = $$value;
          $$settled = false;
        },
        get selectedTabID() {
          return selectedTabID;
        },
        set selectedTabID($$value) {
          selectedTabID = $$value;
          $$settled = false;
        },
        get tabs() {
          return tabline;
        },
        set tabs($$value) {
          tabline = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div class="content svelte-12uuzv1"${attr_style("", { background })}>`);
      if (tab() instanceof EditorTab && tab().id === selectedTabID) {
        $$renderer3.push("<!--[0-->");
        Editor($$renderer3, {
          get doc() {
            return tab().content;
          },
          set doc($$value) {
            tab().content = $$value;
            $$settled = false;
          }
        });
      } else if (tab() instanceof GroupTab) {
        $$renderer3.push("<!--[1-->");
        $$renderer3.push(`<div class="view-container svelte-12uuzv1"${attr_style(`display: ${stringify(tab().id === selectedTabID ? "block" : "none")}`)}>`);
        if (tab().view === "hierarchy") {
          $$renderer3.push("<!--[0-->");
          HierarchyView_1($$renderer3, { hideRoot: true });
        } else if (tab().view === "spreadsheet") {
          $$renderer3.push("<!--[1-->");
          SpreadsheetView($$renderer3, { openEditor, group: tab().group });
        } else if (tab().view === "graph") {
          $$renderer3.push("<!--[2-->");
          GraphView($$renderer3);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
        $$renderer3.push(`<div class="no-dataset svelte-12uuzv1"><p class="svelte-12uuzv1">This tab has no entry opened. Open an existing one now or create a new one to open.</p> <div class="svelte-12uuzv1"><button class="svelte-12uuzv1">Open entry</button> <button class="svelte-12uuzv1">Create entry</button></div> <button class="svelte-12uuzv1">What the heck's an entry?</button></div>`);
      }
      $$renderer3.push(`<!--]--></div> <div${attr_class(clsx({ drag: true, right: true, dragging: dragging === "right" }), "svelte-12uuzv1")}></div> <div${attr_class(clsx({ drag: true, bottom: true, dragging: dragging === "bottom" }), "svelte-12uuzv1")}></div></section> `);
      if (split) {
        $$renderer3.push("<!--[0-->");
        Pane_1($$renderer3, { subpane: true, onclose: () => split = void 0 });
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></section> `);
      ManualPopup($$renderer3, {});
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function StatusBar($$renderer) {
  $$renderer.push(`<section class="svelte-161y12f"><div class="wrapper svelte-161y12f"><button class="svelte-161y12f"><span>0 / 0 words</span></button> `);
  ContextMenu($$renderer, {
    bottom: "120%",
    right: "0.5rem",
    children: ($$renderer2) => {
      $$renderer2.push(`<button class="svelte-161y12f">`);
      WordCountIcon($$renderer2, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
      $$renderer2.push(`<!----> <span>Word Count</span></button> <button class="svelte-161y12f">`);
      CharacterCountIcon($$renderer2, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
      $$renderer2.push(`<!----> <span>Character Count</span></button> <button class="svelte-161y12f">`);
      SaveIcon($$renderer2, { stroke: "#cdd6f4", style: "width: 0.85rem; height: 0.85rem;" });
      $$renderer2.push(`<!----> <span>Chapter Count</span></button>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div></section>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    InputHandler($$renderer2);
    $$renderer2.push(`<!----> <main class="svelte-1uha8ag">`);
    Navbar($$renderer2);
    $$renderer2.push(`<!----> `);
    if (Project.get()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="svelte-1uha8ag">`);
      Pane_1($$renderer2, { background: "#181825" });
      $$renderer2.push(`<!----> `);
      StatusBar($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      NoProject($$renderer2);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
