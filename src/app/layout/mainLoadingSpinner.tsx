import Image from 'next/image';
import './mainLoadingSpinner.css';

export default function MainLoadingSpinner() {
  return (
    <div className="loading-container">
      <div 
        className="text-center"
        style={{ 
          width: '400px',
          height: '300px',
          padding: '48px 64px',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: 'none',
          borderRadius: '0'
        }}
      >
        <div className="loading-content">
          <div className="spinner-wrapper">
            <Image 
              src="/icons/ui/loading.svg" 
              alt="Loading" 
              width={32} 
              height={32} 
              className="rotating-spinner"
            />
          </div>
          <p style={{ 
            color: '#1b1b1b', 
            fontWeight: 600, 
            fontSize: '18px', 
            margin: 0, 
            fontFamily: 'var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
