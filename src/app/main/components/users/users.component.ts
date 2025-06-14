import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/constants/interfaces';
import { AlertService } from '../../../../core/services/alert.service';
import { HttpService } from '../../../../core/services/http.service';
import { APIS } from '../../../../core/constants/server-endpoints';
import { debounceTime, skip } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: false,
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  currentPage: number = 1;
  pageSize: number = 5;
  math = Math;

  totalRecords: number = 0;
  pagination = {
    limit: 10,
    skip: 0,
  };

  users: any = [];

  constructor(private alert: AlertService, private http: HttpService) {}

  ngOnInit(): void {
    this.getUserList();
    this.listenSearchChanges();
  }

  /**
   * listen changes of search field.
   */
  listenSearchChanges() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.pagination.skip = 0;
      this.currentPage = 1;
      this.getUserList()
    });
  }

  /**
   * getter fuction to get total pages.
   */
  get totalPages() {
    let pages = this.totalRecords / this.pagination.limit;
    return Array(Math.ceil(this.totalRecords / this.pagination.limit) || 1);
  }

  /**
   * function implemented to get user list
   */
  getUserList() {
    this.http
      .get(APIS.MAIN.USER_LIST, {
        ...this.pagination,
        q: this.searchControl.value || '',
      })
      .subscribe({
        next: (res: any) => {
          this.users = res.users;
          this.totalRecords = res.total;
        },
        error: (error) => {
          this.alert.error(error.error.message);
        },
      });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.pagination.skip = (this.currentPage - 1) * this.pagination.limit;
    this.getUserList();
  }

  nextPage() {
    if (this.currentPage < this.totalRecords) {
      this.currentPage++;
      this.pagination.skip = (this.currentPage - 1) * this.pagination.limit;
      this.getUserList();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pagination.skip = (this.currentPage - 1) * this.pagination.limit;
      this.getUserList();
    }
  }

  editUser() {
    this.alert.info(
      'Due to time limitation i have not implemented this functionality, and also not included in requirements.'
    );
  }

  viewDetails() {
    this.alert.info(
      'Due to time limitation i have not implemented this functionality, and also not included in requirements.'
    );
  }
}
