import {schema} from 'normalizr';

/*
    Use schema to normalize all responses => using 'result' and 'entities'
    {
      result: "123",
      entities: {
        "articles": {
          "123": {
            id: "123",
            author: "1",
            title: "My awesome blog post",
            comments: [ "324" ]
          }
        },
        "users": {
          "1": { "id": "1", "name": "Paul" },
          "2": { "id": "2", "name": "Nicole" }
        },
        "comments": {
          "324": { id: "324", "commenter": "2" }
        }
      }
    }
 */


export const track = new schema.Entity('tracks');
export const arrayOfTracks = new schema.Array(track);
