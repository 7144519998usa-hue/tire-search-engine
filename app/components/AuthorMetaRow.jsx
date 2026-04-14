export default function AuthorMetaRow({ author, reviewer, updatedAt = "Updated this month" }) {
  return (
    <div className="author-meta-row">
      <span>By {author.name}</span>
      <span>{author.role}</span>
      {reviewer ? <span>Reviewed by {reviewer.name}</span> : null}
      <span>{updatedAt}</span>
    </div>
  );
}
