FROM node:21.7.3

# Set the installation directory for bun
ENV BUN_INSTALL="/usr/local/bun"

# Install bun
RUN curl -fsSL https://bun.sh/install | BUN_INSTALL="$BUN_INSTALL" bash && \
    chmod +x "$BUN_INSTALL/bin/bun"

# Add bun to the PATH
ENV PATH="$BUN_INSTALL/bin:$PATH"

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .
 
EXPOSE 3001

CMD [ "bun", "run", "test" ]