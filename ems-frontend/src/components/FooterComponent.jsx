import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <p className="mb-0">&copy; {new Date().getFullYear()} hussein Melhem. All Rights Reserved.</p>
    </footer>
  );
};

export default FooterComponent;
