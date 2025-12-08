import React, { useState, useEffect, useRef } from 'react';

// FINITE STATE MACHINE
const STATES = {
  red: { duration: 5, next: 'green' },
  green: { duration: 4, next: 'yellow' },
  yellow: { duration: 2, next: 'walk' }, // setelah kuning → pedestrian walk
  walk: { duration: 6, next: 'stop' }, // pejalan kaki jalan
  stop: { duration: 3, next: 'red' }, // pejalan kaki berhenti → kembali ke red
};

export default function TrafficLight() {
  const [state, setState] = useState('red');
  const [secondsLeft, setSecondsLeft] = useState(STATES.red.duration);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  // TIMER SYSTEM
  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          const next = STATES[state].next;
          setState(next);
          return STATES[next].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, state]);

  const toggleRun = () => setIsRunning((prev) => !prev);

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setState('red');
    setSecondsLeft(STATES.red.duration);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      {/* VEHICLE TRAFFIC LIGHT */}
      <h3>Vehicle Light</h3>
      <div style={{ width: 60, margin: '0 auto', marginBottom: 30 }}>
        {['red', 'green', 'yellow'].map((color) => (
          <div
            key={color}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              marginBottom: 10,
              backgroundColor: state === color ? color : '#ddd',
            }}
          />
        ))}
      </div>

      {/* PEDESTRIAN LIGHT */}
      <h3>Pedestrian Light</h3>
      <div style={{ width: 60, margin: '0 auto' }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            marginBottom: 10,
            backgroundColor: state === 'walk' ? 'green' : '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: state === 'walk' ? 'white' : 'black',
            fontWeight: 'bold',
          }}
        >
          WALK
        </div>

        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: state === 'stop' ? 'red' : '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: state === 'stop' ? 'white' : 'black',
            fontWeight: 'bold',
          }}
        >
          STOP
        </div>
      </div>

      <div style={{ fontSize: 24, marginTop: 20 }}>{secondsLeft}s left</div>

      <div style={{ marginTop: 20 }}>
        <button onClick={toggleRun}>{isRunning ? 'Pause' : 'Start'}</button>

        <button onClick={reset} style={{ marginLeft: 10 }}>
          Reset
        </button>
      </div>
    </div>
  );
}
