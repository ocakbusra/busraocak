import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

function App() {
  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center bg-black text-white p-4">
      <AppleHelloEnglishEffect speed={1.1} className="w-full max-w-3xl" />
    </div>
  );
}

export default App;
