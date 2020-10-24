# Youtube song search API

## Use API
#### java-script example
>fetch('http://localhost:[YOUR_PORT]:/[YOUR_PATH]/[QUERY]')<br>
>.then(data => data.json())<br>
>.then(data => console.log(data))
#### output
>{
    "link": "https://www.youtube.com/watch?v=s7wmiS2mSXY",
    "title": "What is an API?"
}

<br><br>
## Host API
### Install dependencies
>$ git clone https://github.com/sjfrhafe/song_search_api.git<br>
>$ cd song_search_api<br>
>$ npm install
### Configure Port and Path
#### package.json
>{<br>
>"homepath": "[YOUR_PATH]", <br>
>"homeport": "[YOUR_PORT]", <br>
>...<br>
>}
### Start server
>$ node server
