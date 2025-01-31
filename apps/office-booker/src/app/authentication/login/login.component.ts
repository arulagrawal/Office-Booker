import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component'

import { IUser, CognitoService } from '../../cognito.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from '../../app.component';



@Component({
  selector: 'office-booker-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  showPassword: boolean
  loading: boolean;
  user: IUser;
  loggedIn = false;

  constructor(private router: Router,
              private cognitoService: CognitoService,
              ) {
    this.loading = false;
    this.showPassword = false;
    this.user = {} as IUser;
  }

  ngOnInit() {
    if ((localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"))) {
      this.router.navigate(['/bookings']);
    } 
    
  }


  // Function that uses cognito services to sign the user in and check admin status. It navigates to the 
  // personal bookings page if successful, otherwise it prints an error

  public signIn(): void {
    this.loading = true;
    // if (this.user.username == null) { this.loading=false; alert("Please enter an email address"); return;}
    this.cognitoService.signIn(this.user)
    .then(() => {
      // this.app.signIn();
      // this.cognitoService.
      this.cognitoService.setAuthenticated(true);
      this.cognitoService.hasAdmin();
      this.cognitoService.hasGuest();
      this.cognitoService.getCompany();
      this.cognitoService.getName();

      this.router.navigate(['/bookings']);
    }).catch((e) => {
      alert(e)
    this.loading = false;
    });
  }
  
  //function to navigate to registration page
  moveToRegister() : void {
    this.router.navigate(['/registration']);
  }

  forgotPassword() : void {
    // this.router.navigate(['/forgot-password']); //temp removal due to not being implemented yet
    alert("For the moment, please contact your system administrator to reset your password");
  }

  //function to check if user is an admin
  isAdmin(): boolean {
    {
         if (this.cognitoService.admin()) {
           return true;
       } else {
           return false;
        }
       }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}
