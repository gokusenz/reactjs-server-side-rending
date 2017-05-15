import React from 'react';

import '../../../assets/styles/CommentList.scss';

const CommentList = (props) => {
  const { list } = props;
  return (
    <div className="comment-list col-xs-10 col-xs-offset-1">
      <div className="grey">
        <h1>Comment List</h1>
      </div>
      {
        list.map(item => (
          <div className="media grey">
            <div className="media-body">
              <h4 className="media-heading">{`${item.id}. `} {item.title}</h4>
              <p>{item.body}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default CommentList;
