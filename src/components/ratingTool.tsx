import React, { useState } from "react";
import { Slider, Button } from "@material-tailwind/react";

export default function RatingSlider({ onSubmit }: { onSubmit: (score: number) => void }) {
  const [sliderValue, setSliderValue] = useState(50);
  const [scored, setScored] = useState(false);

  const score = parseFloat(((sliderValue / 100) * 10).toFixed(1)); // 0–10 scale

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  const handleScore = () => {
    setScored(true);
    onSubmit(score);
  };

  return (
    <div className="flex flex-col gap-4 mt-3 w-full max-w-sm text-white">
      {!scored ? (
        <>
          <div className="flex justify-between items-center">
            <span className="font-medium text-xs text-gray-300">Rating: {score} ⭐</span>
            <Button size="sm" color="yellow" onClick={handleScore}>
             Add Score
            </Button>
          </div>
          <Slider
            color="yellow"
            value={sliderValue}
            onChange={handleChange}
            step={1}
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
