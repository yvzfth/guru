import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { createPost } from '@/services/post.service';
import FakeEditor from '@/components/FakeEditor/FakeEditor';
import PostPage from './post/[post]';

const TextEditor = dynamic(() => import('../components/TextEditor'), {
  ssr: false,
});
export default function CreatePostPage() {
  const [content, setContent] = useState<string>('');
  const [editorMode, setEditorMode] = useState<string>('editor');

  const session = useSession();
  function handleContentChange(value: string) {
    setContent(value);
  }

  function handleSubmit(event: any) {
    createPost(
      content,
      '"This is an EXAMPLE of a string with $pecial characters"',
      session.data?.user?.at!,
      1,
      'Bu yazıda NextJS ile nasıl getServerSideProps yazılır onu öğreneceğiz'
    )
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className='mx-auto grid grid-cols-12 '>
      <div className='col-span-6 flex flex-col justify-center items-center'>
        <div className='flex gap-5'>
          <button
            onClick={() => {
              setEditorMode('editor');
            }}
          >
            Editor
          </button>
          <button
            onClick={() => {
              setEditorMode('preview');
            }}
          >
            Preview
          </button>
        </div>

        {editorMode === 'editor' && (
          <>
            {/* <div>
              {typeof document !== 'undefined' &&
              typeof window !== 'undefined' ? (
                <TextEditor value={content} onChange={handleContentChange} />
              ) : null}
            </div> */}

            <FakeEditor
              value={content}
              handleContentChange={handleContentChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>

      {editorMode === 'preview' && (
        <div className=' col-span-12'>
          <h1 className='text-2xl text-blue-500'>Preview</h1>
          <PostPage post={{ at: session.data?.user?.at!, content: content }} />
        </div>
      )}
    </div>
  );
}
