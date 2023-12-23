import React from 'react';
import style from './style';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

const paginate=()=>{
    const classes = style();

    return(<>
        <Pagination className={{ul:classes.ul}}
        count={5}
        page={1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page = ${1}`}/>
        )}/>
    </>)
}

export default paginate;