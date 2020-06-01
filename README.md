Front-end to Subsonic written in React Native

![User Interface Light](https://user-images.githubusercontent.com/1766848/74463166-6a452f00-4e5f-11ea-9d1a-a7f98711ad52.png)

Version History
- 0.2.1
  - UI - Finish porting over Now Playing screen to use hooks and themes
  - Misc - Code Tidying Up
  - Misc - Updated node packages
- 0.2.0
  - UI - Overhauled Library desktop components to support 'themes' based on the Rainglow project
  - UI - Began swapping out material icons for FontAwesome free iconography
  - Misc - Swapped out API back-end with subsonicjs package
  - Misc - Began migrating views / components to React Hooks
  - Misc - Updated node packages to latest versions
- 0.1.11
  - Library: Main Screen - Update for mobile web view
  - Library: Artist info - Update for mobile web view
  - Now Playing: Sidebar - moved to bottom of screen for mobile web view
  - Now Playing: Fullscreen - Update for mobile web view
  - Menu: Update for mobile web views
  - Misc: modified flow of elements to better support mobile web

- 0.1.10
  - Search: Fix issues with empty results
  - Albums: Add Pinning ability (via heart icon)
  - All Screens: Overhaul menu
  - All Screens: Hide "Now Playing" sidebar when play queue is empty
  - Misc: Converted most components to pure React components

- 0.1.9
  - Search: Navigation to artist pages
  - Search: Navigation to album pages
  - Search: Adding and playing songs
  - Library: Adding main screen to get Random, Recently Added, Most Played and Recently Played

- 0.1.8
  - Library: Artist Info page
  - Now Playing: Fullscreen smoke & lavalamp  visualisations colored from album art
  - Bugfix: issues with multiples of the same song
  - UI Tweak: Change order of elements for the media controls

- 0.1.7
  - Now Playing: Sidebar can drag and drop menu items to change playlist order w/ a long hold
  - Now Playing: Fullscreen initialization w/ open gl background for visualizations

- 0.1.6
  - Media Player: Auto Progression through playlists
  - Library: Shuffle play for albums
  - Library: Artist List - A-Z quick access
  - Playlists: Shuffle play for playlists
  - Misc: Fix spacing in A-Z quick access area
  - Misc: Fix performance in large lists (Artist, Song, Playlist, etc)

- 0.1.5
  - Menu: Can toggle between main menu, library, and playlists
  - Playlists: Playlist List - Loads a list from the server on component load
  - Playlists: Playlist List - Selecting playlist fetches playlist details
  - Playlists: Playlist Details - Shows song info
  - Playlists: Can play a playlist
  - Playlists: Can ad a song to end of playlist

- 0.1.4
  - Library: Can play an album
  - Library: Can add album to end of playlist
  - Now Playing: Can Play/Pause a song
  - Now Playing: Can move forward & back through a playlist via buttons, no automatic traversal yet
  - Now Playing: Can select specific song in playlist to play
  - Now Playing: Progress bar fills up as song progresses
  - Misc: Cleaned up naming convention for reducer and actions
  - Misc: Cleaned up which file some of the actions belonged in

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
