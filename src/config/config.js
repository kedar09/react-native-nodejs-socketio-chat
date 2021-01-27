import io from 'socket.io-client';

export const API_URL = 'http://192.168.1.15:3000';
export const SOCKET = io(API_URL);
