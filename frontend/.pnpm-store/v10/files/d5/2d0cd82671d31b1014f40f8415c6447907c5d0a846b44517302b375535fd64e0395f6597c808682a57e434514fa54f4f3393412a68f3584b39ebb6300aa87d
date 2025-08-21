import { withBase, withHttps, withoutProtocol, withoutTrailingSlash } from "ufo";
import { useRegistryScript } from "../utils.js";
import { boolean, object, optional, string, number, union } from "#nuxt-scripts-validator";
export const MatomoAnalyticsOptions = object({
  matomoUrl: optional(string()),
  siteId: optional(union([string(), number()])),
  cloudId: optional(string()),
  trackerUrl: optional(string()),
  trackPageView: optional(boolean()),
  enableLinkTracking: optional(boolean()),
  disableCookies: optional(boolean())
});
export function useScriptMatomoAnalytics(_options) {
  return useRegistryScript("matomoAnalytics", (options) => {
    const normalizedCloudId = options?.cloudId ? withoutTrailingSlash(withoutProtocol(options.cloudId)) : void 0;
    const origin = options?.matomoUrl ? options.matomoUrl : `https://cdn.matomo.cloud/${normalizedCloudId}/`;
    const _paq = import.meta.client ? window._paq = window._paq || [] : [];
    return {
      scriptInput: {
        src: withBase(`/matomo.js`, origin),
        crossorigin: false
      },
      schema: import.meta.dev ? MatomoAnalyticsOptions : void 0,
      scriptOptions: {
        use() {
          return { _paq: window._paq };
        }
      },
      clientInit: import.meta.server ? void 0 : () => {
        if (options?.enableLinkTracking) {
          _paq.push(["enableLinkTracking"]);
        }
        if (options?.disableCookies) {
          _paq.push(["disableCookies"]);
        }
        if (options?.trackerUrl || options?.matomoUrl) {
          _paq.push(["setTrackerUrl", options?.trackerUrl ? withHttps(options.trackerUrl) : withBase(`/matomo.php`, withHttps(options?.matomoUrl || ""))]);
        } else if (normalizedCloudId) {
          _paq.push(["setTrackerUrl", withBase(`/matomo.php`, withHttps(normalizedCloudId))]);
        }
        _paq.push(["setSiteId", String(options?.siteId) || "1"]);
        if (options?.trackPageView) {
          _paq.push(["trackPageView"]);
        }
      }
    };
  }, _options);
}
