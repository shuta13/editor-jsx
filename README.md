# editor-jsx

## [INFO] Currently in early development

## About editor-jsx

### motivation

## Getting started

TODO:

## Usage

```tsx
/* @jsx h */
import { h, createTool } from "editor-jsx";
import type { EditorJSX } from "editor-jsx";
import EditorJS from "@editorjs/editorjs";

const CustomTool: EditorJSX.Tool = () => {
  const handleClick = () => {
    console.log("clicked");
  };
  const handleSave: EditorJSX.ToolAttributes<{ value: string }>["save"] = (
    blockContent
  ) => console.log(blockContent.value);
  return (
    <tool
      save={handleSave}
      validate={undefined}
      renderSettings={undefined}
      destory={undefined}
      onPaste={undefined}
      merge={undefined}
      static_get_pasteConfig={undefined}
      static_get_sanitize={undefined}
      static_get_shortcut={undefined}
      static_get_conversionConfig={undefined}
      static_get_enableLineBreaks={undefined}
      static_get_isReadOnlySupported={undefined}
      static_get_toolbox={{ title: "CustomTool", icon: <span>🔮</span> }}
    >
      <div>
        <button onClick={handleClick}>button</button> {/* inserted block */}
        <button onClick={handleClick}>button</button> {/* inserted block */}
        <button onClick={handleClick}>button</button> {/* inserted block */}
        <button onClick={handleClick}>button</button> {/* inserted block */}
        <button onClick={handleClick}>button</button> {/* inserted block */}
      </div>
    </tool>
  );
};

const CustomInlineTool: EditorJSX.InlineTool = () => {
  return (
    <inlineTool
      surround={() => {}}
      checkState={() => {}}
      renderActions={undefined}
      clear={undefined}
      static_get_isInline={true}
      get_shortcut={undefined}
      static_get_sanitize={undefined}
      static_get_title={undefined}
    >
      <div>
        <span>InlineTool</span>
      </div>
    </inlineTool>
  );
};

const CustomBlockTune: EditorJSX.BlockTune = () => {
  return (
    <blockTune
      save={undefined}
      wrap={undefined}
      static_get_isTune={true}
      static_prepare={undefined}
      static_reset={undefined}
    >
      <div>
        <span>BlockTune</span>
        <div>
          <span>nested</span>
        </div>
        <span />
        <div>
          <button>button</button> {/* inserted block */}
          <button>button</button> {/* inserted block */}
          <button>button</button> {/* inserted block */}
          <button>button</button> {/* inserted block */}
          <button>button</button> {/* inserted block */}
        </div>
      </div>
    </blockTune>
  );
};

const customTool = createTool(<CustomTool />, null);
const customInlineTool = createTool(<CustomInlineTool />, null);
const customBlockTune = createTool(<CustomBlockTune />, null);

const e = document.createElement("div");
e.id = "editorjs";
document.body.appendChild(e);

new EditorJS({
  holderId: "editorjs",
  tools: {
    customTool,
    CustomInlineTool: { class: customInlineTool },
    CustomBlockTune: { class: customBlockTune },
  },
});
```

## Roadmap

- [x] Add skelton
- [x] Add types for custom JSX elements
- [ ] Add a parser for JSX and syntax of Editor.js tools
  - [x] Prototyping(Add a parser)
  - [ ] Refactoring
- [ ] Add implements of diff or reconcile
- [x] Add functions for transforming JSX nodes to plugin class syntax

## Contributing

## License

MIT License

## Contact

`shuta13 - hollystarsun@gmail.com`

## Inspired

- https://github.com/preactjs/preact
<!-- ref. https://github.com/othneildrew/Best-README-Template/blob/master/README.md -->
