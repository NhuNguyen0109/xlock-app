interface UserAgentData {
  currentDate: string;
  browser: string;
  device: string;
}

const getBrowserInfo = (userAgent: string): string => {
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Safari";
  if (userAgent.includes("OPR") || userAgent.includes("Opera")) return "Opera";
  if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
    return "Internet Explorer";
  return "Unknown Browser";
};

const getDeviceInfo = (userAgent: string): string => {
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone")) return "iPhone";
  if (userAgent.includes("iPad")) return "iPad";
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Macintosh")) return "Mac";
  return "Unknown Device";
};

const initializeUserAgent = (): UserAgentData => {
  const userAgent = window.navigator.userAgent;
  const date = new Date();
  return {
    currentDate: date.toUTCString(),
    browser: getBrowserInfo(userAgent),
    device: getDeviceInfo(userAgent),
  };
};

const storeUserAgent = (): void => {
  if (!sessionStorage.getItem("userAgent")) {
    const userAgentData = initializeUserAgent();
    sessionStorage.setItem("userAgent", JSON.stringify(userAgentData));
  }
};

const getUserAgent = (): UserAgentData | null => {
  const userAgentDataString = sessionStorage.getItem("userAgent");
  if (userAgentDataString) {
    return JSON.parse(userAgentDataString);
  } else {
    storeUserAgent();
    return JSON.parse(sessionStorage.getItem("userAgent") as string);
  }
};

export default getUserAgent;
