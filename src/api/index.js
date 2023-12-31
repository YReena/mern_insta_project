import axios from 'axios';
import {FETCH_ALL, UPDATE, CREATE, DELETE, LIKE} from '../contants/actionTypes';

// const url = "http://localhost:9000";
const  API = axios.create({baseURL:"http://localhost:9000"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})


 export const fetchPosts = (page)=> API.get(`/posts?page=${1}`);
 export const fetchPost = (id) => API.get(`/posts/${id}`);

 export const createPost = (newPost)=> API.post('/posts',newPost);

 export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`,updatePost);

 export const deletePost = (id) => API.delete(`/posts/${id}`);

 export const likePost = (id)=>API.patch(`/posts/${id}/likePost`);
 
 export const signIn = (formData)=> API.post('/user/signin', formData);
 export const signUp = (formData)=> API.post('/user/signup', formData);

 export const fetchPostsBySearch = (searchQuery)=>API.post(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`, searchQuery);

