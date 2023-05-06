'use client';
const App = ({ children }: any) => {
  return (
    <>
      <div className="w-screen h-screen bg-gray-500 flex justify-center items-center">
        <div className="bg-white ring-1 rounded-lg p-6">{children}</div>
      </div>
    </>
  );
};

export default App;
