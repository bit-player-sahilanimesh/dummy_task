import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/constants/interfaces';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{
  
  userProfile: User | undefined;
  
  ngOnInit(): void {
    
  }

  getUserProfile() {
    
  }

}
