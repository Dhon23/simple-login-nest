import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { comparePass } from 'src/helpers/bcrypt';
import { signToken } from 'src/helpers/jwt';
import { errorHandler } from 'src/middlewares/errorHandler';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      createUserDto.status = 'pending';
      await this.usersService.create(createUserDto);
      return { message: 'Account created' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;
      if (!email) throw { code: 7 };
      if (!password) throw { code: 8 };
      const result: { password: string; role: string; status: string } =
        await this.usersService.findOne({
          email,
        });
      if (!result) throw { code: 1 };
      if (!comparePass(password, result.password)) throw { code: 1 };
      if (result.status === 'pending') throw { code: 5 };
      if (result.status === 'rejected') throw { code: 6 };
      return {
        access_token: signToken({ email, role: result.role }),
      };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Get('pending')
  async pendingEmail() {
    try {
      return this.usersService.findAll({ status: 'pending' });
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Patch('pending/:email')
  async changeStatus(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.usersService.update(
        { email },
        { status: updateUserDto.status },
      );
      return { message: 'Status changed' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll({});
  }

  @Patch()
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const decodedToken: any = req.headers.user;
    const { email } = decodedToken;
    await this.usersService.update(
      { email },
      { password: updateUserDto.password },
    );
    return { message: 'Password changed' };
  }
}
