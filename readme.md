# Spotify Profile

A web application to visualize personalized Spotify data.

## Features

- View your top artists and tracks
- Explore your recently played tracks
- Analyze your playlists and saved songs
- See detailed audio features of tracks
- Discover recommended songs based on your taste

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Spotify Premium account
- Registered Spotify app with client credentials

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/spotify-profile.git
   cd spotify-profile
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Spotify credentials:

   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   REDIRECT_URI=http://localhost:3000/callback
   ```

4. Start the development server
   ```bash
   npm start
   ```

## Tech Stack

- React.js
- Node.js/Express
- Spotify Web API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- Inspired by [Spotify-Profile](https://spotify-profile.herokuapp.com/)
