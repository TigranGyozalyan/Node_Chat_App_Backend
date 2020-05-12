import express, { Router } from 'express';
import { Container } from 'typedi';
import { authMiddleware } from '../security';
import RoomService from '../service/RoomService';
import { CreateRoomDto } from '../domain/dto/CreateRoomDto';
import { RoomDto } from '../domain/dto/RoomDto';

const roomRouter: Router = express.Router();
const roomService: RoomService = Container.get(RoomService);

roomRouter.post('/room', authMiddleware, async (req, res) => {
  const dto = req.body as CreateRoomDto;

  try {
    const createdRoom = await roomService.createRoom(dto, req.user);
    res
      .status(200)
      .send(createdRoom);
  } catch (e) {
    res
      .status(e.statusCode)
      .send(e.message);
  }
});

roomRouter.put('/room', authMiddleware, async (req, res) => {
  const dto = req.body as RoomDto;

  try {
    const updatedRoom = await roomService.updateRoom(dto);
    res
      .status(200)
      .send(updatedRoom);
  } catch (e) {
    res
      .status(e.statusCode)
      .send(e.message);
  }
});

export default roomRouter;
