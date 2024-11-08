import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ROLE } from '../../constant/role.constant';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

  if (currentUser && (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER)) {
    return true; 
  }
  return router.parseUrl('/');
};
