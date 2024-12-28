import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => (
  <div
    className="p-2 text-center cursor-pointer"
    onClick={() => data.onNodeClick && data.onNodeClick(data.id)}
    style={{ width: "100%", height: "100%" }}
  >
    <Handle type="target" position={Position.Left} id="left" />
    <div>
      <h6 style={{ color: `${data.color}` }}>{data.label}</h6>
      <p>{data.label2}</p>
    </div>
    {data.isCompleted && <div className="text-xs">✓</div>}
    <Handle type="source" position={Position.Right} id="right" />
  </div>
);

export default CustomNode;
