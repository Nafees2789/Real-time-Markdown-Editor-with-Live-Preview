import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Preview = ({ markdown, previewRef, onScroll }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const { data } = await axios.post('http://localhost:5000/convert', {
          markdown,
        });
        setHtml(data.html);
      } catch (error) {
        console.error('Conversion error:', error);
      }
    };
    convertMarkdown();
  }, [markdown]);

  return (
    <div className="preview" ref={previewRef} onScroll={onScroll}>
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            return !inline ? (
              <SyntaxHighlighter
                style={materialLight}
                language="javascript"
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default Preview;
