FROM docker/github-actions

ENV GH_TOKEN=${GH_TOKEN}

ENV PATH=sucht

RUN gh repo clone brtmvdl/${PATH} /project

RUN ls -la /project

# WORKDIR /app

# RUN gh repo clone brtmvdl/brtmvdl.github.io . 

# RUN cp /project/src/github.io/ ./${PATH} -rfv

# RUN git add *

# RUN git commit -m "Fixing ${PATH} project"

# RUN gh repo sync
