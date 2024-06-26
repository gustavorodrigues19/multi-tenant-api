import { Test, TestingModule } from '@nestjs/testing'
import { PermissionsGuard } from './casl-permissions.factory'
import { getContextMock, getProviders } from 'src/mocks/casl-permissions.mock'

describe('CaslPermissionsFactory tests', () => {
  describe('MASTER ADMIN permission tests', () => {
    let permissionsGuard: PermissionsGuard

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('tenants', 'view'),
      }).compile()

      permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)
    })
    it('MASTER_ADMIN - Allow full access', async () => {
      const permission = await permissionsGuard.canActivate(
        getContextMock('MASTER_ADMIN'),
      )
      expect(permission).toBe(true)
    })
  })

  describe('Organization admin permission tests', () => {
    it('gives an error to perform create tenant action', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('tenants', 'create'),
      }).compile()
      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)

      await permissionsGuard
        .canActivate(getContextMock('ORGANIZATION_ADMIN'))
        .catch((e) =>
          expect(e.message).toBe(
            'You do not have permission to perform this action',
          ),
        )
    })

    it('has permission to view own tenant', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('tenants', 'view'),
      }).compile()
      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)
      const permission = await permissionsGuard.canActivate(
        getContextMock('ORGANIZATION_ADMIN', {
          params: { id: '1ef3704c-0dff-459d-a898-e728a2692049' },
        }),
      )

      expect(permission).toBe(true)
    })

    it('gives an error to view tenant of another owner', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('tenants', 'view'),
      }).compile()

      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)
      await permissionsGuard
        .canActivate(
          getContextMock('ORGANIZATION_ADMIN', {
            params: { id: '1241214' },
          }),
        )
        .then((data) => {
          expect(data).toBe(false)
        })
        .catch((e) => {
          expect(e.message).toBe(
            'You do not have permission to perform this action',
          )
        })
    })
  })

  describe('Franchise admin permission tests', () => {
    it('gives error to perform create franchise action', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('franchises', 'create'),
      }).compile()
      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)

      await permissionsGuard
        .canActivate(getContextMock('FRANCHISE_ADMIN'))
        .catch((e) =>
          expect(e.message).toBe(
            'You do not have permission to perform this action',
          ),
        )
    })

    it('has permission to view own franchise', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('franchises', 'view'),
      }).compile()
      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)
      const permission = await permissionsGuard.canActivate(
        getContextMock('FRANCHISE_ADMIN', {
          params: { id: 'ec0f0af1-1f28-4b23-8cd0-fb6df0424414' },
        }),
      )

      expect(permission).toBe(true)
    })

    it('gives an error to view franchise of another owner', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('franchises', 'view'),
      }).compile()

      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)
      await permissionsGuard
        .canActivate(
          getContextMock('FRANCHISE_ADMIN', {
            params: { id: '1241214' },
          }),
        )
        .then((data) => {
          expect(data).toBe(false)
        })
        .catch((e) => {
          expect(e.message).toBe(
            'You do not have permission to perform this action',
          )
        })
    })

    it('has permission to view own administrator account', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('administrators', 'view'),
      }).compile()
      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)
      const permission = await permissionsGuard.canActivate(
        getContextMock('FRANCHISE_ADMIN', {
          params: { id: 'a9ce65ee-bb0d-417c-aa75-211cb72c5986' },
        }),
      )

      expect(permission).toBe(true)
    })

    it('gives an error to edit administrator account of another owner', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: getProviders('administrators', 'edit'),
      }).compile()

      const permissionsGuard = module.get<PermissionsGuard>(PermissionsGuard)
      await permissionsGuard
        .canActivate(
          getContextMock('FRANCHISE_ADMIN', {
            params: { id: '1241214' },
          }),
        )
        .then((data) => {
          expect(data).toBe(false)
        })
        .catch((e) => {
          expect(e.message).toBe(
            'You do not have permission to perform this action',
          )
        })
    })
  })
})
