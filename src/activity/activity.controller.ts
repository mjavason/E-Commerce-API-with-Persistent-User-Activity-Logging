import { Controller, Get, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { MESSAGES } from 'src/constants';
import { SuccessResponse } from 'src/helpers/response.helper';
import { IResponseData } from 'src/interfaces/response.interface';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('activity')
@ApiTags('User Activity')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
@ApiBadRequestResponse({ description: MESSAGES.BAD_PARAMETERS })
export class ActivityController {
  // Define a dummy array for user activity
  private dummyUserActivity: any[] = [
    { userId: '6541bccf70101a35308b8c8d', action: 'Viewed MacBook Pro', timestamp: '2023-11-02T09:00:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Added Dell XPS 13 to Cart', timestamp: '2023-11-02T09:15:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Purchased Logitech MX Master 3', timestamp: '2023-11-02T09:30:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Viewed Samsung 49-Inch Ultrawide Monitor', timestamp: '2023-11-02T09:45:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Added Apple AirPods Pro to Cart', timestamp: '2023-11-02T10:00:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Removed HP Spectre x360 from Cart', timestamp: '2023-11-02T10:15:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Logged In', timestamp: '2023-11-02T10:30:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Updated Profile', timestamp: '2023-11-02T11:00:00Z' },
    { userId: '6541bccf70101a35308b8c8d', action: 'Scheduled Email Newsletter', timestamp: '2023-11-02T11:15:00Z' },
    // Add more user activities with real products and timestamps
  ];
  

  // Get a list of all user activities for a specific user with optional pagination (Dummy data)
  @Get(':userId/:pagination')
  @ApiOperation({
    summary: 'Get a list of all user activities for a specific user with pagination',
  })
  async getAllForUser(@Param('userId') userId: string, @Param('pagination') pagination: string): Promise<IResponseData<any[]>> {
    if (!userId) {
      throw new NotFoundException();
    }

    const userActivities = this.dummyUserActivity.filter((activity) => activity.userId === userId);

    if (userActivities.length === 0) {
      throw new NotFoundException();
    }

    return SuccessResponse(userActivities);
  }
}
