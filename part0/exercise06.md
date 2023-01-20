```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: This request includes a payload which is the note text. 
    Note left of server: The server adds the note to the list.
    Note right of browser: The browser redraws the list locally using JavaScript.
    
```