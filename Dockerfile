# FROM node:v9.3.0

# EXPOSE 8080

# WORKDIR /bindmount

# COPY package-lock.json package.json ./

# RUN yarn

# RUN npm rebuild node-sass

# CMD yarn run dev

FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

WORKDIR /app
COPY . ./

RUN yarn

CMD if [ ${APP_ENV} = production ]; \
	then \
	yarn && \
	yarn run prod && \
	else \
	yarn run dev; \
	fi

EXPOSE 8080