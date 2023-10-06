/* 
* -> all actions or permissions
: -> separator sign
# -> all values inside that tenant and franchise are allowed
$ -> specific of values are allowed
*/
export const PERMISSIONS_PER_ROLE = {
  MASTER_ADMIN: {
    tenants: ['*:*'],
    plans: ['*:*'],
    franchises: ['*:*'],
    administrators: ['*:*'],
  },
  ORGANIZATION_ADMIN: {
    tenants: ['view:$', 'edit:$'],
    plans: ['view:*'],
    franchises: ['create:#', 'view:#', 'edit:#', 'delete:#'],
    administrators: ['create:#', 'view:#', 'edit:#', 'delete:#'],
  },
  FRANCHISE_ADMIN: {
    tenants: ['view:$'],
    plans: [],
    franchises: ['view:$', 'edit:$'],
    administrators: ['create:#', 'view:#', 'edit:#', 'delete:#'],
  },
  COACH_ADMIN: {
    tenants: [],
    plans: [],
    franchises: ['view:$'],
    administrators: [],
  },
  CLIENT_ADMIN: {
    tenants: [],
    plans: [],
    franchises: ['view:$'],
    administrators: [],
  },
  FINANCE_ADMIN: {
    tenants: [],
    plans: [],
    franchises: ['view:$'],
    administrators: [],
  },
  ATHLETE_ADMIN: {
    tenants: [],
    plans: [],
    franchises: ['view:$'],
    administrators: [],
  },
}
