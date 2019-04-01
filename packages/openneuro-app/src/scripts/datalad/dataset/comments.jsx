import React from 'react'
import Comment from './comment.jsx'
import CommentEditor from '../comments/comment-editor.jsx'
import LoggedIn from '../../authentication/logged-in.jsx'
import LoggedOut from '../../authentication/logged-out.jsx'

const CommentTree = ({ datasetId, uploader, comments }) => (
  <>
    {comments.map(comment => {
      const nextLevel = comment.hasOwnProperty('replies') ? comment.replies : []
      return (
        <Comment
          key={comment.id}
          datasetId={datasetId}
          uploader={uploader}
          data={comment}>
          {nextLevel.length ? (
            <CommentTree
              datasetId={datasetId}
              uploader={uploader}
              comments={nextLevel}
            />
          ) : null}
        </Comment>
      )
    })}
  </>
)

const Comments = ({ datasetId, uploader, comments }) => {
  return (
    <div className="col-xs-12 dataset-inner">
      <hr />
      <div className="dataset-comments">
        <h2>Comments</h2>
        <LoggedIn>
          <CommentEditor datasetId={datasetId} />
        </LoggedIn>
        <LoggedOut>
          <div>Please sign in to contribute to the discussion.</div>
        </LoggedOut>
        <CommentTree
          datasetId={datasetId}
          uploader={uploader}
          comments={comments}
        />
      </div>
    </div>
  )
}

export default Comments
