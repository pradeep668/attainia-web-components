FROM alpine:3.6

ENV BUILD_PACKAGES bash python3 

RUN apk update && \
    apk upgrade && \
    apk add $BUILD_PACKAGES && \
    rm -rf /var/cache/apk/*

COPY .storybook-build /opt/storybook

WORKDIR /opt/storybook

ENTRYPOINT ["python3", "-m", "http.server"]
