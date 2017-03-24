import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
/*
  Anytime we use a service, we need to inject it into the constructor of the
  component.
*/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // variables from the form
  name: String;
  username: String;
  email: String;
  password: String;

  // injecting services
  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // on submitting form
  onRegisterSubmit() {
    let user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // validation for email
    if (!this.validateService.validateEmail(this.email)) {
      // show the flash message
      this.flashMessage.show("Please input a correct email!", { cssClass: 'alert-danger container', timeout: 2000 });
    } else {
      // subscribing to the auth service
      this.authService.registerUser(user).subscribe(data => {
        if (data.success) {
          this.flashMessage.show("You are registered!", { cssClass: 'alert-success container', timeout: 2000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show("This Username already exists", { cssClass: 'alert-warning container', timeout: 2000 });
          this.router.navigate(['/register']);
        }
      });
    }
  }
}
