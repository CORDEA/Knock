curl --header "Authorization: key=$1" \
    --header Content-Type:"application/json" \
    https://fcm.googleapis.com/fcm/send \
    -d "{\"to\": \"$2\",\"data\": {\"title\": \"payload here\"}}"
