export default function EditPostPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  return (
    <>
      <h1 className='text-2xl'>Edit Post</h1>
      <p>Post ID: {postId}</p>
    </>
  );
}
