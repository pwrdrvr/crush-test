# Stage 1: Download and extract k6
FROM alpine:3.21 AS k6-downloader
ARG K6_VERSION=v0.58.0
WORKDIR /tmp
RUN apk add --no-cache curl tar && \
    curl -L https://github.com/grafana/k6/releases/download/${K6_VERSION}/k6-${K6_VERSION}-linux-amd64.tar.gz -o k6.tar.gz && \
    tar -xzf k6.tar.gz

# Stage 2: Lambda base image
FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20

# Download and install oha
RUN curl -L https://github.com/hatoo/oha/releases/download/v1.8.0/oha-linux-amd64 -o /usr/local/bin/oha && \
    chmod +x /usr/local/bin/oha

# Copy k6 binary from builder
COPY --from=k6-downloader /tmp/k6-v0.58.0-linux-amd64/k6 /usr/local/bin/k6
RUN chmod +x /usr/local/bin/k6

# Create app directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Install production dependencies
COPY package*.json ./
RUN npm i

# Copy built Lambda code
COPY dist/ ./

# Set the handler
CMD [ "handler.handler" ]
