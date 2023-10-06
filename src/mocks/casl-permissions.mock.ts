import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Payload } from 'src/@shared/types/payload'
import { RoleKeys } from 'src/@shared/types/permissions'
import { PermissionsGuard } from 'src/casl/casl-permissions.factory'
import CaslService from 'src/casl/casl.service'

export const getProviders = (subject: string, action: string) => [
  PermissionsGuard,
  {
    provide: Reflector,
    useClass: class mockReflector {
      get = jest.fn(() => [{ subject, action }])
    },
  },
  CaslService,
]

export const getPayloadMock = (role: RoleKeys): { payload: Payload } => ({
  payload: {
    data: {
      tenant: {
        id: '1ef3704c-0dff-459d-a898-e728a2692049',
        name: 'Client 1',
      },
      user: {
        id: 'a9ce65ee-bb0d-417c-aa75-211cb72c5986',
        username: 'username',
        email: 'your-email@email.com',
        role,
      },
      franchises: [
        {
          id: 'ec0f0af1-1f28-4b23-8cd0-fb6df0424414',
          name: 'Franchise 1',
        },
        {
          id: 'de6da790-1790-46c3-903c-df35bf51ee31',
          name: 'Franchise 1',
        },
      ],
    },
  },
})

export const getContextMock = (
  role: RoleKeys,
  params?: any,
): ExecutionContext => ({
  getHandler: () => null,
  getClass: () => null,
  getArgs: () => null,
  getArgByIndex: () => null,
  switchToRpc: () => null,
  getType: () => null,
  switchToWs: () => null,
  switchToHttp: () => ({
    getRequest: () => ({
      ...(params || { params }),
      ...(getPayloadMock(role) as any),
    }),
    getResponse: () => null,
    getNext: () => null,
  }),
})
