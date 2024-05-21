## Prerequisites

- Protocol buffer complier. For installation instructions, see [Protocol Buffer Compiler Installation](https://grpc.io/docs/protoc-installation/).

## Local Development
### Clone Repo
```bash
git clone https://github.com/pemba1s1/chess_frontend.git
```
### Generate protobuf message classes and client service stub for the client
protoc-gen-grpc-web and protoc-gen-js are required for generating stub. These are installed as dev dependencies.
```bash
npm run build-proto
```

### Run App
```bash
npm run dev
```