import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {BackendService, Method} from './backend.service';

@Injectable({
  providedIn: 'root'
})
class LoginService {
  constructor(private backendService: BackendService) {}

  isLoggedIn(): Promise<User> {
    return this.backendService.sendBackendRequest(Method.GET, `me`);
  }

  register(username: string, password: string): Promise<void> {
    return this.backendService.sendBackendRequest(Method.POST, `users`, {
      username: username,
      password: password
    });
  }
}

export {LoginService}