# Traffic Light Simulation
a simple traffic light UI built by react

## Requirement:
-> NodeJs >= 18

## How to Run:
-> npm i
-> npm start

## 📸 Screenshot
![Traffic Light UI](./docs/Screenshot%20(2730).png)

## Requirements
1. The light cycles in this order:
   * **Red → Green → Yellow → Red** (loop)
2. Time durations:
   * Red: 5 seconds
   * Green: 4 seconds
   * Yellow: 2 seconds
3. If the user **pauses**, the state freezes (including timer countdown).
4. On **reset**, return to Red and stop
5. Bonus: Use a **pure FSM model** (not just `setTimeout` chaining).
6. Optional: Include a way to test edge cases like rapid pause/start or skipping frames (e.g. use `requestAnimationFrame` or simulate lag).


