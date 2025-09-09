import PostCard from "./PostCard";

function PostsList({ posts }) {
  return <>{posts && posts.map((post) => <PostCard key={post.id} post={post} />)}</>;
}

export default PostsList;
