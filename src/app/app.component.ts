import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { EventEmitterService } from './service/event-emitter.service';
import { SessionStoreService } from './service/session-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Transaction Service';
  isAuthenticated: boolean = false;
  currentUser: User = new User();

  constructor(private router: Router, private eventService: EventEmitterService,
    private localStorageService: SessionStoreService) {

    debugger
    this.eventService.changeEmitted$.subscribe(
      user => {
        debugger
        this.currentUser = user;
        this.isAuthenticated = user.isValid;
        this.router.navigate(['home']);
      });

    if (!this.isAuthenticated) this.logout();

  }

  ngOnInit(): void {
  }

  logout() {
    this.isAuthenticated = false;
    this.localStorageService.clearSession();
    this.router.navigate(['login'])
  }

}
