export const formatDate = (dateString, showTime = false) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(showTime && { hour: "2-digit", minute: "2-digit" }),
  });
};

/*  {formatDate(post.createdAt)}  // time NOT shown
   {formatDate(someDate, true)}  // time shown

*/
