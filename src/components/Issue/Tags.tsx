export const IssueTags = (props): JSX.Element => {
  if (!props) return <></>;
  return (
    <div className="space-x-2 space-y-2">
      {props.tags.map((tag, i) => (
        <span
          className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full"
          key={i}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default IssueTags;
