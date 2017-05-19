const SC = require('node-soundcloud');
const SC_CLIENT_ID = '1c3aeb3f91390630d351f3c708148086';

SC.init({
    id : SC_CLIENT_ID
});
SC.searchTracks = (trackName, cb) => {
    SC.get('/tracks', {q: trackName}, (err, result) => {
        if (err){
            console.error(err);
            return cb(err);
        }
        cb(null, {data: result});
    });
};
SC.getTrackById = (trackId, cb) =>{
    SC.get(`/tracks/${trackId}`, (err, result) => {
        if (err){
            console.error(err);
            return cb(err);
        }
        cb(null, {data: result});
    });
};
module.exports = SC;
