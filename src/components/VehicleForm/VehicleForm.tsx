import React from "react";
import "./VehicleForm.css";

interface VehicleFormProps {
  loading: boolean;
  make: string;
  model: string;
  badge: string;
  makeOptions: string[];
  modelOptions: string[];
  badgeOptions: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onBadgeChange: (value: string) => void;
  onFileChange: (file: File) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  loading,
  make,
  model,
  badge,
  makeOptions,
  modelOptions,
  badgeOptions,
  fileInputRef,
  onMakeChange,
  onModelChange,
  onBadgeChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="vehicle-form">
      <label>
        Make
        <select value={make} onChange={(e) => onMakeChange(e.target.value)}>
          <option value="">Choose make</option>
          {makeOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label>
        Model
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={!make}
        >
          <option value="">Choose model</option>
          {modelOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Badge
        <select
          value={badge}
          onChange={(e) => onBadgeChange(e.target.value)}
          disabled={!model}
        >
          <option value="">Choose badge</option>
          {badgeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Logbook file
        <input
          disabled={!badge}
          title={!badge ? "Please select a badge first" : undefined}
          ref={fileInputRef}
          type="file"
          accept=".txt,text/plain"
          onChange={(e) => onFileChange(e.target.files![0])}
        />
      </label>

      <button disabled={loading} type="submit" className="submit-button">
        {loading ? (
          <>
            <span className="button-loader" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Submit vehicle selection"
        )}
      </button>
    </form>
  );
};
