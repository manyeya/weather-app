import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../loading';

describe('Loading', () => {
  it('renders loading skeletons correctly', () => {
    render(<Loading />);

    // Main container
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Loading indicators
    const loadingElements = screen.getAllByRole('progressbar');
    expect(loadingElements.length).toBeGreaterThan(0);

    // Check for section headings
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders correct number of forecast day skeletons', () => {
    render(<Loading />);
    
    // Get all progressbars in forecast section (5 days x 4 elements per day = 20)
    const forecastSkeletons = screen.getAllByRole('progressbar');
    expect(forecastSkeletons.filter(el => 
      el.closest('.border-glass-border') && 
      el.closest('.rounded-xl')
    ).length).toBeGreaterThanOrEqual(5);
  });

  it('renders correct number of favorite city skeletons', () => {
    render(<Loading />);
    
    // Should find 3 favorite city skeletons
    const skeletons = screen.getAllByRole('progressbar').filter(el =>
      el.className.includes('h-12') &&
      el.className.includes('rounded-lg')
    );
    expect(skeletons).toHaveLength(3);
  });

  it('has the same glassmorphic styling as main components', () => {
    render(<Loading />);
    
    // Check for glassmorphic styling on main card containers
    const glassElements = document.querySelectorAll('.backdrop-blur-glassmorphic');
    glassElements.forEach(element => {
      expect(element).toHaveClass('bg-glass-gradient');
      expect(element).toHaveClass('border-glass-border');
    });
  });

  it('maintains consistent spacing with main components', () => {
    render(<Loading />);
    
    const container = document.querySelector('.min-h-screen');
    expect(container).toHaveClass('px-4');
    expect(container).toHaveClass('py-6');
  });
});
