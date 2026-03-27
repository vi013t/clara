import { h as head, a as attr } from "../../chunks/index.js";
const globalCss = "/_app/immutable/assets/global.Dmdlhigz.css";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Wallflower</title>`);
    });
    $$renderer2.push(`<link${attr("href", globalCss)} rel="stylesheet"/> <link href="/favicon.png" rel="icon"/>`);
  });
  children($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
