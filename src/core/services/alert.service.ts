import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private baseToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000, // auto close after 3 seconds
    timerProgressBar: true,
    background: '#0e0e0e', // black background
    color: '#ffffff',      // white text
  });

  success(message: string) {
    this.baseToast.fire({
      icon: 'success',
      title: message
    });
  }

  error(message: string) {
    this.baseToast.fire({
      icon: 'error',
      title: message
    });
  }

  info(message: string) {
    this.baseToast.fire({
      icon: 'info',
      title: message
    });
  }

  warning(message: string) {
    this.baseToast.fire({
      icon: 'warning',
      title: message
    });
  }
}
