import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentService } from '../services/component.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService,
    private http: HttpClient, 
    @Inject('BASE_URL') private baseUrl: string,
    private helperService: HelperService,
    private router: Router,
  ) { 
    this.form = this.fb.group({
      UserId: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Password: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.componentService.updateResult(false);
  }

  ngOnInit() {
  }

  login() {
    if (!this.form.get('UserId').value) {
      alert('Please select User Id!!');
      return;
    }
    if (!this.form.get('Password').value) {
      alert('Please select Password!!');
      return;
    }
    const loginData: LoginDetails = {
      userName: this.form.controls.UserId.value,
      password: this.form.controls.Password.value
    };

    this.http.post<any>(this.baseUrl + 'security/login', loginData).subscribe(result => {
      this.helperService.storeUserId(loginData.userName);
      this.helperService.setAuthenticatedUserAccessToken(result.token);
      this.helperService.setPermissions(result.permissions);
      this.router.navigate(['home'], { replaceUrl: true });
    }, error => alert(error.error));
  }

}

interface LoginDetails {
  userName: string;
  password: string;
}
