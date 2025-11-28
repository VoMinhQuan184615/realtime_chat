import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
        <Input type="text" placeholder="Try typing..." className="mt-4" />
      </div>
    </>
  );
}

export default App;
