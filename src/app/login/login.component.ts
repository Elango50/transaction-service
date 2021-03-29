import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { EventEmitterService } from '../service/event-emitter.service';
import { SessionStoreService } from '../service/session-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInvalid: boolean = false;
  showSpinner: boolean = false;
  userDetails = new User();
  isAuthenticated: boolean = false;

  constructor(private eventService: EventEmitterService,
     private authService: AuthenticationService, private localStorageService: SessionStoreService) {
  }

  ngOnInit(): void {
    this.localStorageService.clearSession();
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {

    if (this.form.valid) {
      //TODO
      this.userDetails.id = this.form.value.username;
      this.userDetails.password = this.form.value.password;

      this.authService.validateUser(this.userDetails).subscribe({
        next: (result: any) => {
          //TODO
          this.loginInvalid = this.isAuthenticated = (result.toLowerCase == 'YES'.toLowerCase()) ? false : true;
          //TODO
          this.isAuthenticated = true;
          if (!this.isAuthenticated) return false;
          this.userDetails.isValid = this.isAuthenticated;
          this.userDetails.password = '';
          this.localStorageService.storeOnLocalStorage(this.userDetails);
          this.userDetails = this.localStorageService.loadUserFromLocalStorage();
          return true;
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log("çomplete");
          if (this.isAuthenticated) {
            this.eventService.emitChange(this.userDetails);
          }
          console.log('complete');
        }
      });

    }
  }

}
