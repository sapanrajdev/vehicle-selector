import React from "react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

const menuProps = {
  slotProps: {
    paper: {
      className: "vehicle-menu-paper",
    },
  },
};

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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileChange(file);
    }
  };

  return (
    <form className="vehicle-form" onSubmit={onSubmit}>
      <Typography variant="h5" className="vehicle-title">
        Vehicle Selection
      </Typography>

      {/* Make */}
      <FormControl fullWidth className="vehicle-form-control">
        <InputLabel id="make-label">Make</InputLabel>

        <Select
          labelId="make-label"
          value={make}
          label="Make"
          onChange={(e: SelectChangeEvent) => onMakeChange(e.target.value)}
          className="vehicle-select"
          MenuProps={menuProps}
        >
          <MenuItem value="">
            <em>Choose make</em>
          </MenuItem>

          {makeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Model */}
      <FormControl fullWidth disabled={!make} className="vehicle-form-control">
        <InputLabel id="model-label">Model</InputLabel>

        <Select
          labelId="model-label"
          value={model}
          label="Model"
          onChange={(e: SelectChangeEvent) => onModelChange(e.target.value)}
          className="vehicle-select"
          MenuProps={menuProps}
        >
          <MenuItem value="">
            <em>Choose model</em>
          </MenuItem>

          {modelOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Badge */}
      <FormControl fullWidth disabled={!model} className="vehicle-form-control">
        <InputLabel id="badge-label">Badge</InputLabel>

        <Select
          labelId="badge-label"
          value={badge}
          label="Badge"
          onChange={(e: SelectChangeEvent) => onBadgeChange(e.target.value)}
          className="vehicle-select"
          MenuProps={menuProps}
        >
          <MenuItem value="">
            <em>Choose badge</em>
          </MenuItem>

          {badgeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Upload */}
      <div className="vehicle-upload-wrapper">
        <Typography variant="subtitle2" className="vehicle-upload-label">
          Logbook File
        </Typography>

        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          disabled={!badge}
          fullWidth
          className="vehicle-upload-button"
        >
          {fileInputRef.current?.files?.[0]?.name || "Upload TXT File"}

          <input
            hidden
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileChange}
          />
        </Button>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        fullWidth
        className="vehicle-submit-button"
      >
        {loading ? (
          <>
            <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
            Submitting...
          </>
        ) : (
          "Submit Vehicle Selection"
        )}
      </Button>
    </form>
  );
};
