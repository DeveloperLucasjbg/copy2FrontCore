// root-config.ts (o index.ts)
import { constructRoutes, constructLayoutEngine } from "single-spa-layout";
import { registerApplication, start } from "single-spa";
import microfrontendLayout from "./microfrontend-layout.html";
import "regenerator-runtime/runtime";

const routes = constructRoutes(microfrontendLayout);

type AppEntry = {
  type: "esm" | "umd";
  url: string;
  baseHref: string; // Ruta desde la que puede iniciarse (ej: /br/core)
};

/**
 * appMap: una app (key) puede tener varias variantes (arrays) con distintos baseHref
 */
const appMap: Record<string, AppEntry[]> = {
  "@avla/mf-angular-app-esm": [
    {
      type: "esm",
      url: process.env.isLocal
        ? "http://localhost:4200/mf-angular-app-esm.js"
        : "/mf-angular-app-esm/mf-angular-app-esm.js",
      baseHref: "/br/core",
    },
    {
      type: "esm",
      url: process.env.isLocal
        ? "http://localhost:4200/mf-angular-app-esm.js"
        : "/mf-angular-app-esm/mf-angular-app-esm.js",
      baseHref: "/cl/core",
    },
  ],
  "@avla/mf-angular-app-umd": [
    {
      type: "umd",
      url: process.env.isLocal
        ? "http://localhost:4001/mf-angular-app-umd.js"
        : "/mf-angular-app-umd/mf-angular-app-umd.js",
      baseHref: "/test",
    },
  ],
};

/**
 * Generamos un mapa de nombres "registrados" -> entry
 * El nombre registrado será: `${originalName}::${encodeURIComponent(baseHref)}`
 * Ej: "@avla/mf-angular-app-esm::%2Fbr%2Fcore"
 */
type RegisteredEntry = AppEntry & {
  originalName: string;
  registeredName: string;
};

const registeredMap: Record<string, RegisteredEntry> = {};

Object.entries(appMap).forEach(([originalName, configs]) => {
  configs.forEach((c) => {
    const registeredName = `${originalName}::${encodeURIComponent(c.baseHref)}`;
    registeredMap[registeredName] = {
      ...c,
      originalName,
      registeredName,
    };
  });
});

/**
 * loadApp: -> recibe { name }
 * Busca en registeredMap por el nombre registrado.
 */
const loadApp = async ({ name }: { name: string }) => {
  const reg = registeredMap[name];
  if (!reg) {
    // Si te llega el nombre "original" y sólo hay 1 variante, lo cargamos
    const configs = appMap[name];
    if (configs && configs.length === 1) {
      const cfg = configs[0];
      return cfg.type === "esm"
        ? import(/* webpackIgnore: true */ cfg.url)
        : System.import(cfg.url);
    }
    throw new Error(`App no registrada o ambigua: ${name}`);
  }

  return reg.type === "esm"
    ? import(/* webpackIgnore: true */ reg.url)
    : System.import(reg.url);
};

/**
 * Registramos cada variante como una app única (nombre único por baseHref)
 */
Object.values(registeredMap).forEach((reg) => {
  registerApplication({
    name: reg.registeredName,
    app: () => loadApp({ name: reg.registeredName }),
    activeWhen: (location) => location.pathname.startsWith(reg.baseHref),
    customProps: {
      baseHref: reg.baseHref,
    },
  });
});

/**
 * Construimos el "applications" que necesita constructLayoutEngine
 * (mapeamos las entradas registradas a la forma esperada)
 */
const applicationsForLayoutEngine = Object.values(registeredMap).map((reg) => ({
  name: reg.registeredName,
  app: () => loadApp({ name: reg.registeredName }),
  activeWhen: (location: Location) =>
    location.pathname.startsWith(reg.baseHref),
}));

const layoutEngine = constructLayoutEngine({
  routes,
  applications: applicationsForLayoutEngine,
});

start();
layoutEngine.activate();
