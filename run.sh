#!/bin/bash

imageName="test/dummyserver"
workdir="./src"

# Kills all containers based on the image
killContainers () {
  echo "Killing all containers based on the ${imageName} image"
  docker rm --force $(docker ps -q -a --filter "ancestor=${imageName}")
}

# Removes the Docker image
removeImage () {
  imageId=$(docker images -q ${imageName})
  if [[ -z ${imageId} ]]; then
    echo "${imageName} is not found."
  else
    echo "Removing image ${imageName}"
    docker rmi ${imageId}
  fi
}

# Builds the Docker image.
buildImage () {  
    dockerFileName="./src/Dockerfile"
    echo "Building the image $imageName."
    docker build -t $imageName -f "$dockerFileName" $workdir
}

# Runs a new container
runContainer () {
    echo "Running dummyserver container $imageName"
    docker-compose up -d
}

# Runs a new container
stop () {
    echo "Stopping dummyserver container $imageName"
    docker-compose stop
}

updateHostName () {
    echo "Adding to hostname"
    echo "127.0.0.1 dummyserver.local" >> /etc/hosts
}

# Shows the usage for the script.
showUsage () {
  echo "Usage: run.sh [COMMAND]"
  echo "    Runs dummyserver command"
  echo ""
  echo "Commands:"
  echo "    build: Builds current changes into a container"
  echo "    daemon: Runs dummyserver"
  echo "    buildandrun: Builds current directory into a container and runs via docker compose"
  echo "    cleanup: Deletes containers and images."
  echo "    updatehost: Updates host file, needs sudo permission."
  echo ""
  echo "Example:"
  echo "    ./run.sh daemon"
  echo ""
  echo "    This will:"
  echo "        Build a Docker image named $imageName using debug environment and start a new Docker container."
}

if [ $# -eq 0 ]; then
  showUsage
else
  case "$1" in
    "cleanup")
            killContainers
            removeImage
            ;;
    "build")
            buildImage
            ;;
    "daemon")
            runContainer
            ;;
    "buildandrun")
            buildImage
            runContainer
            ;;
    "stop")
            stop
            ;;
    "updatehost")
            updateHostName
            ;;
    *)
            showUsage
            ;;
  esac
fi