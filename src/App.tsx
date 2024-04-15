import "./styles/app.css";

function App() {
  return (
    <div
      className="card p-4 cursor-pointer"
      data-rbd-draggable-context-id="0"
      data-rbd-draggable-id="14"
      role="button"
      aria-describedby="rbd-hidden-text-0-hidden-text-0"
      data-rbd-drag-handle-draggable-id="14"
      data-rbd-drag-handle-context-id="0"
      draggable="false"
    >
      <div className="flex justify-between items-center">
        <h4 className="flex justify-between items-center h-6 px-3 text-xs font-semibold rounded-full text-danger bg-danger/25">
          Design
        </h4>
        <div className="text-xs">15 Jul 2023</div>
      </div>
      <h4 className="mt-3 text-sm">Deploy the Project</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <i className="mgc_chat_3_line text-base"></i>
          <span className="ms-1 leading-none">2</span>
        </div>
        <div className="flex items-center ms-4">
          <i className="mgc_attachment_line rotate-45 text-base"></i>
          <span className="ms-1 leading-none">15</span>
        </div>
      </div>
    </div>
  );
}

export default App;
