import React from 'react';
import { useProgress } from '@react-three/drei';
import { Html } from '@react-three/drei';
import './LoadingScreen.css';

function LoadingScreen() {
    const {progress} = useProgress()
    return (
        <Html fullscreen>
            <div className="loading-screen">
                <h1>7Clickers Showroom 3D</h1>
                <div class="progress-bar-container">
                    <label for="progress-bar">Loading...</label>
                    <progress id="progress-bar" value={progress} max="100"></progress>
                </div>
            </div>
        </Html>
    );
}

export default LoadingScreen;