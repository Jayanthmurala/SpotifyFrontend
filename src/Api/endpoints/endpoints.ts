import { m } from "framer-motion";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Endpoint {
  method: HttpMethod;
  url: string;
}
const endpoints  = {
    login:{
        method: 'POST',
        url: '/api/v1/user/login',
    },
    register: {
        method: 'POST',
        url: '/api/v1/user/register',
    },
    getUser:{
        method: 'GET',
        url: '/api/v1/user',
    },
    getAllSonges: {
        method: 'GET',
        url: '/api/v1/songs',
    },
    getAllAlbums:{
        method: 'GET',
        url: '/api/v1/albums',
    },
    deleteAlbum: {
        method: 'DELETE',
        url: '/api/v1/album/:id',
    },
    deleteSong: {
        method: 'DELETE',
        url: '/api/v1/song/:id',
    },
    addAlbum: {
        method: 'POST',
        url: '/api/v1/album/new',
    },
    addSong: {
        method: 'POST',
        url: '/api/v1/song/new',
    },
    uploadSongCover: {
        method: 'POST',
        url: '/api/v1/song/cover/:id',
    }
} 
export default endpoints;