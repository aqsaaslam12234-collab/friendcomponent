import { useState } from "react";

const Friends_Component = () => {
  const [name, setName] = useState<string[]>(["No Friends, I am so lonely"]);
  const [inputValue, setInputValue] = useState<string>("");
  const [removeValue, setRemoveValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const addNameAtStart = () => {
    if (inputValue.trim() === "") return;
    setName((prev) => {
      const newList = prev[0] === "No Friends, I am so lonely" ? [] : prev;
      return [inputValue, ...newList];
    });
    setInputValue("");
  };

  const addNameInMiddle = () => {
    if (inputValue.trim() === "") return;
    setName((prev) => {
      const newList = prev[0] === "No Friends, I am so lonely" ? [] : [...prev];
      const middleIndex = Math.floor(newList.length / 2);
      newList.splice(middleIndex, 0, inputValue);
      return newList;
    });
    setInputValue("");
  };

  const addNameAtEnd = () => {
    if (inputValue.trim() === "") return;
    setName((prev) => {
      const newList = prev[0] === "No Friends, I am so lonely" ? [] : prev;
      return [...newList, inputValue];
    });
    setInputValue("");
  };

  const removeFromBeginning = () => {
    setName((prev) => {
      if (prev.length <= 1) {
        return ["No Friends, I am so lonely"];
      }
      const newList = [...prev];
      newList.shift();
      return newList;
    });
  };

  const removeFromEnd = () => {
    setName((prev) => {
      if (prev.length <= 1) return ["No Friends, I am so lonely"];
      const newList = [...prev];
      newList.pop();
      return newList.length === 0 ? ["No Friends, I am so lonely"] : newList;
    });
  };

  const removeSpecificFriend = () => {
    if (removeValue.trim() === "") return;
    setName((prev) => {
      const newList = prev.filter(
        (friend) => friend.toLowerCase() !== removeValue.toLowerCase()
      );

      if (newList.length === prev.length) {
        alert(`"${removeValue}" not found in list.`);
        return prev;
      }

      return newList.length === 0 ? ["No Friends, I am so lonely"] : newList;
    });
    setRemoveValue("");
  };

  const searchFriend = () => {
    if (searchValue.trim() === "") {
      setSearchResult("Please enter a name to search.");
      return;
    }

    if (name.includes("No Friends, I am so lonely")) {
      setSearchResult(" No friends to search.");
      return;
    }

    const found = name.some(
      (friend) => friend.toLowerCase() === searchValue.toLowerCase()
    );
    setSearchResult(
      found
        ? `${searchValue} is in your friends list.`
        : `${searchValue} not found.`
    );
  };

  const toggleSort = () => {
    setName((prev) => {
      if (prev[0] === "No Friends, I am so lonely") return prev;
      const sortedList = [...prev].sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      return isSorted ? sortedList.reverse() : sortedList;
    });
    setIsSorted(!isSorted);
  };

  return (
    <div>
      <div className="bg-gray-200 shadow-lg h-150 w-3/7 flex flex-col items-center mx-auto">
        <h1 className="text-center font-bold mt-5 text-xl">Friends</h1>

        <p className="mt-3 text-center font-medium">{name.join(", ")}</p>

        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-6 mb-3 w-100 border py-1"
          type="text"
          placeholder="Enter Name "
        />

        <div>
          <button
            onClick={addNameAtStart}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mb-1 mr-3"
          >
            Add at Begining
          </button>

          <button
            onClick={addNameInMiddle}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mb-1 mr-3"
          >
            Add in Middle
          </button>

          <button
            onClick={addNameAtEnd}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mb-1 mr-3"
          >
            Add at End
          </button>

          <button
            onClick={removeFromBeginning}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mb-1 mr-3"
          >
            Remove from Begining
          </button>

          <button
            onClick={removeFromEnd}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mb-1 mr-3"
          >
            Remove From End
          </button>
        </div>

        <input
          value={removeValue}
          onChange={(e) => setRemoveValue(e.target.value)}
          className="mt-6 w-100 border py-1"
          type="text"
          placeholder="Find to Remove "
        />
        <button
          onClick={removeSpecificFriend}
          className="w-100 bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Remove Friend
        </button>

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mt-6 w-100 border py-1"
          type="text"
          placeholder="Search Friend "
        />
        <button
          onClick={searchFriend}
          className="w-100 bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Search
        </button>

        {searchResult && (
          <p className="mt-3 text-center font-medium text-gray-800">
            {searchResult}
          </p>
        )}

        <button
          onClick={toggleSort}
          className="w-50 bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Sort / Reverse Sort
        </button>
      </div>
    </div>
  );
};

export default Friends_Component;
