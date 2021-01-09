import io from 'socket.io-client';

export const API_URL = 'http://172.20.10.5:3000';
export const SOCKET = io(API_URL);
