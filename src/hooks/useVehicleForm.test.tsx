import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useVehicleForm } from './useVehicleForm';
import { VEHICLE_DATA } from '../constants/vehicleData';

// Test component to use the hook
const TestComponent: React.FC = () => {
  const {
    make,
    model,
    badge,
    file,
    makeOptions,
    modelOptions,
    badgeOptions,
    updateMake,
    updateModel,
    updateBadge,
    updateFile,
    validateForm,
    setPreset,
  } = useVehicleForm();

  return (
    <div>
      <div data-testid="make">{make}</div>
      <div data-testid="model">{model}</div>
      <div data-testid="badge">{badge}</div>
      <div data-testid="file">{file ? 'file' : 'no file'}</div>
      <div data-testid="makeOptions">{JSON.stringify(makeOptions)}</div>
      <div data-testid="modelOptions">{JSON.stringify(modelOptions)}</div>
      <div data-testid="badgeOptions">{JSON.stringify(badgeOptions)}</div>
      <button onClick={() => updateMake('ford')}>Update Make</button>
      <button onClick={() => updateModel('Ranger')}>Update Model</button>
      <button onClick={() => updateBadge('Raptor')}>Update Badge</button>
      <button onClick={() => updateFile(new File([''], 'test.txt'))}>Update File</button>
      <button onClick={() => setPreset('tesla', 'Model 3', 'Performance')}>Set Preset</button>
      <div data-testid="validate">{validateForm()}</div>
    </div>
  );
};

describe('useVehicleForm', () => {
  it('initializes with empty values', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('make')).toHaveTextContent('');
    expect(screen.getByTestId('model')).toHaveTextContent('');
    expect(screen.getByTestId('badge')).toHaveTextContent('');
    expect(screen.getByTestId('file')).toHaveTextContent('no file');
  });

  it('provides correct make options', () => {
    render(<TestComponent />);

    const expectedOptions = Object.keys(VEHICLE_DATA);
    expect(screen.getByTestId('makeOptions')).toHaveTextContent(JSON.stringify(expectedOptions));
  });

  it('updates make and resets dependent fields', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Update Make'));

    expect(screen.getByTestId('make')).toHaveTextContent('ford');
    expect(screen.getByTestId('model')).toHaveTextContent('');
    expect(screen.getByTestId('badge')).toHaveTextContent('');
    expect(screen.getByTestId('file')).toHaveTextContent('no file');
  });

  it('provides model options when make is set', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Update Make'));

    const expectedModels = Object.keys(VEHICLE_DATA.ford);
    expect(screen.getByTestId('modelOptions')).toHaveTextContent(JSON.stringify(expectedModels));
  });

  it('updates model and resets dependent fields', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Update Make'));
    fireEvent.click(screen.getByText('Update Model'));

    expect(screen.getByTestId('model')).toHaveTextContent('Ranger');
    expect(screen.getByTestId('badge')).toHaveTextContent('');
    expect(screen.getByTestId('file')).toHaveTextContent('no file');
  });

  it('provides badge options when model is set', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Update Make'));
    fireEvent.click(screen.getByText('Update Model'));

    const expectedBadges = VEHICLE_DATA.ford.Ranger;
    expect(screen.getByTestId('badgeOptions')).toHaveTextContent(JSON.stringify(expectedBadges));
  });

  it('updates badge', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Update Make'));
    fireEvent.click(screen.getByText('Update Model'));
    fireEvent.click(screen.getByText('Update Badge'));

    expect(screen.getByTestId('badge')).toHaveTextContent('Raptor');
  });

  it('updates file', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Update File'));

    expect(screen.getByTestId('file')).toHaveTextContent('file');
  });

  it('sets preset correctly', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Set Preset'));

    expect(screen.getByTestId('make')).toHaveTextContent('tesla');
    expect(screen.getByTestId('model')).toHaveTextContent('Model 3');
    expect(screen.getByTestId('badge')).toHaveTextContent('Performance');
    expect(screen.getByTestId('file')).toHaveTextContent('no file');
  });

  it('validates form correctly', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('validate')).toHaveTextContent('Make, Model, Badge, and Logbook file');

    fireEvent.click(screen.getByText('Update Make'));
    expect(screen.getByTestId('validate')).toHaveTextContent('Model, Badge, and Logbook file');

    fireEvent.click(screen.getByText('Update Model'));
    expect(screen.getByTestId('validate')).toHaveTextContent('Badge and Logbook file');

    fireEvent.click(screen.getByText('Update Badge'));
    expect(screen.getByTestId('validate')).toHaveTextContent('Logbook file');

    fireEvent.click(screen.getByText('Update File'));
    expect(screen.getByTestId('validate')).toHaveTextContent('');
  });

  it('formats missing fields correctly', () => {
    render(<TestComponent />);

    // All missing
    expect(screen.getByTestId('validate')).toHaveTextContent('Make, Model, Badge, and Logbook file');

    // Two missing
    fireEvent.click(screen.getByText('Update Make'));
    fireEvent.click(screen.getByText('Update Model'));
    expect(screen.getByTestId('validate')).toHaveTextContent('Badge and Logbook file');

    // One missing
    fireEvent.click(screen.getByText('Update Badge'));
    expect(screen.getByTestId('validate')).toHaveTextContent('Logbook file');
  });
});