// Polyfill dla react-router w środowisku jsdom.
// Matchery jest-dom importują testy indywidualnie ('@testing-library/jest-dom').
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
