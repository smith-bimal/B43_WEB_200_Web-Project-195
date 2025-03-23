import React, { useState, useEffect, useMemo } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TripPDF } from './TripPDF';

function DownloadPDFButton({ activities, packingItems, tripName, destination, dates, budget }) {
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Memoize the document to prevent unnecessary re-renders
  const document = useMemo(() => (
    <TripPDF 
      activities={activities || []} 
      packingItems={packingItems || []}
      tripName={tripName || ''}
      destination={destination || ''}
      dates={dates || {}}
      budget={budget || []}
    />
  ), [activities, packingItems, tripName, destination, dates, budget]);

  // Only mount the component on client-side
  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false);
  }, []);

  if (!isClient || (!activities?.length && !packingItems?.length)) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isClient && (
        <div
          className={`flex justify-center items-center gap-2 w-14 h-14 
            ${isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#f5f5f5] hover:bg-[#d3d3d3] cursor-pointer'
            } text-gray-800 text-xl rounded-full transition-colors shadow-lg`}
        >
          <PDFDownloadLink
            document={document}
            fileName={`${tripName || 'trip'}-details.pdf`}
            className="w-full h-full flex items-center justify-center"
            onClick={() => setIsGenerating(true)}
          >
            {({ loading, error, blob }) => {
              if (blob) {
                setIsGenerating(false);
              }
              return (
                <i className={`fa-solid ${
                  error ? 'fa-exclamation-circle' :
                  loading || isGenerating ? 'fa-spinner fa-spin' :
                  'fa-file-pdf'
                }`}></i>
              );
            }}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default React.memo(DownloadPDFButton);
