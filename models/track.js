const SC    = require('./soundcloud');
const async = require('async');
/*
    CRUD design (create, read, update, delete)
 */
 /*
    Track Schema
    {id
     comment
     detail
     }
  */

class track{
    static insertTrack(db, track, cb){
        const {id} = track;
        /**********************************************************************/
        //TODO -> Let's implement queries here
        /**********************************************************************/
        const query_select = `SELECT id FROM fav_track WHERE id = $1::int`;
        const query_insert = `INSERT INTO fav_track (id) VALUES ($1::int)`;
        db.task(t => {
            return t.oneOrNone(query_select, [id])
                .then(doesExist => {
                    if (!doesExist){
                        return t.none(query_insert, [id]);
                    }
                });
        })
        .then(() => {
            cb(null, {data: track});
        })
        .catch(error => {
            console.error(error);
            cb(error);
        });

    }
    //filter -> rating(number)
    static getTracks(db, filter, cb){
        /**********************************************************************/
        //TODO -> Let's implement queries here
        /**********************************************************************/
        let query;
        switch(filter){
            case 'commented':
                query = `SELECT * FROM fav_track WHERE comment IS NOT NULL AND comment != ''`;
                break;
            case 'nocomment':
                query = `SELECT * FROM fav_track WHERE comment IS NULL OR comment = ''`;
                break;
            default:
                query = `SELECT * from fav_track`;
                break;
        }
        db.any(query, [filter])
            .then(tracks => {
                //Retrive track detail using soundcloud API
                async.forEach(tracks, (track, callback) => {
                    SC.getTrackById(track.id, (_err, _res) => {
                        //Ignore error
                        track.detail = _res ? _res.data : null;
                        callback(null);
                    });
                }, (err) => {
                    cb(null, {data: tracks});
                });
            })
            .catch(error => {
                console.error(error);
                cb(error);
            });
    }
    static updateTrack(db, track, cb){
        const query = `UPDATE fav_track SET comment = $1::text WHERE id = $2::int`;
        db.none(query, [track.comment, track.id])
            .then(() => {
                cb(null, {data: track});
            })
            .catch(error => {
                console.error(error);
                cb(error);
            });
    }
    static removeTrack(db, track, cb){
        /**********************************************************************/
        //TODO -> Let's implement queries here
        /**********************************************************************/
        const query = ``;
        db.none(query, [track.id])
            .then(() => {
                cb(null, {data: track});
            })
            .catch(error => {
                console.error(error);
                cb(error);
            });
    }
}
module.exports = track;
