import { QuickSelectButtons } from "../../components/QuickSelectButtons/QuickSelectButtons";
import { StatusMessage } from "../../components/StatusMessage/StatusMessage";
import { SubmissionResult } from "../../components/SubmissionResult/SubmissionResult";
import { useVehicleForm } from "../../hooks/useVehicleForm";
import { QUICK_PRESETS } from "../../constants/vehicleData";
import {
  StatusMessage as StatusMessageType,
  SubmissionResponse,
  QuickPreset,
} from "../../types";
import { useState, useRef, useEffect } from "react";
import { submitVehicleForm } from "../../services/apiService";
import { VehicleForm } from "../../components/VehicleForm/VehicleForm";
import "./VehicleSelectionForm.css";

const VehicleSelectionForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusMessageType | null>(null);
  const [responseData, setResponseData] = useState<SubmissionResponse | null>(
    null,
  );
  const responseRef = useRef<HTMLDivElement | null>(null);
  const vehicleForm = useVehicleForm();

  useEffect(() => {
    if (responseData && responseRef.current) {
      responseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [responseData]);

  const handleMakeChange = (newMake: string): void => {
    vehicleForm.updateMake(newMake);
    setStatus(null);
    setResponseData(null);
  };

  const handleModelChange = (newModel: string): void => {
    vehicleForm.updateModel(newModel);
    setStatus(null);
    setResponseData(null);
  };

  const handleBadgeChange = (newBadge: string): void => {
    vehicleForm.updateBadge(newBadge);
    setStatus(null);
    setResponseData(null);
  };

  const handleFileChange = (file: File): void => {
    vehicleForm.updateFile(file);
    setStatus(null);
    setResponseData(null);
  };

  const handlePresetSelect = (preset: QuickPreset): void => {
    vehicleForm.setPreset(preset.make, preset.model, preset.badge);
    setStatus(null);
    setResponseData(null);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setStatus(null);
    setResponseData(null);
    setLoading(true);
    const error = vehicleForm.validateForm();
    if (error) {
      setStatus({ type: "error", message: `Please select ${error}.` });
      setLoading(false);
      return;
    }

    try {
      const result = await submitVehicleForm(
        vehicleForm.make,
        vehicleForm.model,
        vehicleForm.badge,
        vehicleForm.file!,
      );
      setResponseData(result.data);
      setStatus({
        type: result.success ? "success" : "error",
        message: result.message || "Vehicle submitted successfully!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          (error as Error).message ||
          "Unable to submit form. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="form-card">
      <h1>Vehicle Selection Form</h1>

      <QuickSelectButtons
        presets={QUICK_PRESETS}
        onPresetSelect={handlePresetSelect}
      />

      <VehicleForm
        loading={loading}
        make={vehicleForm.make}
        model={vehicleForm.model}
        badge={vehicleForm.badge}
        makeOptions={vehicleForm.makeOptions}
        modelOptions={vehicleForm.modelOptions}
        badgeOptions={vehicleForm.badgeOptions}
        fileInputRef={vehicleForm.fileInputRef}
        onMakeChange={handleMakeChange}
        onModelChange={handleModelChange}
        onBadgeChange={handleBadgeChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />

      <StatusMessage status={status} />

      <div ref={responseRef}>
        <SubmissionResult responseData={responseData} />
      </div>
    </main>
  );
};
export default VehicleSelectionForm;
