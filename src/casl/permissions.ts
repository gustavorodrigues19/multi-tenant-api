export const PERMISSIONS_PER_ROLE = {
  MASTER_ADMIN: {
    tenants: ['*'],
    plans: ['*'],
    franchises: ['*'],
    administrators: ['*'],
  },
  ORGANIZATION_ADMIN: {
    tenants: ['view', 'edit'],
    plans: ['create', 'view', 'edit', 'delete'],
    administrators: ['create', 'view', 'edit', 'delete'],
    franchises: ['create', 'view', 'edit', 'delete'],
  },
  FRANCHISE_ADMIN: {
    tenants: ['view'],
    administrators: ['create', 'view', 'edit', 'delete'],
    franchises: ['view', 'edit'],
    plans: ['create', 'view', 'edit', 'delete'],
  },
  COACH_ADMIN: {
    administrators: [],
  },
  CLIENT_ADMIN: {
    administrators: [],
  },
  FINANCE_ADMIN: {
    administrators: [],
  },
  ATHLETE_ADMIN: {
    administrators: [],
  },
  CUSTOM_ADMIN: {
    administrators: [],
  },
}
