const { Pool } = require('pg');

class NotesService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylist({playlistId}) {
        const query = {
            text: `SELECT id, name FROM playlist WHERE id = $1`,
            values: [playlistId],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }

    async getSongPlaylist({playlistId}) {
        const query = {
            text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
            JOIN songs ON songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        }

        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = NotesService;