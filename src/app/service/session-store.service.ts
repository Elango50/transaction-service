import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../model/user';

const SESSION_KEY ='user_session';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  public clearSession() {
    this.storage.clear();
  }

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(user: User): void {
    this.storage.set(SESSION_KEY, user);
  }

  public isUserExist(): boolean {
    return this.storage.get(SESSION_KEY) != undefined;
  }

  public loadUserFromLocalStorage(): User {
    return this.storage.get(SESSION_KEY);
  }
}
