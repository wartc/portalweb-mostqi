FROM node:lts as dependencies
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /src
COPY . .
COPY --from=dependencies /src/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /src
ENV NODE_ENV production

COPY --from=builder /src/next.config.js ./
COPY --from=builder /src/public ./public
COPY --from=builder /src/.next ./.next
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]