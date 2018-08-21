Front-end to Subsonic written in React Native

Version History
- 0.1.4
  - Library
    - Can play an album
    - Can add album to end of playlist
  - Now Playing
    - Can Play/Pause a song
    - Can move forward & back through a playlist via buttons, no automatic traversal yet
    - Can select specific song in playlist to play
    - Progress bar fills up as song progresses
  - Misc
    - Cleaned up naming convention for reducer and actions
    - Cleaned up which file some of the actions belonged in

- 0.1.3
  - Library: Artist List - Selecting artist fetches album list
  - Library: Album List - Selecting album from list fetches album details
  - Library: Album Details - Shows song info
  - Now Playing: Shows a loaded 'playlist'
  - Now Playing: Shows 'active' song in loaded playlist at top of sidebar w/ mock UI elements
  - Now Playing: Sidebar playlist can be loaded with an album for play (does not traverse playlist yet)
  - Media Player: Created a wrapper over the 'Sound' class using howler for web
  - Media Player (Web): Can stream a song & pause

- 0.1.1
  - Misc: Stylesheets
  - Main Menu: Simple scaffolding
  - Main Menu: Only 'Library' works leads to the Artist list  
  - Artist List: Fetching data from server & displaying

- 0.1.0
  - Login Screen: Basic elements for Server Url, Username, and Password (plain text)
  - Login Screen: Storing of values in React Native's AsyncStorage for retrieval on startup
  - Misc: API Hooks