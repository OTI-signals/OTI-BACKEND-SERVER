# Use an official Node.js runtime as the base image
# Start your image with a node base image
FROM node:16

# The /app directory should act as the main application directory
WORKDIR /

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
#COPY ./src ./src
COPY . .
# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install
RUN npm rebuild bcrypt --build-from-source
# && npm rebuild bcrypt \
# && npm install -g serve \
# && npm run build \

EXPOSE 3002

CMD [ "npm", "start"]
#docker build -t server .
