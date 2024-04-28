import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrowserStorageService } from '../../browserStorage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  signedIn = false;

  constructor(
    private scroller: ViewportScroller,
    private browserStorageService: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.browserStorageService.isSignIn.subscribe((v) => (this.signedIn = v));
  }

  scrollTo(section: string) {
    console.log(this.signedIn);
    this.scroller.scrollToAnchor(section);
  }

  onSignOut() {
    this.browserStorageService.signOut();
  }
}
