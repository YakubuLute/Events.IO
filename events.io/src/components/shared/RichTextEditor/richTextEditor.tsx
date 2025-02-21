'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactQuill, { Quill } from 'react-quill';

import styles from './richText.module.scss';

import 'react-quill/dist/quill.snow.css';

import HStack from '../stacks/HStack';
import AlignCenter from './icons/alignCenter';
import AlignLeft from './icons/alignLeft';
import AlignRight from './icons/alignRight';
import ListBullet from './icons/listBullet';

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  onBlur: () => void;
  hasToolbar?: boolean;
  classNames?: string;
};

const RichTextEditor = (props: Props) => {
  const icons = Quill.import('ui/icons');
  icons['align'] = null;
  icons['list'] = null;

  const QuillLink = Quill.import('formats/link');
  QuillLink.sanitize = function (url: string) {
    // quill by default creates relative links if scheme is missing.
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  };
  const {
    value,
    setValue,
    placeholder,
    onBlur,
    hasToolbar = true,
    classNames = 'container',
  } = props;

  return (
    <Box position={'relative'}>
      {hasToolbar ? (
        <HStack sx={{ mt: '24px', justifyContent: 'space-between' }}>
          <Typography id={styles.label}>Body</Typography>

          <Box id="toolbar" className={styles.toolbarContainer}>
            <>
              <select
                className="ql-header"
                defaultValue={''}
                onChange={(e) => e.persist()}
              >
                <option value="1" />
                <option value="2" />
                <option selected />
              </select>

              <span className={styles.divider}>
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
              </span>

              <span className={styles.divider}>
                <button className="ql-align" value="">
                  <AlignLeft />
                </button>
                <button className="ql-align" value="center">
                  <AlignCenter />
                </button>
                <button className="ql-align" value="right">
                  <AlignRight />
                </button>
              </span>

              <span className={styles.divider}>
                <button className="ql-list" value="bullet">
                  <ListBullet />
                </button>
                <button className="ql-list" value="ordered" />
                <button className="ql-link" />
              </span>

              <span className={styles.divider}>
                <select className="ql-color" />
                <select className="ql-background" />
              </span>

              <span className={styles.divider}>
                <button className="ql-script" value="sub" />
                <button className="ql-script" value="super" />
                {/* <button className="ql-image" /> */}
              </span>

              <span className={styles.divider}>
                <button className="ql-blockquote" />
                {/* <button className="ql-image" /> */}
              </span>
            </>
          </Box>
        </HStack>
      ) : (
        <Box id="toolbar" component="span" display={'none'} />
      )}

      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        onBlur={onBlur}
        placeholder={placeholder || 'Start writing...'}
        className={styles[classNames]}
        modules={{
          toolbar: {
            container: '#toolbar',
          },
        }}
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'ordered',
          'indent',
          'link',
          'image',
          'color',
          'align',
          'background',
          'script',
          'image',
        ]}
      />
    </Box>
  );
};

export default RichTextEditor;

// import React from 'react';
// import styles from './richText.module.scss';
// import { useCallback, useEffect, useState } from 'react';
// import {
//   EditorChangeHandler,
//   SelectionChangeHandler,
//   TextChangeHandler,
// } from 'quill';
// const Quill = typeof window === 'object' ? require('quill') : () => false;

// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: 'ordered' }, { list: 'bullet' }],
//   ['bold', 'italic', 'underline'],
//   [{ color: [] }, { background: [] }],
//   [{ script: 'sub' }, { script: 'super' }],
//   [{ align: [] }],
//   ['image', 'blockquote', 'code-block'],
//   ['clean'],
// ];

// interface RichTextProps {
//   onChange?: (value: string) => void;
//   value?: string;
// }

// export interface EventEmitter {
//   on(eventName: 'text-change', handler: TextChangeHandler): EventEmitter;
//   on(
//     eventName: 'selection-change',
//     handler: SelectionChangeHandler
//   ): EventEmitter;
//   on(eventName: 'editor-change', handler: EditorChangeHandler): EventEmitter;
//   once(eventName: 'text-change', handler: TextChangeHandler): EventEmitter;
//   once(
//     eventName: 'selection-change',
//     handler: SelectionChangeHandler
//   ): EventEmitter;
//   once(eventName: 'editor-change', handler: EditorChangeHandler): EventEmitter;
//   off(eventName: 'text-change', handler: TextChangeHandler): EventEmitter;
//   off(
//     eventName: 'selection-change',
//     handler: SelectionChangeHandler
//   ): EventEmitter;
//   off(eventName: 'editor-change', handler: EditorChangeHandler): EventEmitter;
// }

// export type Sources = 'api' | 'user' | 'silent';
// interface Quill extends EventEmitter {
//   root: HTMLDivElement;
// }
// const RichTextEditor = (props: RichTextProps) => {
//   const { onChange, value } = props;
//   const [quill, setQuill] = useState<Quill | null>();

//   useEffect(() => {
//     if (quill == null) return;

//     const handler = (delta: unknown, oldDelta: unknown, source: string) => {
//       if (source !== 'user') return;
//       onChange?.(quill.root.innerHTML);
//     };

//     quill.on('text-change', handler);

//     return () => {
//       quill.off('text-change', handler);
//     };
//   }, [quill]);

//   const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
//     if (wrapper == null) return;

//     wrapper.innerHTML = '';
//     const editor = document?.createElement('div');
//     wrapper.append(editor);

//     const q = new Quill(editor, {
//       theme: 'snow',
//       modules: { toolbar: TOOLBAR_OPTIONS },
//       placeholder: 'Start writing...',
//     });
//     setQuill(q);
//   }, []);

//   useEffect(() => {
//     if (quill == null) return;
//     if (value !== quill.root.innerHTML) {
//       quill.root.innerHTML = value || '';
//     }
//   }, [quill, value]);

//   return (
//     <div className={styles.editorMainContainer}>
//       <div className={styles.editorContainer} ref={wrapperRef}></div>
//     </div>
//   );
// };

// export default RichTextEditor;
