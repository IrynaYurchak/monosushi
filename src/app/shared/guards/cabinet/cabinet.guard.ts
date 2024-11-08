import { CanActivateFn, Router} from '@angular/router';
import { ROLE } from '../../constant/role.constant';
import { inject } from '@angular/core';

export const cabinetGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  if (currentUser && (currentUser.role === ROLE.USER || currentUser.role === ROLE.USER)) {
    return true;
  }
  return  router.parseUrl('/');

};
