import React, { useEffect, useState } from "react";
import time from "../../assets/Hackathon/time.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";

const hours = [...Array(12).keys()].map((n) =>
	(n + 1).toString().padStart(2, "0")
);
const minutes = [...Array(60).keys()].map((n) => n.toString().padStart(2, "0"));
const periods = ["AM", "PM"];

function TimePicker({ setSelectedTime }) {
	const [selectedHour, setSelectedHour] = useState("01");
	const [selectedMinute, setSelectedMinute] = useState("00");
	const [selectedPeriod, setSelectedPeriod] = useState("AM");

	useEffect(() => {
		// Convert selectedHour to 24-hour format
		const hour24 =
			selectedPeriod === "PM" && selectedHour !== "12"
				? (parseInt(selectedHour, 10) + 12).toString().padStart(2, "0")
				: selectedPeriod === "AM" && selectedHour === "12"
				? "00"
				: selectedHour.padStart(2, "0");

		const formattedTime = `${hour24}:${selectedMinute}:00`;
		setSelectedTime(formattedTime);
	}, [selectedHour, selectedMinute, selectedPeriod]);

	return (
		<div className="flex gap-2 w-[360px] h-[65px] border rounded-xl p-2 px-6">
			<img src={time} alt="Time" className="h-4 w-5" />
			<div className="flex flex-col w-full justify-between">
				<span className="text-sm text-[#1C4481]">Time</span>
				<div className="flex justify-between w-full">
					<div className="flex gap-1 items-center">
						<select
							className="bg-transparent border-none outline-none text-[#1C4481] text-sm"
							value={selectedHour}
							onChange={(e) => setSelectedHour(e.target.value)}
						>
							{hours.map((hour) => (
								<option key={hour} value={hour}>
									{hour}
								</option>
							))}
						</select>
						<span>Hr</span>
						<img src={arrowDown} alt="Arrow Down" />
					</div>
					<div className="flex gap-1 items-center">
						<select
							className="bg-transparent border-none outline-none text-[#1C4481] text-sm"
							value={selectedMinute}
							onChange={(e) => setSelectedMinute(e.target.value)}
						>
							{minutes.map((minute) => (
								<option key={minute} value={minute}>
									{minute}
								</option>
							))}
						</select>
						<span>Min</span>
						<img src={arrowDown} alt="Arrow Down" />
					</div>
					<div className="flex gap-1 items-center">
						<select
							className="bg-transparent border-none outline-none text-[#1C4481] text-sm"
							value={selectedPeriod}
							onChange={(e) => setSelectedPeriod(e.target.value)}
						>
							{periods.map((period) => (
								<option key={period} value={period}>
									{period}
								</option>
							))}
						</select>
						<span>{selectedPeriod}</span>
						<img src={arrowDown} alt="Arrow Down" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default TimePicker;
