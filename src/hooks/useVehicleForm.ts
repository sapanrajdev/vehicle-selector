import React from "react";
import { useRef, useState } from "react";
import { VEHICLE_DATA } from "../constants/vehicleData";

interface UseVehicleFormReturn {
  make: string;
  model: string;
  badge: string;
  file: File | null;
  makeOptions: string[];
  modelOptions: string[];
  badgeOptions: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  updateMake: (newMake: string) => void;
  updateModel: (newModel: string) => void;
  updateBadge: (newBadge: string) => void;
  updateFile: (newFile: File | undefined) => void;
  validateForm: () => string | null;
  resetForm: () => void;
  setPreset: (
    presetMake: string,
    presetModel: string,
    presetBadge: string,
  ) => void;
}

export const useVehicleForm = (): UseVehicleFormReturn => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const makeOptions: string[] = Object.keys(VEHICLE_DATA);
  const modelOptions: string[] = make ? Object.keys(VEHICLE_DATA[make]) : [];
  const badgeOptions: string[] = make && model ? VEHICLE_DATA[make][model] : [];

  const formatMissingFields = (items: string[]): string => {
    if (items.length === 1) return items[0];
    if (items.length === 2) return items.join(" and ");
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
  };

  const validateForm = (): string | null => {
    if (!make || !model || !badge || !file) {
      const missing: string[] = [];
      if (!make) missing.push("Make");
      if (!model) missing.push("Model");
      if (!badge) missing.push("Badge");
      if (!file) missing.push("Logbook file");
      return formatMissingFields(missing);
    }
    return null;
  };

  const resetForm = (): void => {
    setMake("");
    setModel("");
    setBadge("");
    setFile(null);
    clearFileInput();
  };

  const updateMake = (newMake: string): void => {
    setMake(newMake);
    setModel("");
    setBadge("");
    setFile(null);
    clearFileInput();
  };

  const updateModel = (newModel: string): void => {
    setModel(newModel);
    setBadge("");
    setFile(null);
    clearFileInput();
  };

  const updateBadge = (newBadge: string): void => {
    setBadge(newBadge);
  };

  const updateFile = (newFile: File | undefined): void => {
    setFile(newFile || null);
  };

  const setPreset = (
    presetMake: string,
    presetModel: string,
    presetBadge: string,
  ): void => {
    setMake(presetMake);
    setModel(presetModel);
    setBadge(presetBadge);
    setFile(null);
    clearFileInput();
  };

  return {
    make,
    model,
    badge,
    file,
    makeOptions,
    modelOptions,
    badgeOptions,
    fileInputRef,
    updateMake,
    updateModel,
    updateBadge,
    updateFile,
    validateForm,
    resetForm,
    setPreset,
  };
};
