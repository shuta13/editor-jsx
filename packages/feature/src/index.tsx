/* @jsx h */
import { h, createTool } from "react-editor-jsx";
import type { EditorJSX } from "react-editor-jsx";
import EditorJS from "@editorjs/editorjs";

const CustomTool: EditorJSX.Tool = () => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <tool>
      <render
        pasteConfig={undefined}
        sanitize={undefined}
        shortcut={undefined}
        conversionConfig={undefined}
        enableLineBreaks={undefined}
        isReadOnlySupported={undefined}
        toolbox={{ title: "CustomTool", icon: <span>🔮</span> }}
        save={(blockContent: any) => console.log(blockContent.value)}
        validate={undefined}
        settings={undefined}
        destory={undefined}
        onPaste={undefined}
        merge={undefined}
      >
        <button onClick={handleClick} />
      </render>
    </tool>
  );
};

const CustomInlineTool: EditorJSX.InlineTool = () => {
  return <inlineTool></inlineTool>;
};

const CustomBlockTune: EditorJSX.BlockTune = () => {
  return <blockTune></blockTune>;
};

const customTool = createTool(<CustomTool />, null);
const customInlineTool = createTool(<CustomInlineTool />, null);
const customBlockTune = createTool(<CustomBlockTune />, null);

new EditorJS({
  tools: {
    customTool,
    CustomInlineTool: { class: customInlineTool },
    CustomBlockTune: { class: customBlockTune },
  },
});

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
