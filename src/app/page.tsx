"use client";

import { todo } from "node:test";
import { useState } from "react";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [data, setData] = useState<item[]>([]);

  const [inputData, setInputData] = useState<string>("");

  const handleAdd = () => {
    if (inputData === "") {
      alert("please input some data");
    } else {
      const newTodo: item = {
        id: Date.now(),
        text: inputData,
        completed: false,
      };
      setData([...data, newTodo]);
      setInputData("");
    }
  };

  const handleComplete = (id: number) => {
    setData(
      data.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleRemove = (id: number) => {
    setData((todo) => todo.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
                value={inputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
              />
              <button
                onClick={() => handleAdd()}
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-grey hover:bg-violet-400"
              >
                Add
              </button>
            </div>
          </div>

          {data.map((item) => {
            return (
              <li key={item.id} className="list-none">
                <div className="flex mb-4 items-center">
                  {item.completed ? (
                    <p className="w-full text-red-400 ">{item.text} </p>
                  ) : (
                    <p className="w-full text-grey-darkest ">{item.text}</p>
                  )}

                  <button
                    onClick={() => handleComplete(item.id)}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-grey text-green border-green hover:bg-green-400"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-grey hover:bg-red-400"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}
