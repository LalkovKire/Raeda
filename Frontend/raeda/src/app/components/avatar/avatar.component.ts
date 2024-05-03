import { Component, inject, Input } from '@angular/core';
import { BrowserStorageService } from '../../browserStorage.service';
import { LoginResponse } from '../../auth/login-response';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
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
