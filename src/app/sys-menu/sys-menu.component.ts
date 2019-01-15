import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatSidenav, MatDrawerToggleResult } from '@angular/material';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sys-menu',
  templateUrl: './sys-menu.component.html',
  styleUrls: ['./sys-menu.component.scss'],
})
export class SysMenuComponent implements OnInit {
  // for test
  bidiMode = 'ltr';
  theme = 'custom-theme-1';

  // Env_ID
  EnvName = environment.env_name;
  EnvMenuBkColor = environment.MenBarBkgroundColor;

  ngOnInit() {
    this.theme = 'custom-theme-1';
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSideNavLeft(drawer: MatSidenav) {
    drawer.toggle().then((result: MatDrawerToggleResult) => {
      console.log('選單狀態: ' + result);
    });
  }

  toggleTheme() {
    const originalTheme = this.theme;
    this.theme = this.theme === 'custom-theme-1' ? 'custom-theme-2' : 'custom-theme-1';
    //this.overlayContainer.getContainerElement().classList.remove(originalTheme);
    //this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  openeDrawer() {
    console.log('芝麻開門');
  }

  closeDrawer() {
    console.log('芝麻關門');
  }

}
