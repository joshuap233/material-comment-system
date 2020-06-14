import React from "react";
import PropTypes from "prop-types";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {coy} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = React.memo(function CodeBlock({value, language = null}) {
  return (
    <SyntaxHighlighter language={language} style={coy}>
      {value}
    </SyntaxHighlighter>
  );
});
CodeBlock.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string
};
export default CodeBlock;
