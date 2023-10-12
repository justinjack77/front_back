import axios from 'axios';

const PORT = 8000;
export default axios.create({
    baseURL: `http://localhost:${PORT}`
});