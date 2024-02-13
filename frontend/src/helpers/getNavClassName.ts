import cn from 'classnames';

export function getNavClassName({ isActive }: { isActive: boolean }) {
  return cn('Header__navigation-list-link', {
    'navlink-active': isActive
  });
}

export function getIconNavClassName({ isActive }: { isActive: boolean }) {
  return cn('Header__icon', {
    'account-active': isActive
  });
}

export function getLoginNavClassName({ isActive }: { isActive: boolean }) {
  return cn('LoginPage__nav-link', {
    'login-navlink-active': isActive
  });
}
