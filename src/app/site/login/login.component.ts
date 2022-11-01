import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  pseudo !: FormControl;
  password !: FormControl;
  hide: boolean = true;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group(
      {
        pseudo: new FormControl(this.pseudo, [Validators.required]),
        password: new FormControl(this.password, [Validators.required, Validators.min(3)])
      }
    );
   }

  ngOnInit(): void {
  }

  login() {
    const pseudo = this.form.controls['pseudo'].value;
    const password = this.form.controls['password'].value;
    if (this.form.valid) {
      this.userService.login(pseudo, password);
    }

  }
}
