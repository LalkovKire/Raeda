import { ViewportScroller } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrowserStorageService } from '../../browserStorage.service';
import { LoginResponse } from '../../auth/login-response';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private scroller = inject(ViewportScroller);
  private browserStorageService = inject(BrowserStorageService);
  signedIn: LoginResponse | null = null;
  toggleDropdown = false;

  ngOnInit(): void {
    this.browserStorageService.isSignIn.subscribe((v) => (this.signedIn = v));
  }

  scrollTo(section: string) {
    this.scroller.scrollToAnchor(section);
  }

  onSignOut() {
    this.browserStorageService.signOut();
  }

  onToggleDropdown() {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
