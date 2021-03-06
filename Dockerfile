FROM registry.digitalservice.id/proxyjds/library/node:14.15.4-slim

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG NUXT_ENV_PUBLIC_URL
ARG API_URL
ARG APP_ENVIRONMENT
ARG SENTRY_DSN
ARG SENTRY_ENABLED
ARG SENTRY_SAMPLE_RATE
ARG GOOGLE_ANALYTICS_ID
ENV NUXT_ENV_PUBLIC_URL $NUXT_ENV_PUBLIC_URL
ENV API_URL $API_URL
ENV APP_ENVIRONMENT $APP_ENVIRONMENT
ENV SENTRY_ENABLED $SENTRY_ENABLED
ENV SENTRY_DSN $SENTRY_DSN
ENV SENTRY_SAMPLE_RATE $SENTRY_SAMPLE_RATE
ENV GOOGLE_ANALYTICS_ID $GOOGLE_ANALYTICS_ID
ENV HOST 0.0.0.0
ENV PORT 3000

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
