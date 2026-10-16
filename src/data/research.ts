export interface ResearchTopic {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export const researchTopics: ResearchTopic[] = [
  {
    id: 'tinyml',
    title: 'TinyML & Edge AI',
    description: 'Deploying machine learning models on resource-constrained microcontrollers and edge devices.',
    tags: ['Quantization', 'Pruning', 'On-device inference', 'ONNX'],
    icon: 'cpu',
  },
  {
    id: 'intelligent-iot',
    title: 'Intelligent IoT',
    description: 'Building IoT systems that go beyond data collection — making embedded devices contextually aware.',
    tags: ['MQTT', 'ESP32', 'Firebase', 'Edge Compute'],
    icon: 'radio',
  },
  {
    id: 'healthcare-ai',
    title: 'Healthcare AI',
    description: 'Applying machine learning to healthcare data for AI-assisted risk screening and analysis — research prototypes, not medical devices.',
    tags: ['SHAP', 'Explainability', 'Risk Screening', 'NLP'],
    icon: 'activity',
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Image segmentation, classification, and object detection for medical imaging and real-world sensing.',
    tags: ['OpenCV', 'CNNs', 'U-Net', 'Object Detection'],
    icon: 'eye',
  },
  {
    id: 'embedded-intelligence',
    title: 'Embedded Intelligence',
    description: 'Fusing signal processing and machine learning at the hardware level for context-aware embedded systems.',
    tags: ['Signal Processing', 'Feature Extraction', 'Classification', 'Anomaly Detection'],
    icon: 'zap',
  },
  {
    id: 'smart-energy',
    title: 'Smart Energy Systems',
    description: 'Intelligent energy monitoring and anomaly detection for sustainable, data-driven energy management.',
    tags: ['Anomaly Detection', 'Time-Series', 'IoT', 'Firebase'],
    icon: 'trending-up',
  },
];
