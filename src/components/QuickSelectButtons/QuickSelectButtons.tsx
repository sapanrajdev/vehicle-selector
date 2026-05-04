import React from 'react';
import { QuickPreset } from '../../types';
import './QuickSelectButtons.css';

interface QuickSelectButtonsProps {
  presets: QuickPreset[];
  onPresetSelect: (preset: QuickPreset) => void;
}

export const QuickSelectButtons: React.FC<QuickSelectButtonsProps> = ({ presets, onPresetSelect }) => {
  return (
    <section className="quick-selects">
      <p>Select a common vehicle quickly:</p>
      <div className="quick-buttons">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onPresetSelect(preset)}
            className="preset-button"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </section>
  );
};
