# 1. Base image with Node.js
FROM node:18

# 2. Set working directory
WORKDIR /grow-metrics

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the source code
COPY . .

# 5. Build TypeScript into JavaScript
RUN npm run build

# 6. Expose port (change if needed)
EXPOSE 3000

# 7. Start the compiled app
CMD ["npm", "start"]
