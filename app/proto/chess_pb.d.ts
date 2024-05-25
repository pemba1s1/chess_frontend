import * as jspb from 'google-protobuf'



export class Player extends jspb.Message {
  getName(): string;
  setName(value: string): Player;

  getColor(): Color;
  setColor(value: Color): Player;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Player.AsObject;
  static toObject(includeInstance: boolean, msg: Player): Player.AsObject;
  static serializeBinaryToWriter(message: Player, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Player;
  static deserializeBinaryFromReader(message: Player, reader: jspb.BinaryReader): Player;
}

export namespace Player {
  export type AsObject = {
    name: string,
    color: Color,
  }
}

export class CreateRoomRequest extends jspb.Message {
  getPlayer1(): Player | undefined;
  setPlayer1(value?: Player): CreateRoomRequest;
  hasPlayer1(): boolean;
  clearPlayer1(): CreateRoomRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRoomRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRoomRequest): CreateRoomRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRoomRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRoomRequest;
  static deserializeBinaryFromReader(message: CreateRoomRequest, reader: jspb.BinaryReader): CreateRoomRequest;
}

export namespace CreateRoomRequest {
  export type AsObject = {
    player1?: Player.AsObject,
  }
}

export class RoomResponse extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): RoomResponse;

  getStatus(): string;
  setStatus(value: string): RoomResponse;

  getPlayer1(): Player | undefined;
  setPlayer1(value?: Player): RoomResponse;
  hasPlayer1(): boolean;
  clearPlayer1(): RoomResponse;

  getPlayer2(): Player | undefined;
  setPlayer2(value?: Player): RoomResponse;
  hasPlayer2(): boolean;
  clearPlayer2(): RoomResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RoomResponse): RoomResponse.AsObject;
  static serializeBinaryToWriter(message: RoomResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomResponse;
  static deserializeBinaryFromReader(message: RoomResponse, reader: jspb.BinaryReader): RoomResponse;
}

export namespace RoomResponse {
  export type AsObject = {
    roomid: string,
    status: string,
    player1?: Player.AsObject,
    player2?: Player.AsObject,
  }
}

export class JoinRoomRequest extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): JoinRoomRequest;

  getPlayer2(): Player | undefined;
  setPlayer2(value?: Player): JoinRoomRequest;
  hasPlayer2(): boolean;
  clearPlayer2(): JoinRoomRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinRoomRequest.AsObject;
  static toObject(includeInstance: boolean, msg: JoinRoomRequest): JoinRoomRequest.AsObject;
  static serializeBinaryToWriter(message: JoinRoomRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinRoomRequest;
  static deserializeBinaryFromReader(message: JoinRoomRequest, reader: jspb.BinaryReader): JoinRoomRequest;
}

export namespace JoinRoomRequest {
  export type AsObject = {
    roomid: string,
    player2?: Player.AsObject,
  }
}

export class GetRoomsResponse extends jspb.Message {
  getRoomsList(): Array<RoomResponse>;
  setRoomsList(value: Array<RoomResponse>): GetRoomsResponse;
  clearRoomsList(): GetRoomsResponse;
  addRooms(value?: RoomResponse, index?: number): RoomResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRoomsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRoomsResponse): GetRoomsResponse.AsObject;
  static serializeBinaryToWriter(message: GetRoomsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRoomsResponse;
  static deserializeBinaryFromReader(message: GetRoomsResponse, reader: jspb.BinaryReader): GetRoomsResponse;
}

export namespace GetRoomsResponse {
  export type AsObject = {
    roomsList: Array<RoomResponse.AsObject>,
  }
}

export class Coordinate extends jspb.Message {
  getX(): number;
  setX(value: number): Coordinate;

  getY(): number;
  setY(value: number): Coordinate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Coordinate.AsObject;
  static toObject(includeInstance: boolean, msg: Coordinate): Coordinate.AsObject;
  static serializeBinaryToWriter(message: Coordinate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Coordinate;
  static deserializeBinaryFromReader(message: Coordinate, reader: jspb.BinaryReader): Coordinate;
}

export namespace Coordinate {
  export type AsObject = {
    x: number,
    y: number,
  }
}

export class Move extends jspb.Message {
  getFrom(): Coordinate | undefined;
  setFrom(value?: Coordinate): Move;
  hasFrom(): boolean;
  clearFrom(): Move;

  getTo(): Coordinate | undefined;
  setTo(value?: Coordinate): Move;
  hasTo(): boolean;
  clearTo(): Move;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Move.AsObject;
  static toObject(includeInstance: boolean, msg: Move): Move.AsObject;
  static serializeBinaryToWriter(message: Move, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Move;
  static deserializeBinaryFromReader(message: Move, reader: jspb.BinaryReader): Move;
}

export namespace Move {
  export type AsObject = {
    from?: Coordinate.AsObject,
    to?: Coordinate.AsObject,
  }
}

export class MoveRequest extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): MoveRequest;

  getPlayer(): Player | undefined;
  setPlayer(value?: Player): MoveRequest;
  hasPlayer(): boolean;
  clearPlayer(): MoveRequest;

  getMove(): Move | undefined;
  setMove(value?: Move): MoveRequest;
  hasMove(): boolean;
  clearMove(): MoveRequest;

  getKilledpiece(): PieceType;
  setKilledpiece(value: PieceType): MoveRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MoveRequest): MoveRequest.AsObject;
  static serializeBinaryToWriter(message: MoveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveRequest;
  static deserializeBinaryFromReader(message: MoveRequest, reader: jspb.BinaryReader): MoveRequest;
}

export namespace MoveRequest {
  export type AsObject = {
    roomid: string,
    player?: Player.AsObject,
    move?: Move.AsObject,
    killedpiece: PieceType,
  }
}

export class MoveResponse extends jspb.Message {
  getMove(): Move | undefined;
  setMove(value?: Move): MoveResponse;
  hasMove(): boolean;
  clearMove(): MoveResponse;

  getPlayer(): Player | undefined;
  setPlayer(value?: Player): MoveResponse;
  hasPlayer(): boolean;
  clearPlayer(): MoveResponse;

  getKilledpiece(): PieceType;
  setKilledpiece(value: PieceType): MoveResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MoveResponse): MoveResponse.AsObject;
  static serializeBinaryToWriter(message: MoveResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveResponse;
  static deserializeBinaryFromReader(message: MoveResponse, reader: jspb.BinaryReader): MoveResponse;
}

export namespace MoveResponse {
  export type AsObject = {
    move?: Move.AsObject,
    player?: Player.AsObject,
    killedpiece: PieceType,
  }
}

export class GetRoomRequest extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): GetRoomRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRoomRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRoomRequest): GetRoomRequest.AsObject;
  static serializeBinaryToWriter(message: GetRoomRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRoomRequest;
  static deserializeBinaryFromReader(message: GetRoomRequest, reader: jspb.BinaryReader): GetRoomRequest;
}

export namespace GetRoomRequest {
  export type AsObject = {
    roomid: string,
  }
}

export class RoomResponseStream extends jspb.Message {
  getRoomid(): string;
  setRoomid(value: string): RoomResponseStream;

  getPlayer(): Player | undefined;
  setPlayer(value?: Player): RoomResponseStream;
  hasPlayer(): boolean;
  clearPlayer(): RoomResponseStream;

  getMove(): Move | undefined;
  setMove(value?: Move): RoomResponseStream;
  hasMove(): boolean;
  clearMove(): RoomResponseStream;

  getKilledpiece(): PieceType;
  setKilledpiece(value: PieceType): RoomResponseStream;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomResponseStream.AsObject;
  static toObject(includeInstance: boolean, msg: RoomResponseStream): RoomResponseStream.AsObject;
  static serializeBinaryToWriter(message: RoomResponseStream, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomResponseStream;
  static deserializeBinaryFromReader(message: RoomResponseStream, reader: jspb.BinaryReader): RoomResponseStream;
}

export namespace RoomResponseStream {
  export type AsObject = {
    roomid: string,
    player?: Player.AsObject,
    move?: Move.AsObject,
    killedpiece: PieceType,
  }
}

export enum PieceType { 
  NONE = 0,
  KING = 1,
  QUEEN = 2,
  ROOK = 3,
  BISHOP = 4,
  KNIGHT = 5,
  PAWN = 6,
}
export enum Color { 
  WHITE = 0,
  BLACK = 1,
}
