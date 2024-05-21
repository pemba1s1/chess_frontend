import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../proto/chess';

const PROTO_PATH = "../proto/chess.proto"
// Load your .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const grpcObj = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

const client = new grpcObj.chess.Chess('localhost:8080', grpc.credentials.createInsecure());

const handler = (req, res) => {
    // Call a method on your gRPC service
    client.CreateRoom({ player_1: { name: 'John', color: 'WHITE' } }, (error, response) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(response);
        }
    });
};
 
export default handler;
