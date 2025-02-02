import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutLoginButtonComponent } from './logout-login-button.component';

describe('LogoutComponent', () => {
  let component: LogoutLoginButtonComponent;
  let fixture: ComponentFixture<LogoutLoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutLoginButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
