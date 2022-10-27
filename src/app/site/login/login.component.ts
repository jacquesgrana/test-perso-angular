import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  pseudo !: string;
  password !: string;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group(
      {
        pseudo: this.pseudo,
        password: this.password
      }
    );
   }

  ngOnInit(): void {
  }

  login() {
    this.pseudo = this.form.controls['pseudo'].value;
    this.password = this.form.controls['password'].value;

    //console.log('login : pseudo : ' + this.pseudo + ' / password : ' + this.password);
    const token = this.userService.login(this.pseudo, this.password);
/*
    if(this.userService.isAuthenticated) {
      // diriger selon les roles
      this.router.navigate(['admin']);
    }*/
  }
}
