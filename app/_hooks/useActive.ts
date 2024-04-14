import { useState } from 'react';

interface Active {
  likeCounts: number;
  commentCounts: number;
}

export const useActive = ({ likeCounts, commentCounts }: Active) => {
  const [likeCount, setLikeCount] = useState<number>(likeCounts);
  const [commentCount, setCommentCount] = useState<number>(commentCounts);

  return { likeCount, setLikeCount, commentCount, setCommentCount };
};
