import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { LIST } from 'src/app/shared/constants/list.const';
import { PopupData } from 'src/app/shared/interfaces/post-create.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  list = LIST;
  popupData: any;
  popupVisible = false;
  isLoggedIn: boolean = false;
  authSubscription: Subscription | undefined;
  
  constructor(public authService: AuthService, public router: Router,) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });  
  }

  toggleCollapsed(item:any): void {
    this.list.forEach(listItem => {
      if (listItem !== item) {
        listItem.collapsed = false;
      }
    });
    item.collapsed = !item.collapsed;
  }

  createPost(item:any) {
    this.popupVisible = true;    
  }

  onCerrarPopup(nuevosDatos: PopupData): void {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].collapsed) {
        this.list[i].post.push(nuevosDatos)
      }
    }
    this.popupVisible = false;
  }
}
