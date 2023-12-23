import {FETCH_ALL, UPDATE, CREATE, DELETE} from '../contants/actionTypes';

export default (posts=[], action)=>{
    switch(action.type){
        case DELETE:
            return posts.filter((post)=>post._id !== action.payload);

        case UPDATE:
            return posts.map((post)=>posts._id === action.payload._id ? action.payload:post);

        case FETCH_ALL:
            console.log(action.payload);
            return action.payload;

         case CREATE:
         return [...posts, action.payload];

         default :
         return posts;   
    }
}