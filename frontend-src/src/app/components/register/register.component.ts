import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
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

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    let user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // validation for email
    if(!this.validateService.validateEmail(this.email)) {
      // show the flash message
      this.flashMessage.show("Please input a correct email!", {cssClass: 'alert-danger container', timeout: 2000});
    }
  }
}
