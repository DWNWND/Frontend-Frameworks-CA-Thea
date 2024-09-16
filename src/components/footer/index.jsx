import { useState, useEffect } from "react";

export default function Footer( ) {
  const checkIfMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 768;
  };

  const isMobile = checkIfMobileScreen();

  function DesktopFooter() {
    return (
      <footer>
        <div>
          <h2>Footer</h2>
          <p>Some DESKTOP footer content</p>
        </div>
      </footer>
    );
  }
  function MobileFooter() {
    return (
      <footer>
        <div>
          <h2>Footer</h2>
          <p>Some MOBILE footer content</p>
        </div>
      </footer>
    );
  }
  if (isMobile) {
    return <MobileFooter />;
  } else if (!isMobile) {
    return <DesktopFooter />;
  }
}
