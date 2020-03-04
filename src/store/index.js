const axios = require('axios');

export default {
    async getData(){
        return await axios.get('http://jsonplaceholder.typicode.com/posts?_start=10&_limit=10');
    },
    async getOtherData({page,pageSize}){
        return await axios.get(`http://jsonplaceholder.typicode.com/posts?_start=${(page-1)*pageSize}&_limit=${pageSize}`);
    }
}