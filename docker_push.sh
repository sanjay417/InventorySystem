#Following commands will build all the docker images
sudo docker build . -f devops/auth.Dockerfile -t arunhiremath92:mocha-authserver
sudo docker build . -f devops/database.Dockerfile -t arunhiremath92:mocha-database
sudo docker build . -f devops/frontend.Dockerfile -t arunhiremath92:mocha-frontend
sudo docker build . -f devops/gateway.Dockerfile -t arunhiremath92:mocha-backend
sudo docker build . -f devops/notification.Dockerfile -t arunhiremath92:mocha-notification
sudo docker build . -f devops/inventory.Dockerfile -t arunhiremath92:mocha-inventory
sudo docker build . -f devops/transaction.Dockerfile -t arunhiremath92:mocha-transaction

#Get the docker image id using 
# sudo docker images


#Now for each image-id that was generated for each tag name, 
# create a tag to each docker image  using the below comands
# sudo docker tag <IMAGE_ID> arunhiremath92/arunhiremath92:mocha-authserver
# sudo docker tag <IMAGE_ID> arunhiremath92/arunhiremath92:mocha-database
# sudo docker tag <IMAGE_ID> arunhiremath92/arunhiremath92:mocha-frontend
# sudo docker tag <IMAGE_ID> arunhiremath92/arunhiremath92:mocha-backend
# sudo docker tag <IMAGE_ID> arunhiremath92/arunhiremath92:mocha-notification
# sudo docker tag <IMAGE_ID> arunhiremath92/arunhiremath92:mocha-inventory
# sudo docker tag <IMAGE_ID> arunhiremath92/arunhiremath92:mocha-transaction


#Publish all the images to be used to DockerHub using the below commands, 
#if you change the tag-name or repository name, make sure you update the same
#docker-compose.yml file

# sudo docker push arunhiremath92/arunhiremath92:mocha-authserver
# sudo docker push arunhiremath92/arunhiremath92:mocha-database
# sudo docker push arunhiremath92/arunhiremath92:mocha-frontend
# sudo docker push arunhiremath92/arunhiremath92:mocha-backend
# sudo docker push arunhiremath92/arunhiremath92:mocha-notification
# sudo docker push arunhiremath92/arunhiremath92:mocha-inventory


#Repeat all the steps for individual modules
#1)Make changes to server/frontend. to get an updated image the above commands 
#must be repeated again.


#Deploy and Testing:
# sudo docker swarm init 
# this is a optional --advertise-addr <IP>, linux users
# docker stack deploy -c docker-compose.yml mocha-demo

# to update, run the above command to update all dockem images
# to 
