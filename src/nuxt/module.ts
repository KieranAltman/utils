import { defineNuxtModule, createResolver, addImportsDir } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "freeloop-utils",
  },
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);

    addImportsDir(resolver.resolve("../utils"));
  },
});
