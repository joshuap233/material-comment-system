import React, {useCallback, useContext} from "react";
import {TextField} from "@material-ui/core";
import {Context} from "./index";


export const Field = React.memo(function Field({name, ...props}) {
  const {setEditorState, editorState: {[name]: value}} = useContext(Context);
  const handleOnChange = useCallback((e) => {
    const {value} = e.target;
    setEditorState(editorState => ({
      ...editorState,
      [name]: value
    }));
  }, [name, setEditorState]);

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleOnChange}
    />
  );
});
