import React,{useEffect} from 'react';
import style from './style';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Paginate=({page})=>{
    const classes = style();
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector((state)=>state.posts);

    useEffect(()=>{
    if(page){
      dispatch(getPosts(page));
    }

    },[page]);

    return(<>
        <Pagination className={{ul:classes.ul}}
        count={5}
        page={Number(page)|| 1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}/>
    </>)
}

export default Paginate;