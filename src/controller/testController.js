export const getTest = (req, res) => {
  return res.send(req.body.params);
};

export const postTest = (req, res) => {
  const boardNo = req.body.boardNo;
  const nickname = req.body.nickname;
  const comment = req.body.comment;
  const commentDate = req.body.commentDate;

  console.log(boardNo, nickname, comment, commentDate);
  res.send("Good work");
};
