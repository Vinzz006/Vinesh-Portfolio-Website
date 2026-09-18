import { useEffect, useState } from 'react';
import { fetchGitHubRepos, fetchGitHubUser, GitHubRepo, GitHubUser } from '../lib/github';

interface UseGitHubReturn {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

const fallbackUser: GitHubUser = {
  login: 'Vinzz006',
  name: 'Vinesh Shanmugam',
  bio: 'ECE Student | AI/ML | Embedded Systems | TinyML Developer',
  public_repos: 12,
  followers: 18,
  following: 24,
  avatar_url: 'https://github.com/Vinzz006.png',
  html_url: 'https://github.com/Vinzz006',
};

const fallbackRepos: GitHubRepo[] = [
  {
    id: 101,
    name: 'TinyML-Motion-Fall-Detection',
    description: 'ESP32-based motion monitoring & fall detection with lightweight TinyML inference and real-time Firebase sync.',
    html_url: 'https://github.com/Vinzz006',
    language: 'C++',
    stargazers_count: 5,
    forks_count: 2,
    updated_at: new Date().toISOString(),
    topics: ['esp32', 'tinyml', 'embedded-ai', 'freertos', 'sensor-fusion'],
    fork: false,
  },
  {
    id: 102,
    name: 'PancreaSense-AI-Health-Platform',
    description: 'AI-assisted health telemetry screening system integrating ESP32 sensor feeds, FastAPI, and SHAP explainability.',
    html_url: 'https://github.com/Vinzz006',
    language: 'Python',
    stargazers_count: 8,
    forks_count: 3,
    updated_at: new Date().toISOString(),
    topics: ['fastapi', 'machine-learning', 'shap', 'healthcare-iot', 'react'],
    fork: false,
  },
  {
    id: 103,
    name: 'EEG-NeuroFeedback-BCI',
    description: 'EEG signal acquisition and real-time DSP artifact removal pipeline for neural state classification.',
    html_url: 'https://github.com/Vinzz006',
    language: 'Python',
    stargazers_count: 6,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    topics: ['eeg', 'bci', 'signal-processing', 'dsp', 'pytorch'],
    fork: false,
  },
  {
    id: 104,
    name: 'EV-Battery-BMS-Predictor',
    description: 'Lithium-ion state of charge (SoC) estimation and thermal runaway early warning with CAN Bus telemetry.',
    html_url: 'https://github.com/Vinzz006',
    language: 'C++',
    stargazers_count: 4,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    topics: ['bms', 'can-bus', 'embedded', 'battery-management'],
    fork: false,
  },
  {
    id: 105,
    name: 'Smart-Grid-Fault-Detection',
    description: 'Edge IoT electrical waveform analysis and automated fault localization via MQTT and WebSocket telemetry.',
    html_url: 'https://github.com/Vinzz006',
    language: 'TypeScript',
    stargazers_count: 3,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    topics: ['smart-grid', 'iot', 'mqtt', 'websockets', 'dashboard'],
    fork: false,
  },
  {
    id: 106,
    name: 'Autonomous-Rover-Vision-Nav',
    description: 'Stereo vision obstacle avoidance and path planning using OpenCV, ROS2, and embedded microcontrollers.',
    html_url: 'https://github.com/Vinzz006',
    language: 'Python',
    stargazers_count: 7,
    forks_count: 2,
    updated_at: new Date().toISOString(),
    topics: ['robotics', 'computer-vision', 'ros2', 'opencv'],
    fork: false,
  },
];

export function useGitHub(): UseGitHubReturn {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [userData, reposData] = await Promise.all([
          fetchGitHubUser(),
          fetchGitHubRepos(),
        ]);
        if (!cancelled) {
          setUser(userData);
          setRepos(reposData.length > 0 ? reposData : fallbackRepos);
        }
      } catch (err) {
        if (!cancelled) {
          // Gracefully fallback to curated projects rather than leaving section broken
          setUser(fallbackUser);
          setRepos(fallbackRepos);
          setError(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { user, repos, loading, error };
}

