import { Routes } from "@angular/router";

export const BROKER_REGISTRY_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./broker-registry.component").then(
        (m) => m.BrokerRegistryComponent
      ),
    children: [
      {
        path: "company",
        loadComponent: () =>
          import("./steps/step-company/step-company.component").then(
            (m) => m.StepCompanyComponent
          ),
      },
      {
        path: "bank",
        loadComponent: () =>
          import("./steps/step-bank/step-bank.component").then(
            (m) => m.StepBankComponent
          ),
      },
      {
        path: "password",
        loadComponent: () =>
          import("./steps/step-password/step-password.component").then(
            (m) => m.StepPasswordComponent
          ),
      },
      { path: "", pathMatch: "full", redirectTo: "company" },
    ],
  },
];
