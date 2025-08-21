import { loadDatabaseAdapter } from "./database.client.js";
import { useRuntimeConfig, refreshNuxtData } from "#imports";
const logger = {
  log: (...args) => console.log("[Content]", ...args),
  warn: (...args) => console.warn("[Content]", ...args)
};
let ws;
export function useContentWebSocket() {
  if (!window.WebSocket) {
    logger.warn("Could not enable hot reload, your browser does not support WebSocket.");
    return;
  }
  const onMessage = async (message) => {
    try {
      const data = JSON.parse(message.data);
      if (!data || !data.queries || !data.collection) {
        return;
      }
      const db = await loadDatabaseAdapter(data.collection);
      await data.queries.reduce(async (prev, sql) => {
        await prev;
        await db.exec(sql).catch((err) => console.log(err));
      }, Promise.resolve());
      refreshNuxtData();
    } catch {
    }
  };
  const onOpen = () => logger.log("WS connected!");
  const onError = (e) => {
    switch (e.code) {
      case "ECONNREFUSED":
        connect(true);
        break;
      default:
        logger.warn("WS Error:", e);
        break;
    }
  };
  const onClose = (e) => {
    if (e.code === 1e3 || e.code === 1005) {
      logger.log("WS closed!");
    } else {
      connect(true);
    }
  };
  const connect = (retry = false) => {
    if (retry) {
      logger.log("WS reconnecting..");
      setTimeout(connect, 1e3);
      return;
    }
    if (ws) {
      try {
        ws.close();
      } catch {
      }
      ws = void 0;
    }
    const wsURL = new URL(`${useRuntimeConfig().public.content.wsUrl}ws`);
    wsURL.protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    wsURL.hostname = window.location.hostname;
    logger.log(`WS connect to ${wsURL}`);
    ws = new WebSocket(wsURL);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onerror = onError;
    ws.onclose = onClose;
  };
  connect();
  return {
    connect
  };
}
