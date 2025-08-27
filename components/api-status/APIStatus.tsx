'use client';

import { useAPIHealth } from '@/hooks/useAPI';
import { AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';

export default function APIStatus() {
  const { data: isHealthy, isLoading, error } = useAPIHealth();

  // Don't show anything if loading on first check
  if (isLoading && isHealthy === undefined) return null;

  // Show connection status
  const isConnected = isHealthy === true;
  const hasError = error || isHealthy === false;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg transition-all duration-300 ${
          isConnected
            ? 'bg-green-600 text-white'
            : hasError
            ? 'bg-red-600 text-white'
            : 'bg-yellow-600 text-white'
        }`}
      >
        {isConnected ? (
          <CheckCircle className="w-4 h-4" />
        ) : hasError ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Wifi className="w-4 h-4" />
        )}
        
        <span className="text-sm font-medium">
          {isConnected
            ? 'Backend ulanган'
            : hasError
            ? 'Backend ulanmagan'
            : 'Tekshirilmoqda...'}
        </span>
        
        {hasError && (
          <WifiOff className="w-4 h-4" />
        )}
      </div>

      {hasError && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg">
          <p className="text-sm text-red-800 mb-2">
            <strong>Backend server bilan bog'lanish yo'q</strong>
          </p>
          <p className="text-xs text-red-600">
            • Backend serverni ishga tushiring: <code>npm start</code><br />
            • API manzilini tekshiring: <code>http://localhost:3000</code><br />
            • Kategoriyalarni yarating: <code>POST /categories/initialize-mattress</code>
          </p>
        </div>
      )}
    </div>
  );
}
