import { VehicleData, QuickPreset } from '../types';

export const VEHICLE_DATA: VehicleData = {
  ford: {
    Ranger: ['Raptor', 'Raptor x', 'wildtrak'],
    Falcon: ['XR6', 'XR6 Turbo', 'XR8'],
    'Falcon Ute': ['XR6', 'XR6 Turbo'],
  },
  bmw: {
    '130d': ['xDrive 26d', 'xDrive 30d'],
    '240i': ['xDrive 30d', '50d'],
    '320e': ['xDrive 75d', 'xDrive 80d', 'xDrive 85d'],
  },
  tesla: {
    'Model 3': ['Standard', 'Performance', 'Long Range', 'Dual Motor'],
  },
};

export const QUICK_PRESETS: QuickPreset[] = [
  { label: 'Tesla Model 3 Performance', make: 'tesla', model: 'Model 3', badge: 'Performance' },
  { label: 'Ford Ranger Raptor', make: 'ford', model: 'Ranger', badge: 'Raptor' },
];

