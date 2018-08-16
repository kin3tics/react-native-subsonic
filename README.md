Front-end to Subsonic written in React Native

Version History
0.1.3
  - Library
      - Artist List
        - Selecting artist fetches album list
      - Album List
        - Selecting album from list fetches album details
      - Album Details
        - Shows song info
  - Now Playing
    - Shows a loaded 'playlist'
    - Shows 'active' song in loaded playlist at top of sidebar w/ mock UI elements
    - Sidebar playlist can be loaded with an album for play (does not traverse playlist yet)
  - Media Player
    - Created a wrapper over the 'Sound' class using howler for web
    - (Web) Can stream a song & pause
0.1.1
  - Stylesheets
  - Main Menu
      - Simple scaffolding
      - Only 'Library' works leads to the Artist list  
  - Artist List
      - Fetching data from server & displaying

0.1.0
  - Login Screen
    - Basic elements for Server Url, Username, and Password (plain text)
    - Storing of values in React Native's AsyncStorage for retrieval on startup
  - API Hookup