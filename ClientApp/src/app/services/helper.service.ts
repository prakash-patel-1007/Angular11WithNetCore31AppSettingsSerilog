import { Injectable } from "@angular/core";

@Injectable()
export class HelperService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly PERMISSIONS = 'permissions';
  private readonly STORED_USERID = 'stored_userId';

  constructor() {
  }

  getAccessToken(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setAuthenticatedUserAccessToken(token: any) {
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  setPermissions(value: string): void {
    sessionStorage.setItem(this.PERMISSIONS, value);
  }

  getPermissions(): string[] {
    const permissionsString = sessionStorage.getItem(this.PERMISSIONS);

    if (!permissionsString) {
      return [];
    }

    return permissionsString.split(',');
  }

  clearToken(): void {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.PERMISSIONS);
    sessionStorage.removeItem(this.STORED_USERID);
  }

  storeUserId(value: string) {
    sessionStorage.setItem(this.STORED_USERID, value);
  }

  getStoredUserId() {
      return sessionStorage.getItem(this.STORED_USERID);
  }

}
