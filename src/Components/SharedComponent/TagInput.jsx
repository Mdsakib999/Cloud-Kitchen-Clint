import { useState } from "react";
import { X } from "lucide-react";

export const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === " ") {
      e.preventDefault();
      const newTag = input.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2 mt-6">
      <label className="text-lg font-semibold">Tags</label>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md shadow-sm bg-white">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button type="button" onClick={() => removeTag(index)}>
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] border-none outline-none focus:ring-0"
          placeholder="Type a tag, press comma or space to add"
        />
      </div>
    </div>
  );
};
