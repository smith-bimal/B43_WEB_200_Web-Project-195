import React from 'react';

class PDFErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('PDF Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full text-red-500">
            <i className="fa-solid fa-exclamation-circle"></i>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PDFErrorBoundary;
