import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { errorHandler } from 'src/middlewares/errorHandler';
import { ClaimsService } from './claims.service';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post(':_id')
  @ApiBearerAuth('access_token')
  async create(@Req() req: Request, @Param('_id') _id: string) {
    try {
      const decodedToken: any = req.headers.user;
      const { email } = decodedToken;
      await this.claimsService.create({
        userEmail: email,
        productId: _id,
        status: 'pending',
      });
      return { mesage: 'Claim requested' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Get()
  @ApiBearerAuth('access_token')
  async findAll() {
    return await this.claimsService.findAll();
  }

  @Patch(':_id')
  @ApiBearerAuth('access_token')
  async update(
    @Param('_id') _id: string,
    @Body() updateClaimDto: UpdateClaimDto,
  ) {
    const { status } = updateClaimDto;
    await this.claimsService.update({ _id }, { status });
    return { message: 'Claim status updated' };
  }
}
