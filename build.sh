export REPO=fernandosanchez/appstudio
export IMAGE_NAME=groundcontrol

IMAGE=$(docker build . |grep "Successfully built"| awk '{ print $3 }')
docker tag $IMAGE $REPO:$IMAGE_NAME
docker push $REPO:$IMAGE_NAME
