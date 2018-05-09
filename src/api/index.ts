import { HTTP as http } from '../utils/http';

export default {
    testApi: () => {
        return http.get('/test')
    }
}