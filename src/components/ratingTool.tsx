import React, { useState, useEffect } from "react";
import { Slider, Button } from "@material-tailwind/react";
import { IoAddCircleOutline } from "react-icons/io5";

export default function RatingSlider({
  onSubmit,
  successScore,
  initialScore,
}: {
  onSubmit: (score: number) => void;
  successScore: boolean;
  initialScore: number | null;
}) {
  const [sliderValue, setSliderValue] = useState(50);
  const [scored, setScored] = useState(false);

  const score = parseFloat(((sliderValue / 100) * 10).toFixed(1));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  const handleScore = () => {
    setScored(true);
    onSubmit(score);
  };

  useEffect(() => {
    if (initialScore === null || initialScore === undefined) {
      setScored(false);
      setSliderValue(50);
    }
  }, [initialScore]);

  return (
    <div className="flex flex-col gap-4 mt-5 w-full max-w-sm text-white">
      {!scored && (
        <>
          <span className="font-medium text-xs text-gray-300">
            Rating: {score} ⭐
          </span>

          <div className="flex items-center justify-center flex-wrap gap-3">
            <Slider
              color="yellow"
              value={sliderValue}
              onChange={handleChange}
              step={1}
              className="flex-1"
            />
            <Button
              size="sm"
              className="text-[.6rem] flex items-center gap-1"
              color="yellow"
              onClick={handleScore}
            >
              <IoAddCircleOutline className="w-4 h-4" />
              <span>Score</span>
            </Button>
          </div>
        </>
      )}

      {successScore && (
        <div className="text-lg font-semibold text-amber-400">
          ✅ Your score: {score} ⭐
        </div>
      )}
    </div>
  );
}
