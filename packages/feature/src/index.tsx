/* @jsx h */
import "./main.css";
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
      static_get_toolbox={{ title: "CustomTool", icon: "<span>🔮</span>" }}
    >
      <div>
        <button
          style={{ border: "none", cursor: "pointer" }}
          onClick={handleClick}
        >
          button
        </button>
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
      <div className="inline-tool-container">
        <span className="ce-inline-tool">📝</span>
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

const customTool = createTool(<CustomTool />);
const customInlineTool = createTool(<CustomInlineTool />);
const customBlockTune = createTool(<CustomBlockTune />);

const e = document.createElement("div");
e.id = "editorjs";
document.body.appendChild(e);

new EditorJS({
  holder: "editorjs",
  tools: {
    customTool,
    CustomInlineTool: { class: customInlineTool },
    CustomBlockTune: { class: customBlockTune },
  },
});
