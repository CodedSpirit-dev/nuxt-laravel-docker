import { defu } from "defu";
import { useScript as _useScript } from "@unhead/vue/scripts";
import { reactive } from "vue";
import { onNuxtReady, useNuxtApp, useRuntimeConfig, injectHead } from "#imports";
function useNuxtScriptRuntimeConfig() {
  return useRuntimeConfig().public["nuxt-scripts"];
}
export function resolveScriptKey(input) {
  return input.key || input.src || (typeof input.innerHTML === "string" ? input.innerHTML : "");
}
export function useScript(input, options) {
  input = typeof input === "string" ? { src: input } : input;
  options = defu(options, useNuxtScriptRuntimeConfig()?.defaultScriptOptions);
  const id = String(resolveScriptKey(input));
  const nuxtApp = useNuxtApp();
  options.head = options.head || injectHead();
  if (!options.head) {
    throw new Error("useScript() has been called without Nuxt context.");
  }
  nuxtApp.$scripts = nuxtApp.$scripts || reactive({});
  const exists = !!nuxtApp.$scripts?.[id];
  if (options.trigger === "onNuxtReady" || options.trigger === "client") {
    if (!options.warmupStrategy) {
      options.warmupStrategy = "preload";
    }
    if (options.trigger === "onNuxtReady") {
      options.trigger = onNuxtReady;
    }
  }
  const instance = _useScript(input, options);
  const _remove = instance.remove;
  instance.remove = () => {
    nuxtApp.$scripts[id] = void 0;
    return _remove();
  };
  nuxtApp.$scripts[id] = instance;
  if (import.meta.dev && import.meta.client) {
    let syncScripts = function() {
      nuxtApp._scripts[instance.id] = payload;
      nuxtApp.hooks.callHook("scripts:updated", { scripts: nuxtApp._scripts });
    };
    if (exists) {
      return instance;
    }
    const payload = {
      ...options.devtools,
      src: input.src,
      $script: null,
      events: []
    };
    nuxtApp._scripts = nuxtApp._scripts || {};
    if (!nuxtApp._scripts[instance.id]) {
      options.head.hooks.hook("script:updated", (ctx) => {
        if (ctx.script.id !== instance.id)
          return;
        payload.events.push({
          type: "status",
          status: ctx.script.status,
          at: Date.now()
        });
        payload.$script = instance;
        syncScripts();
      });
      options.head.hooks.hook("script:instance-fn", (ctx) => {
        if (ctx.script.id !== instance.id || String(ctx.fn).startsWith("__v_"))
          return;
        payload.events.push({
          type: "fn-call",
          fn: ctx.fn,
          at: Date.now()
        });
        syncScripts();
      });
      payload.$script = instance;
      payload.events.push({
        type: "status",
        status: "awaitingLoad",
        trigger: options?.trigger,
        at: Date.now()
      });
      syncScripts();
    }
  }
  return instance;
}
