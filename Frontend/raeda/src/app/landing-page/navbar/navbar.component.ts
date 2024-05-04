import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrowserStorageService } from '../../shared/browserStorage.service';
import { LoginResponse } from '../../auth/login-response';
import { AvatarComponent } from '../../components/avatar/avatar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AvatarComponent, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private browserStorageService = inject(BrowserStorageService);
  signedIn: LoginResponse | null = null;

  ngOnInit(): void {
    this.browserStorageService.isSignIn.subscribe((v) => (this.signedIn = v));
  }
}
