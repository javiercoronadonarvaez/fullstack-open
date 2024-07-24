```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User inputs text and clicks save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: POST related code pushes body composed of content and date to exampleapp/notes
    activate server
    server-->>browser: URL Redirect
    deactivate server

    Note right of browser: The server responds with Redirect URL Status Code 302. It triggers another GET Request to exampleapp/notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
