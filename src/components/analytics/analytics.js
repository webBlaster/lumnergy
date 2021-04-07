import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const Analytics = (props) => {
  let location = useLocation();
  useEffect(() => {
    ReactGA.initialize("UA-180671541-1", { testMode: true });
    ReactGA.pageview(location.pathname + window.location.search);
  }, [location]);

  return <></>;
};

export default Analytics;
