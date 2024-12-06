import React from 'react';
import './ContenderList.css'; 
import { Definitions } from '../../Types/Types';

interface ContenderListProps {
  segments: Definitions[];
}

const ContenderList: React.FC<ContenderListProps> = ({ segments }) => {
  return (
    <div className="segment-list">
      <ul>
        {segments.map((segment, index) => (
          <li
            key={index}
            style={{ backgroundColor: segment.color }}
          >
            {segment.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContenderList;