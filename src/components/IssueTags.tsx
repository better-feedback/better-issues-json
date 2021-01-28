export const IssueTags = (props): JSX.Element => {
  if (!props) return <></>;
  return (
    <>
      {props.tags.map((tag, i) => (
        <span
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full"
          key={i}
        >
          {tag.name}
        </span>
      ))}
    </>
  );
};

export default IssueTags;
