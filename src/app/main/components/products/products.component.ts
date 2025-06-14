import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { AlertService } from '../../../../core/services/alert.service';
import { APIS } from '../../../../core/constants/server-endpoints';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  standalone: false,
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  currentPage: number = 1;
  pageSize: number = 5;

  totalRecords: number = 0;
  pagination = {
    limit: 10,
    skip: 0,
  };

  sorting = {
    sortBy: '',
    order: ''
  }

  products: any[] = [];

  constructor(private alert: AlertService, private http: HttpService) {}

  ngOnInit(): void {
    this.getProductList();
    this.listenSearchChanges();
  }

  /**
   * Listen for search input changes with debounce.
   */
  listenSearchChanges() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.pagination.skip = 0;
      this.currentPage = 1;
      this.getProductList();
    });
  }

  /**
   * Compute total pages from total records.
   */
  get totalPages() {
    const pages = Math.ceil(this.totalRecords / this.pagination.limit);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  /**
   * Fetch the product list from API.
   */
  getProductList() {
    this.http
      .get(APIS.MAIN.PRODUCT_LIST, {
        ...this.pagination,
        ...this.sorting,
        q: this.searchControl.value || '',
      })
      .subscribe({
        next: (res: any) => {
          this.products = res.products;
          this.totalRecords = res.total;
        },
        error: (err) => {
          this.alert.error(err.error?.message || 'Failed to fetch products.');
        },
      });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.pagination.skip = (this.currentPage - 1) * this.pagination.limit;
    this.getProductList();
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.pagination.skip = (this.currentPage - 1) * this.pagination.limit;
      this.getProductList();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pagination.skip = (this.currentPage - 1) * this.pagination.limit;
      this.getProductList();
    }
  }

  applysorting(order: string) {
    this.sorting.order = order;
    this.sorting.sortBy = 'price';
    this.getProductList();
  }

  editProduct() {
    this.alert.info('Edit functionality not implemented yet.');
  }

  viewDetails() {
    this.alert.info('Details functionality not implemented yet.');
  }
}
