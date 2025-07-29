
import React, { useState } from "react";
import { Slider, Button } from "@material-tailwind/react";

export default function RatingSlider({ onSubmit }: { onSubmit: (score: number) => void }) {
  const [score, setScore] = useState(5.0);
  const [scored, setScored] = useState(false);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(event.target.value, 10); // 0–100
  const decimal = parseFloat(((value / 100) * 10).toFixed(1)); // map to 0–10
  setScore(decimal);
};

  const handleScore = () => {
    setScored(true);
    onSubmit(score);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm text-white">
      {!scored ? (
        <>
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm text-gray-300">Rating: {score} ⭐</span>
            <Button size="sm" color="yellow" onClick={handleScore}>
              Score
            </Button>
          </div>
          <Slider
            color="amber"
            defaultValue={50}
            onChange={handleChange}
            step={1} // slider is 0-100, mapped to 0-10
          />
        </>
      ) : (
        <div className="text-lg font-semibold text-amber-400">
          ✅ Your score: {score} ⭐
        </div>
      )}
    </div>
  );
}
