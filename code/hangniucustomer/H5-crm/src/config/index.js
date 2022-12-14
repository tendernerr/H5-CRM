// 引用axios
import axios from "axios";
// 引用 stroe
import store from "@/store";
import qs from 'qs';


// 初始化
const instance = axios.create({
	// baseURL: 'http://192.168.10.13:8080/', // 公共的url   
	baseURL: 'https://www.hangyedaniu.com/', // 线上的url 
	timeout: 30000,
	headeheaders: {
		'Content-Type': 'application/json'
	},
	header: {}
});
// 请求拦截器
instance.interceptors.request.use(function (config) {
	// 请求头名字暂时不知道是什么参数 
	if (localStorage.getItem("token")) {
		config.header['token'] = localStorage.getItem("token");
		config.headers['token'] = localStorage.getItem("token");
	}
	// 在发送请求之前做些什么 
	return config
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
	if (response.data.code == '502') {
		alert('token失效！');
		localStorage.removeItem('userInfo');
		localStorage.removeItem('token');
		location.href = '/authLogin';
	}
	if (response.data.code == '503') {
		alert('token失效！');
		localStorage.removeItem('userInfo');
		localStorage.removeItem('token');
		location.href = '/authLogin';
	}
	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default instance;

// post 请求 
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		instance.post(url, data).then(response => {
			resolve(response)
		}, err => {
			reject(err)
		})
	})
}

// get 请求
export function get(url, data = {}) {
	return new Promise((resolve, reject) => {
		instance.get(url, { params: data }).then(response => {
			resolve(response)
		}, err => {
			reject(err)
		})
	})
}

/**
 * 封装所有请求
 * @param methed
 * @param url
 * @param data
 * @param headers
 * @returns {Promise}
 */
export function request(methed, url, data, headers) {
	return new Promise((resolve, reject) => {
		instance({
			method: methed || 'post',
			url: url,
			params: methed === 'get' ? data : '',
			data: methed !== 'get' ? data : '',
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(res => {
				resolve(res.data);
				// 对接口错误码做处理
			})
			.catch(err => {
				reject(err)
			})
	})
}