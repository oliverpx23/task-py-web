import "./styles/app.css";
import {Button} from "@nextui-org/react";

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="h-40 w-40 bg-blue-500 text-white font-bold">
        <h1>hello vite</h1>
        <Button color="primary">
          Button
        </Button>
      </div>
    </div>
  );
}

export default App;
