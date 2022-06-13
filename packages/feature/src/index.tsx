/* @jsx h */
import { h, createTool } from "react-editor-jsx";
import type { EditorJSX } from "react-editor-jsx";
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
      _pasteConfig={undefined}
      _sanitize={undefined}
      _shortcut={undefined}
      _conversionConfig={undefined}
      _enableLineBreaks={undefined}
      _isReadOnlySupported={undefined}
      _toolbox={{ title: "CustomTool", icon: <span>🔮</span> }}
    >
      <button onClick={handleClick} /> {/* inserted block */}
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
      _isInline={true}
      _shortcut={undefined}
      _sanitize={undefined}
      _title={undefined}
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
      _isTune={true}
      _prepare={undefined}
      _reset={undefined}
    >
      <div>
        <span>BlockTune</span>
      </div>
    </blockTune>
  );
};

const customTool = createTool(<CustomTool />, null);
const customInlineTool = createTool(<CustomInlineTool />, null);
const customBlockTune = createTool(<CustomBlockTune />, null);

// new EditorJS({
//   tools: {
//     customTool,
//     CustomInlineTool: { class: customInlineTool },
//     CustomBlockTune: { class: customBlockTune },
//   },
// });

// ```
// new Editor({
// tools: [
//  CustomPlugin
// ]
//     })
//
// class CustomPlugin {
//   static get toolbar() {}
//   // ↑props
//   // ↓宣言的
//   suround() {}
//   render() {
//
//   }
// }
// ```
