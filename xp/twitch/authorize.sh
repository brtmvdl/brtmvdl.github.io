

client_id=""

redirect_uri="http://localhost:8080/xp/twitch/"

echo "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=chat%3Aread+chat%3Aedit"
