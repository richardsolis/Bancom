import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { of } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let dialog: MatDialog;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        MatCheckboxModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        MatDialog
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('llamar a AuthService.login cuando el formulario se envía con credenciales válidas', () => {
    const email = 'richard@solis.com';
    const password = 'bancom';
    const mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockAuthService.login.and.returnValue(of(true));
    const routerSpy = spyOn(component.router, 'navigate');
    component.loginForm.setValue({ email, password, remember: false });
    component.onSubmit();
    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    expect(routerSpy).toHaveBeenCalledWith(['/usuarios']);
  });

  it('mostrar un mensaje de error si falla la autenticación', () => {
    const email = 'richard@solis.com';
    const password = 'bancom';
    const mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockAuthService.login.and.returnValue(of(false));
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
    component.loginForm.setValue({ email, password, remember: false });
    component.onSubmit();
    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    expect(dialogSpy).toHaveBeenCalled();
  });
  
});
