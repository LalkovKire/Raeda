import { Component, inject, Input } from '@angular/core';
import { BrowserStorageService } from '../../services/browserStorage.service';
import { LoginResponse } from '../../models/login-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  @Input() signedIn: LoginResponse | undefined;
  browserStorageService = inject(BrowserStorageService);
  toggleDropdown = false;

  onSignOut() {
    this.browserStorageService.signOut();
  }

  onToggleDropdown() {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
