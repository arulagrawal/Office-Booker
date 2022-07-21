import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CognitoService } from '../../cognito.service';
import { BookingServiceService, employee } from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {

  admin = false;
  authenticated = false;
  email = "";


  constructor(private app: AppComponent,
    private cognitoService: CognitoService, 
    ) {
      
     
    
  }

  ngOnInit() {
    this.admin = this.cognitoService.authenticated();
    this.authenticated = this.cognitoService.admin();
    this.email = this.cognitoService.getEmailAddress();

    
  }

  signOut(): void {
    this.cognitoService.signOut();
    this.app.signOut();
  }

  isAuthenticated(): boolean {
    return this.cognitoService.authenticated();
  }

  isAdmin(): boolean {
    return this.cognitoService.admin();
  }

  isEmailAddress(): boolean {
    this.email = this.cognitoService.getEmailAddress();
    if (this.cognitoService.getEmailAddress() != null && this.isAuthenticated() )
      return true;
    return false;
  }
    


}


