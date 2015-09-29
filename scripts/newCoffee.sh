url="localhost:8080/coffee-tracker/rest/coffee"

curl -i -X PUT $url --data-binary "@newCoffee.json" -H "Content-Type: application/json; Data-type: json"

