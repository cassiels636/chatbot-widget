# Chatbot Widget

A widget for talking to a chatbot (Chit Chatter). This includes a button that opens a chat box for interacting with a "bot". Currently the "bot" is limited to respond with 1 of 3 hard-coded responses.


## How to Use

See the READMEs in the corresponding chatbot-widget-frontend and chatbot-widget-backend folders for details on how to run this app.

Frontend docs: [chatbot-widget-frontend/README.md](./chatbot-widget-frontend/README.md)

Backend docs: [chatbot-widget-backend/README.md](./chatbot-widget-backend/README.md)


## Demo
Below is a recording of a short walkthrough/interaction with the chatbot
[Demo recording](./chatbot-demo.mov)


## Design Details

### Authentication
Login credentials are hardcoded into the frontend and the login API is called on page load in order to get a JWT access token. The bearer token is then set on all preceding API calls.

## Chatbot Chat
As mentioned, the chatbot responds to sent messages with 1 of 3 hard-coded responses. After a message is sent and saved in the DB, the chatbot response is generated and the UI refetches the set of messages to show in the chat.