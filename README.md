# Youtube song search API

## Use API
### Search Song
```
GET http://localhost:[YOUR_PORT]/[YOUR_PATH]/search/[QUERY]
```
```json
{
    "link": "https://www.youtube.com/watch?v=s7wmiS2mSXY",
    "title": "What is an API?"
}
```
### Test Website (if enabled)
```
GET http://localhost:[YOUR_PORT]/[YOUR_PATH]
```
<hr>

## Client code
#### Javascript example
```javascript
fetch('http://localhost:[YOUR_PORT]:/[YOUR_PATH]/[QUERY]')
.then(data => data.json())
.then(data => console.log(data))
```

#### Java example
Use [GSON](https://github.com/google/gson) as JSON parser
```java
private final String ORIGINURL = "http://localhost:[YOUR_PORT]:/[YOUR_PATH]/[QUERY]";
private HttpURLConnection con;

public String search(String query) throws IOException {
        var url = new URL(ORIGINURL + query);
        con = (HttpURLConnection) url.openConnection();

        con.setRequestMethod("GET");

        StringBuilder content;

        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()))) {

            String line;
            content = new StringBuilder();

            while ((line = in.readLine()) != null) {

                content.append(line);
                content.append(System.lineSeparator());
            }
        }

        return content.toString();
}
```

<hr>

## Host API
### 1. Install dependencies
>$ git clone https://github.com/sjfrhafe/song_search_api.git<br>
$ cd song_search_api<br>
$ npm install
### 2. Configure Port, Path and Testingpage
#### ssa.config.json
Create ssa.config.json in homefolder to change default address 'http:localhost:2525/' if necessary and enable a testing website.
```json
{
  "homepath": "[YOUR_PATH]",
  "homeport": "[YOUR_PORT]",
  "testing": "true"
}
```
### 3. Start server
>$ node server
