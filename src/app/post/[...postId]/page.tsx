export default function PostDetail({ params }: { params: { postId: string } }) {
  console.log(params);
  return <div>Post Detail {params.postId}</div>;
}
