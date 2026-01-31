import React, { useEffect, useState } from 'react';

const UpdateNotification: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onUpdateAvailable(() => {
        setUpdateAvailable(true);
      });

      window.electronAPI.onUpdateDownloaded(() => {
        setUpdateDownloaded(true);
      });
    }
  }, []);

  const handleRestart = () => {
    window.electronAPI.restartApp();
  };

  const closeNotification = () => {
    setUpdateAvailable(false);
    setUpdateDownloaded(false);
  };

  if (!updateAvailable && !updateDownloaded) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col gap-2 max-w-sm animate-fade-in-up">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">
          {updateDownloaded ? 'Actualización lista' : 'Actualización disponible'}
        </h3>
        <button 
          onClick={closeNotification}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <p className="text-sm text-gray-600">
        {updateDownloaded 
          ? 'La nueva versión se ha descargado. Reinicia para aplicar los cambios.' 
          : 'Una nueva versión se está descargando en segundo plano.'}
      </p>

      {updateDownloaded && (
        <button
          onClick={handleRestart}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Reiniciar e instalar
        </button>
      )}
    </div>
  );
};

export default UpdateNotification;
