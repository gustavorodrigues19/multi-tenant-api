import Tenant from 'src/@shared/entities/tenant.entity'
import { UserOutputDto } from '../dto/users-service.dto'
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcryptjs'
import Franchise from '../../@shared/entities/franchise.entity'

export default class UserMapper {
  static toDomain(input: any, franchises: Franchise[], tenant: Tenant): any {
    const salt = bcrypt.genSaltSync(10)
    const passwordDecoded = Buffer.from(input.passwd, 'base64').toString()
    const hash = bcrypt.hashSync(passwordDecoded, salt)

    return {
      ...(input?.id && { id: input.id }),
      username: input.username,
      email: input.email,
      passwd: hash,
      role: input.role,
      language: input.language,
      isActive: input.isActive,
      franchises,
      tenant,
    }
  }

  static toUserOutputDto(user: User): UserOutputDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      language: user.language,
      isActive: user.isActive,
      franchises: user.franchises.map((franchise) => ({
        id: franchise.id,
        name: franchise.name,
      })),
    }
  }
}
