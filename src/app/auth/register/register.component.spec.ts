import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../shared/material/material.module';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {
  AuthService,
  CountryService,
  FormsCommon,
  UserRegisterInterfaceMock,

} from '@app-core';
import {By} from '@angular/platform-browser';
import {RegisterComponent} from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let form: FormGroup;
  let countryService: CountryService;
  let authService: AuthService;
  let router: Router;

  const querySelector = (query: string): HTMLElement => fixture.debugElement.query(By.css(query))?.nativeElement;

  beforeEach(async () => {
    const routerMock = {navigate: jest.fn().mockImplementation(() => Promise.resolve())};
    const authServiceMock = {registerUser: jest.fn(), setUser: jest.fn(), logInUser: jest.fn()};
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        {provide: Router, useValue: routerMock},
        {provide: AuthService, useValue: authServiceMock},
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);

    form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.min(FormsCommon.user_name_min_length), Validators.required]),
      password: new FormControl('', [Validators.min(FormsCommon.password_min_length), Validators.required]),
      full_name: new FormControl(''),
      country: new FormControl(null, [Validators.required]),
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getter method for the form', () => {
    expect(component.register_form.value).toEqual(form.value);
  });

  it('should have a getter method for email', () => {
    expect(component.email.value).toEqual(form.get('email')?.value);
  });

  it('should have a getter method for password', () => {
    expect(component.password.value).toEqual(form.get('password')?.value);
  });

  it('should have a getter method for full_name', () => {
    expect(component.full_name.value).toEqual(form.get('full_name')?.value);
  });

  it('should have a getter method for country', () => {
    expect(component.country.value).toEqual(form.get('country')?.value);
  });



  it('should enable the Form when it is  valid ', () => {
    component.register_form.reset();
    fixture.detectChanges();
    const element = querySelector('#form-submit-button') as HTMLButtonElement;
    expect(element.getAttribute('disabled')).toBeTruthy();
  });

  it('should disable when register_form is not valid ', () => {
    component.register_form.setValue(UserRegisterInterfaceMock);
    fixture.detectChanges();
    const element = querySelector('#form-submit-button') as HTMLButtonElement;
    expect(element.getAttribute('disabled')).toBeFalsy();
  });

  it('should register employee in the system and navigate to app', async () => {
    const spyAuthServiceLogIn = jest.spyOn(authService, 'logInUser');
    component.register_form.setValue(UserRegisterInterfaceMock);
    await component.submit_form();
    expect(spyAuthServiceLogIn).toBeCalled();
  });

  describe('Form', () => {
    const getControl = (name: string) => component.register_form.get(name);
    const markControlAsTouched = (name: string) => {
      component.register_form.get(name)?.markAsTouched();
      fixture.detectChanges();
    };

    it('should render', () => {
      const element = querySelector('#registration_form');
      expect(element).toBeTruthy();
    });
    describe('Email', () => {
      const controlName = 'email';
      it('should render', () => {
        const element = querySelector('#email');
        expect(element).toBeTruthy();
      });

      it('should render correct label', () => {
        const element = querySelector('#email_label');
        expect(element.innerHTML.trim()).toEqual('Email');
      });

      it('should render correct hint', () => {
        const element = querySelector('#email_hint');
        expect(element.innerHTML.trim()).toEqual('Please enter your email');
      });

      it('should render correct placeholder', () => {
        const element = querySelector('#email_input') as HTMLInputElement;
        expect(element.getAttribute('data-placeholder')).toEqual('Ex. abc@email.com');
      });

      describe('Render errors', () => {
        it('should render invalid email error when invalid email is entered and control is touched', () => {
          getControl(controlName)?.patchValue('invalid email');
          markControlAsTouched(controlName);
          const element = querySelector('#email_error_invalid');
          expect(element).toBeTruthy();
        });
      });
    });

    describe('Username', () => {
      it('should render', () => {
        const element = querySelector('#username');
        expect(element).toBeTruthy();
      });

      it('should render correct label', () => {
        const element = querySelector('#username_label');
        expect(element.innerHTML.trim()).toEqual('Username');
      });

      it('should render correct hint', () => {
        const element = querySelector('#username_hint');
        expect(element.innerHTML.trim()).toEqual(`Please enter your username, Minimum <strong>8</strong> characters`);
      });

      it('should render correct placeholder', () => {
        const element = querySelector('#username_input') as HTMLInputElement;
        expect(element.getAttribute('data-placeholder')).toEqual('Ex. JohnDoe123');
      });
    });

    describe('Password', () => {
      it('should render', () => {
        const element = querySelector('#password');
        expect(element).toBeTruthy();
      });

      it('should render correct label', () => {
        const element = querySelector('#password_label');
        expect(element.innerHTML.trim()).toEqual('Password');
      });

      it('should render correct hint', () => {
        const element = querySelector('#password_hint');
        expect(element.innerHTML.trim()).toEqual(`Please enter your password, Minimum <strong>8</strong> characters`);
      });

      it('should render correct input type', () => {
        const element = querySelector('#password_input') as HTMLInputElement;
        expect(element.type).toEqual('password');
      });
    });

    describe('Full Name', () => {
      it('should render', () => {
        const element = querySelector('#full_name');
        expect(element).toBeTruthy();
      });

      it('should render correct label', () => {
        const element = querySelector('#full_name_label');
        expect(element.innerHTML.trim()).toEqual('Full name');
      });

      it('should render correct hint', () => {
        const element = querySelector('#full_name_hint');
        expect(element.innerHTML.trim()).toEqual(`Please enter your full name (optional)`);
      });

      it('should render correct placeholder', () => {
        const element = querySelector('#full_name_input') as HTMLInputElement;
        expect(element.getAttribute('data-placeholder')).toEqual('Ex. John Doe');
      });
    });

    describe('Country', () => {
      it('should render', () => {
        const element = querySelector('#country');
        expect(element).toBeTruthy();
      });

      it('should render correct label', () => {
        const element = querySelector('#country_label');
        expect(element.innerHTML.trim()).toEqual('Country');
      });

      it('should render correct hint', () => {
        const element = querySelector('#country_hint');
        expect(element.innerHTML.trim()).toEqual(`Please enter your country`);
      });
    });
  });
});
