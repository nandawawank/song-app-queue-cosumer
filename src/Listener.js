class Listener {
    constructor(songsService, mailSender) {
        this._songsService = songsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const playlist = await this._songsService.getPlaylist(playlistId);
            const songs = await this._songsService.getSongPlaylist(playlistId);

            const mailContent = {
                playlist: {
                    ...playlist,
                    songs: [...songs]
                }
            }
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(mailContent));
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = Listener;