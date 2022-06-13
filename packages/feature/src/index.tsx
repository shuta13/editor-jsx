/* @jsx h */
import { h } from "react-editor-jsx";

const EditorJSX = ({ children }: { children?: any }) => <div>{children}</div>;

const SomePlugin = () => {
  const handleClick = () => {
    console.log("clicked");
  };
  return <button onClick={handleClick} />;
};

const CustomPlugin = () => {
  return (
    <EditorJSX>
      <SomePlugin />
    </EditorJSX>
  );
};

<CustomPlugin />;
// render(<CustomPlugin />, new EditorJS());

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
