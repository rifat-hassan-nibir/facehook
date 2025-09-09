import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions postId={post?.id} commentCount={post?.comments?.length} />
      <PostComments comments={post?.comments} />
    </article>
  );
}

export default PostCard;
