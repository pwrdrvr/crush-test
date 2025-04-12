FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20

# Download and install oha
RUN curl -L https://github.com/hatoo/oha/releases/download/v1.8.0/oha-linux-amd64 -o /usr/local/bin/oha && \
    chmod +x /usr/local/bin/oha

# Install k6
# RUN curl -L https://github.com/grafana/k6/releases/download/v0.49.0/k6-v0.49.0-linux-amd64.tar.gz | tar xz && \
#     cp k6-v0.49.0-linux-amd64/k6 /usr/local/bin/

# Create app directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Install production dependencies
COPY package*.json ./
RUN npm i

# Copy built Lambda code
COPY dist/ ./

# Set the handler
CMD [ "handler.handler" ]