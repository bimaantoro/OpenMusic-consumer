const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name
          FROM playlists
          WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Playlist not found');
    }

    return result.rows[0];
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
                FROM playlist_songs
                LEFT JOIN songs ON songs.id = playlist_songs.song_id
                WHERE playlist_songs.playlist_id = $1
                GROUP BY playlist_songs.song_id, songs.id`,
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }
}

module.exports = PlaylistsService;
