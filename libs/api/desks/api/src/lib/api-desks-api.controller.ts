import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';

class createDeskDto {
    roomId: number;
    LocationRow: number;
    LocationCol: number;
    Height: number;
    Width: number;
    isMeetingRoom: boolean;
    capacity: number;

}

@UseGuards(AuthGuard('jwt'))
@Controller('desks')
export class ApiDesksApiController {
    constructor(private deskService: ApiDesksRepositoryDataAccessService) {}

    @Get()
    async getAll() {
        console.log("adasdasd");
        return await this.deskService.getDesks();
    }

    @Get('/room/:roomId')
    async getDesksInRoom(@Param('roomId') roomId: string) {
        return await this.deskService.getDesksInRoom(Number(roomId));
    }

    @Post('/')
    async createDeskInRoom(@Body() postData: createDeskDto) {
        console.log("Hello");
        const { roomId, LocationRow, LocationCol, Height, Width, isMeetingRoom, capacity } = postData;
        return await this.deskService.createDeskByRoomId({
            Room: {
                connect: {
                    id: roomId,
                },
            },
            LocationRow: LocationRow,
            LocationCol: LocationCol,
            Height: Height,
            Width: Width,
            isMeetingRoom: isMeetingRoom,
            capacity: capacity,

        });
    }
}
