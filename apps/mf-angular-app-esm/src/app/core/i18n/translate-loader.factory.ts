import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

declare const __webpack_public_path__: string; // declarar para TS

export function HttpLoaderFactory(http: HttpClient) {
  const basePath = typeof __webpack_public_path__ === 'string' ? __webpack_public_path__ : '/';
  const normalizedBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
  return new TranslateHttpLoader(http, normalizedBasePath + 'assets/i18n/', '.json');
}
