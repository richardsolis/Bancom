import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/shared/components/message/message.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loader:boolean = false;

  constructor(private fb: FormBuilder, 
              public router: Router, 
              public authService: AuthService,
              public dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loader = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(finalize(() => this.loader = false))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/usuarios']);

        } else {
          this.message();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  message(): void {
    this.dialog.open(MessageComponent);
  }
  
}
