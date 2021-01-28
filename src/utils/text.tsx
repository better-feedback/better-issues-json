export const truncateText = (content: string, length = 200): string => {
  if (content.length > length) {
    return content.slice(0, length).trimEnd() + "...";
  }
  return content;
};
