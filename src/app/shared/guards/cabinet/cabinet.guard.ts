import { ROLE } from '../../constant/role.constant';
import { inject } from '@angular/core';
import {CanActivateFn, Router} from "@angular/router";

export const cabinetGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let currentUser: any;

  try {
    currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  } catch (error) {
    return router.parseUrl('/');
  }

  if (currentUser && (currentUser.role === ROLE.USER || currentUser.role === ROLE.ADMIN)) {
    return true;
  }
  return router.parseUrl('/');
};
