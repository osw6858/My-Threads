'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './style/quillStyle.css';
import DOMPurify from 'dompurify';

export const AddPostForm = () => {
  const [values, setValues] = useState<string | Node>('');
  const safeHTML = DOMPurify.sanitize(values);

  return (
    <form className="">
      <ReactQuill
        className="text-black dark:text-white placeholder:text-white"
        theme="bubble"
        onChange={setValues}
        placeholder="스레드를 시작하세요..."
      />
    </form>
  );
};

export default AddPostForm;
