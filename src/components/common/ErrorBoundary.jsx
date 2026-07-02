import React from 'react';
import i18n from '../../i18n';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>{i18n.t('errors.title')}</h1>
          <button onClick={() => window.location.reload()}>
            {i18n.t('errors.reload')}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
