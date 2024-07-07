FROM alpine:latest

ARG DOCUMENTROOT="/etc/nginx"

WORKDIR ${DOCUMENTROOT}

RUN apk update && \
    apk add nginx && \
    mkdir includes && \
    rm -f ${DOCUMENTROOT}/conf.d/* ${DOCUMENTROOT}/sites-available/* ${DOCUMENTROOT}/sites-enabled/* && \
    rm -rf /var/cache/apk/*

COPY includes/* ${DOCUMENTROOT}/includes
COPY nginx.conf ${DOCUMENTROOT}
COPY site.conf ${DOCUMENTROOT}/sites-available/

RUN if [ ! -d "${DOCUMENTROOT}/sites-enabled" ]; then mkdir -p ${DOCUMENTROOT}/sites-enabled; fi && \
    ln -s ${DOCUMENTROOT}/sites-available/* ${DOCUMENTROOT}/sites-enabled/

CMD ["nginx", "-g", "daemon off;"]