import React from "react";
import { SubmissionResponse } from "../../types";
import "./SubmissionResult.css";

interface SubmissionResultProps {
  responseData: SubmissionResponse | null;
}

export const SubmissionResult: React.FC<SubmissionResultProps> = ({
  responseData,
}) => {
  if (!responseData) return null;

  return (
    <section className="response-block">
      <h2>Submission result</h2>
      <div className="result-field">
        <strong>Make:</strong> {responseData.vehicle.make}
      </div>
      <div className="result-field">
        <strong>Model:</strong> {responseData.vehicle.model}
      </div>
      <div className="result-field">
        <strong>Badge:</strong> {responseData.vehicle.badge}
      </div>
      <div className="logbook-preview">
        <strong>Logbook contents:</strong>
        <pre>{responseData.logbook}</pre>
      </div>
    </section>
  );
};
