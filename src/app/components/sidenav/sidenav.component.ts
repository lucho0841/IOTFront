import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  mobileQuery : MediaQueryList;

  title: String = "menu"

  datosMenu = [{
    title: 'Mascota',
    icon: 'pets',
    route: '/mascota'
  }, {
    title: 'Alimentadores',
    icon: 'solar_power',
    route: '/alimentador'
  }]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  private _mobileQueryListener : () => void;

  constructor(private breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

}
