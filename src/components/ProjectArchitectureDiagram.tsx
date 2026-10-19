interface DiagramNode {
  name: string;
  label: string;
  type: 'sensor' | 'mcu' | 'ml' | 'cloud' | 'dashboard';
}

interface ProjectArchitectureDiagramProps {
  nodes: DiagramNode[];
}

export default function ProjectArchitectureDiagram({ nodes }: ProjectArchitectureDiagramProps) {
  // If no nodes, fallback to standard 5-stage default
  const displayNodes = nodes.length >= 3 ? nodes : [
    { name: 'Sensor', label: 'INPUT SENSING', type: 'sensor' as const },
    { name: 'MCU (ESP32)', label: 'DATA ACQUISITION', type: 'mcu' as const },
    { name: 'Edge ML', label: 'INFERENCE', type: 'ml' as const },
    { name: 'Cloud RTDB', label: 'TELEMETRY SYNC', type: 'cloud' as const },
    { name: 'Dashboard', label: 'REALTIME UI', type: 'dashboard' as const },
  ];

  const total = displayNodes.length;
  const svgWidth = 840;
  const svgHeight = 90;
  const nodeWidth = 120;
  const nodeHeight = 52;
  const startX = 20;
  const gap = (svgWidth - startX * 2 - nodeWidth * total) / (total - 1);
  const posY = 19;

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="min-w-[640px]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto block font-mono select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Arrow Marker */}
            <marker
              id="arrow-head"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#39FF88" />
            </marker>
          </defs>

          {/* Bus line connects all nodes */}
          {displayNodes.map((_, i) => {
            if (i === total - 1) return null;
            const x1 = startX + i * (nodeWidth + gap) + nodeWidth;
            const x2 = startX + (i + 1) * (nodeWidth + gap);
            const lineY = posY + nodeHeight / 2;

            return (
              <g key={`bus-${i}`}>
                {/* Connecting Bus Line */}
                <line
                  x1={x1}
                  y1={lineY}
                  x2={x2 - 2}
                  y2={lineY}
                  stroke="#293629"
                  strokeWidth="2"
                />
                <line
                  x1={x1}
                  y1={lineY}
                  x2={x2 - 4}
                  y2={lineY}
                  stroke="#39FF88"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrow-head)"
                />
              </g>
            );
          })}

          {/* Node Boxes */}
          {displayNodes.map((node, i) => {
            const x = startX + i * (nodeWidth + gap);
            const y = posY;

            const isML = node.type === 'ml';
            const isSensor = node.type === 'sensor';
            const strokeColor = isML ? '#FFB000' : isSensor ? '#39FF88' : '#293629';
            const titleColor = isML ? '#FFB000' : isSensor ? '#39FF88' : '#EAF2EA';

            return (
              <g key={`node-${i}`} className="cursor-default">
                {/* Outer Node Box (Strict square corners) */}
                <rect
                  x={x}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill="#0B0E0B"
                  stroke={strokeColor}
                  strokeWidth="1"
                />

                {/* Top Corner Crosshairs */}
                <line x1={x} y1={y - 2} x2={x} y2={y + 4} stroke="#39FF88" strokeWidth="1" />
                <line x1={x - 2} y1={y} x2={x + 4} y2={y} stroke="#39FF88" strokeWidth="1" />
                <line x1={x + nodeWidth} y1={y - 2} x2={x + nodeWidth} y2={y + 4} stroke="#39FF88" strokeWidth="1" />
                <line x1={x + nodeWidth - 4} y1={y} x2={x + nodeWidth + 2} y2={y} stroke="#39FF88" strokeWidth="1" />

                {/* Stage index pill */}
                <text
                  x={x + 8}
                  y={y + 16}
                  fill="#6D7D6D"
                  fontSize="9"
                  letterSpacing="0.05em"
                >
                  {`[0${i + 1}]`}
                </text>

                {/* Primary Node Name */}
                <text
                  x={x + nodeWidth / 2}
                  y={y + 32}
                  fill={titleColor}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {node.name}
                </text>

                {/* Sub-label */}
                <text
                  x={x + nodeWidth / 2}
                  y={y + 44}
                  fill="#6D7D6D"
                  fontSize="8"
                  textAnchor="middle"
                  letterSpacing="0.06em"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
