import { Injectable, effect, signal } from '@angular/core';
// import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class AppReloadService {
  private readonly _reloadSignal = signal<{ reload: boolean; page?: string }>({
    reload: false,
  });
  private readonly defaultPage = 'login';
  readonly reloadSignal = this._reloadSignal.asReadonly();

  constructor() {
    effect(() => {
      const { reload, page } = this._reloadSignal();
      if (reload) {
        const targetPath = page ?? this.defaultPage;
        window.location.href = `/${targetPath}?noCache=${crypto.randomUUID()}`;
      }
    });
  }

  triggerReload(page?: string) {
    this._reloadSignal.set({ reload: true, page });
  }
}
