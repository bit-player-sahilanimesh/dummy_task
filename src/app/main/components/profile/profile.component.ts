import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/constants/interfaces';
import { HttpService } from '../../../../core/services/http.service';
import { APIS } from '../../../../core/constants/server-endpoints';
import { AlertService } from '../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../core/constants/routes';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{
  
  userProfile: User = {
    id: 1,
    username: 'emilys',
    email: 'emily.johnson@x.dummyjson.com',
    firstName: 'Emily',
    lastName: 'Johnson',
    gender: 'female',
    image: 'https://dummyjson.com/icon/emilys/128'
  };
  
  constructor(
    private http: HttpService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  /***
   * function implemented to get user profile
   */
  getUserProfile() {
    this.http.get(APIS.MAIN.PROFILE).subscribe({
      next: (res : any) => {
        this.userProfile = res;
      },
      error: (error) => {
        this.alert.error(error?.error?.message);
      }
    });
  }

  /**
   * function implemented to logout user.
   */
  logout(): void {
    localStorage.clear();
    this.alert.success('Logged out successfully!');
    this.router.navigate([ROUTES.AUTH.BASE]);
  }

}
