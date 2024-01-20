const CommentCreate = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = 'This comment is pending moderation';
    } else if (comment.status === 'rejected') {
      content = 'This comment has been rejected';
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentCreate;
