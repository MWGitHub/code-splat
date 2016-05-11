[![Build Status](https://travis-ci.org/MWGitHub/code-splat.svg?branch=master)](https://travis-ci.org/MWGitHub/code-splat)

#Code Splat

Code Splat is a web application for annotating code and text. It was inspired by RapGenius and built using Ruby on Rails and React.js.

Explore and read at [www.code-splat.com](https://www.code-splat.com/)

###Welcome View:

![welcome]

###Code View:

![code]

###Technical Details:
* Code Splat displays code with highlights and correct indentations. It uses the CodeMirror library for the editor. In order to highlight text for annotations, the character index had to be calculated from the line and character due to the differences between the library's format and the way the data is stored on the backend. The calculated index is stored and converted back when the text is rendered in order to highlight spots that are annotated.

```
_positionToIndex(line, ch) {
  let codeMirror = this.refs.codemirror.getCodeMirror();

  // Add selecting text for annotation adding
  let index = 0;
  for (let i = 0; i < line; ++i) {
    let codeLine = codeMirror.getLine(i);
    // Make sure to add the chars for the new line
    index += 1 + codeLine.length;
  }
  index += ch;

  return index;
}

_indexToPosition(index) {
  let codeMirror = this.refs.codemirror.getCodeMirror();

  let countIndex = 0;
  let line = 0;
  let ch = 0;
  // Find start line and ch
  for (let i = 0; i < codeMirror.lineCount(); ++i) {
    let codeLine = codeMirror.getLine(i);
    if (i !== 0) countIndex += 1;
    countIndex += codeLine.length;
    if (countIndex >= index) {
      line = i;
      ch = index - (countIndex - codeLine.length);
      break;
    }
  }
  return {
    line: line,
    ch: ch
  };
}
```

* Annotations were selected by listening to DOM mouseup and mousedown events. Selections can be retrieved by getting the line and character at the start and ends and converting them to and index. Overlaps are checked by seeing if ranges are outside.

```
_isSelectionAnnotated(start, end) {
  let startIndex = this._positionToIndex(start.line, start.ch);
  let endIndex = this._positionToIndex(end.line, end.ch);

  for (let i = 0; i < this.explanations.length; ++i) {
    let explanation = this.explanations[i];
    let isOut = startIndex > explanation.endIndex || endIndex < explanation.startIndex;

    if (!isOut) {
      return true
    }
  }
  return false;
}
```

###Features
* Sign up/in with email, Facebook, GitHub, or Google.
* Explore and read code from others
* Show popular and hot new projects
* Annotations are highlighted for quick and easy viewing
* Clicking on an annotation to read or create them aligns the area next to the focused location, no need to scroll
* Permissions are gained depending on the amount of score a user has
* Edit and delete annotations, projects, files, and more
* Check history in case of vandalism

###To-Do:
* [ ] Index views for the user
* [ ] Notifications
* [x] Error validations
* [ ] Comments on Annotations
* [ ] Search by Language
* [ ] Automated demo mode
* [ ] Align annotations on text update

[Original Design Docs](./docs/README.md)

[welcome]: ./docs/images/welcome.png
[code]: ./docs/images/code.png
