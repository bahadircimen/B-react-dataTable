const axios = require('axios');

export default {
    async getData({page}){
        return await axios.get(`https://picsum.photos/v2/list?page=${page-1}&limit=12`);
    },
    async getOtherData({page,pageSize}){
        let _start = (page-1)*pageSize,
            _limit = pageSize*1;
        return await axios.get(`http://jsonplaceholder.typicode.com/posts?_start=${_start}&_limit=${_limit}`);
    }
}