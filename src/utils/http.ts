import 'whatwg-fetch';
import config from '../constants/esy';

export interface Options {
    headers?: object;
    method?: string;
    body?: any;
}

const MIME_TYPE = {
    JSON: 'application/json'
};

const DEFAULT_OPTIONS = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    redirect: 'follow'
};

function _genFetchOptions(url, options) {
    const opt = Object.assign({}, DEFAULT_OPTIONS, options);
    opt.mode = "cors";
    return opt;
}

function _fetch(url, options: Options = {}) {
    const opt = _genFetchOptions(url, options);
    return fetch(url, opt)
        .then( response => {
            const json = response.json();
            if (response.ok) {
                return json;
            } else {
                return json.then(err => { throw { error :err }; });
            }
        })
        .then( res => {
            if (res.code !== 200) {
                throw { error: res }
            }
            return res;
        })
}

export const HTTP = {

    get: (url, query?, options: Options = {}) => {
        options.method = 'GET';
        options.headers = {
            'Accept': MIME_TYPE.JSON,
        };
        return _fetch(HTTP.genQueryUrl(url, query), options);
    },

    post: (url, data, options: Options = {}) => {
        options.method = 'POST';
        options.headers = {
            'Accept': MIME_TYPE.JSON,
            'Content-Type': MIME_TYPE.JSON,
        };
        options.body = JSON.stringify(data);

        return _fetch(url, options);
    },

    genQueryUrl(url, data) {
        if (!data) {
            return config.prefix + url;
        }
        const index = url.indexOf('?');
        return config.prefix + url + (index !== -1 ? '&' : '?') + _serialize(data)
    }
};

export function _serialize(obj, prefix?) {
    const arr = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            const newKey = prefix ? prefix + '[' + key + ']' : key;

            if (isArray(val) || isObject(val)) {
                arr.push(_serialize(val, newKey));
            } else {
                arr.push(`${encodeURIComponent(newKey)}=${encodeURIComponent(val)}`);
            }
        }
    }

    return arr.join('&');
}

export function isArray(obj) {
    return Array.isArray(obj);
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}