import 'zone.js';

import { enableProdMode, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';

import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { APP_BASE_HREF } from '@angular/common';
import type { AppProps } from 'single-spa';

interface ExtendedAppProps extends AppProps {
  baseHref?: string;
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps: ExtendedAppProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...appConfig.providers,
        getSingleSpaExtraProviders(),
        { provide: APP_BASE_HREF, useValue: '/login' }
      ],
    });
  },
  template: '<mfapp-root></mfapp-root>',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
