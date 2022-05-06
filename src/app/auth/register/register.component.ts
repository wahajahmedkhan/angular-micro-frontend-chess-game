import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, countriesConstant, CountryService, FormsCommon} from '@app-core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  foamLoader = false;
  countries = countriesConstant;

  private registerFormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', [Validators.min(FormsCommon.user_name_min_length), Validators.required]),
    password: new FormControl('', [Validators.min(FormsCommon.password_min_length), Validators.required]),
    full_name: new FormControl(''),
    country: new FormControl(null, [Validators.required]),
  });

  constructor(private country_service: CountryService, private auth_service: AuthService, private router: Router) {}

  get register_form(): FormGroup {
    return this.registerFormGroup;
  }

  get email(): FormControl {
    return this.register_form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.register_form.get('password') as FormControl;
  }

  get username(): FormControl {
    return this.register_form.get('username') as FormControl;
  }

  get country(): FormControl {
    return this.register_form.get('country') as FormControl;
  }

  get full_name(): FormControl {
    return this.register_form.get('full_name') as FormControl;
  }

  submit_form(): void {
    this.foamLoader = true;
    // return this.auth_service
    //   .registerUser(this.register_form.value)
    //   .then(res => {
    this.auth_service.setUser(this.register_form.value);
    this.auth_service.logInUser();
    setTimeout(() => this.router.navigate(['/app']).then(), 3000);
    // })
    // .catch(e => console.error(e));
  }
}
