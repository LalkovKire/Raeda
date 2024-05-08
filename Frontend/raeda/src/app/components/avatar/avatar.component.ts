import { Component, inject, Input } from '@angular/core';
import { BrowserStorageService } from '../../shared/browserStorage.service';
import { LoginResponse } from '../../auth/login-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  // @ts-ignore
  @Input() signedIn: LoginResponse;
  browserStorageService = inject(BrowserStorageService);
  toggleDropdown = false;

  onSignOut() {
    this.browserStorageService.signOut();
  }

  onToggleDropdown() {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
