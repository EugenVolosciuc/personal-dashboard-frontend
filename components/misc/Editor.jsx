import React, { useState, useEffect } from 'react'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'

let DraftEditor

const Editor = ({ wrapperClassName = '', handleChange, defaultContent, placeholder = '' }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(defaultContent))))
  const [editorIsInFocus, setEditorIsInFocus] = useState(false)

  const handleEditorStateChange = async newEditorState => {
    setEditorState(newEditorState)

    await handleChange(JSON.stringify(convertToRaw(newEditorState.getCurrentContent())))
  }

  useEffect(() => {
    setIsMounted(true)

    DraftEditor = require('react-draft-wysiwyg').Editor
  }, [])

  useEffect(() => {
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(defaultContent))))
  }, [defaultContent])

  return (
    <>
      {isMounted && DraftEditor &&
        <DraftEditor
          wrapperClassName={wrapperClassName}
          placeholder={placeholder}
          toolbarHidden={!editorIsInFocus}
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
          onFocus={() => !editorIsInFocus && setEditorIsInFocus(true)}
          onBlur={() => editorIsInFocus && setEditorIsInFocus(false)}
        />
      }
    </>
  )
}

export default Editor
