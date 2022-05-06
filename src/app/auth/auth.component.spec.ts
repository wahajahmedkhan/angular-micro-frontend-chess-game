import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthComponent} from './auth.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show auth header', () => {
    expect(fixture.nativeElement.querySelector('[data-test="auth-header"]')).toBeTruthy();
  });

  it('should show auth logo', () => {
    expect(fixture.nativeElement.querySelector('[data-test="auth-logo"]')).toBeTruthy();
  });

  it('should show auth body', () => {
    expect(fixture.nativeElement.querySelector('[data-test="auth-body"]')).toBeTruthy();
  });

  it('should show auth footer', () => {
    expect(fixture.nativeElement.querySelector('[data-test="auth-footer"]')).toBeTruthy();
  });
});
