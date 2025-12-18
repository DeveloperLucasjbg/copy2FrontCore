import { inject, Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, timer, Subscription, Subject } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private readonly idleTimeout = Number(environment.idleTimeout) * 60 * 1000;
  private readonly throttleDuration = 5000;
  private timerSub?: Subscription;
  private warningTimerSub?: Subscription;
  private eventsSub?: Subscription;

  private onWarning = new Subject<void>();
  public onWarning$ = this.onWarning.asObservable();

  private zone = inject(NgZone);

  startMonitoring(onTimeout: () => void): void {
    this.zone.runOutsideAngular(() => {
      const activityEvents$ = merge(
        fromEvent(window, 'mousemove'),
        fromEvent(window, 'keydown'),
        fromEvent(window, 'click'),
        fromEvent(window, 'scroll'),
        fromEvent(window, 'touchstart'),
      ).pipe(
        throttleTime(this.throttleDuration),
        tap(() => this.resetTimers(onTimeout)),
      );

      this.eventsSub = activityEvents$.subscribe();
      this.resetTimers(onTimeout);
    });
  }

  private resetTimers(onTimeout: () => void): void {
    this.timerSub?.unsubscribe();
    this.warningTimerSub?.unsubscribe();

    this.timerSub = timer(this.idleTimeout).subscribe(() => {
      this.zone.run(() => {
        this.onWarning.next();
        this.stopMonitoring();
        this.warningTimerSub = timer(10 * 1000).subscribe(() => {
          this.zone.run(() => onTimeout());
        });
      });
    });
  }

  stopMonitoring(): void {
    this.eventsSub?.unsubscribe();
    this.timerSub?.unsubscribe();
    this.warningTimerSub?.unsubscribe();
  }
}
