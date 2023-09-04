import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { AuthenticationInputDto } from '../dto/authentication.service.dto'
import { AuthenticationServiceGateway } from '../gateway/authentication-adm.gateway'

@Injectable()
export default class AuthenticationService
  implements AuthenticationServiceGateway
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async authenticateUseCase(
    input: AuthenticationInputDto,
  ): Promise<string> {
    const user = await this.userRepository.findOneBy({
      email: input.email,
      username: input.username,
    })
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    const passwordDecoded = Buffer.from(input.password, 'base64').toString()

    const isMatch = bcrypt.compareSync(passwordDecoded, user.passwd)
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const data = 'fake data'
    const token = await this.jwtService.signAsync({ data })

    return token
  }
}