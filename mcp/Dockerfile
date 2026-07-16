FROM node:20-alpine AS builder
WORKDIR /app/mcp
COPY mcp/package.json mcp/package-lock.json* ./
RUN npm install
COPY mcp/tsconfig.json ./
COPY mcp/src ./src
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3100
ENV HOST=0.0.0.0
ENV SENDCHAMP_AI_ROOT=/app
ENV MCP_TRANSPORT=http
COPY mcp/package.json mcp/package-lock.json* ./mcp/
WORKDIR /app/mcp
RUN npm install --omit=dev
COPY --from=builder /app/mcp/dist ./dist
WORKDIR /app
COPY openapi ./openapi
COPY guides ./guides
WORKDIR /app/mcp
EXPOSE 3100
CMD ["node", "dist/server.js", "--http"]
