import * as expressUserAgent from 'express-useragent';



export const detectOperatingSystem = (userAgent: string): string => {
  const agent = expressUserAgent.parse(userAgent);

  if (agent.isWindows) {
    return 'Windows';
  } else if (agent.isMac) {
    return 'Mac';
  } else if (agent.isLinux) {
    return 'Linux';
  } else if (agent.isiPhone || agent.isiPad || agent.isiPod) {
    return 'iOS';
  } else if (agent.isAndroid) {
    return 'Android';
  } else {
    return 'Unknown';
  }
}



export const detectDeviceType = (userAgent: string): string => {
  const agent = expressUserAgent.parse(userAgent);

  if (agent.isMobile) {
    return 'Mobile';
  } else if (agent.isTablet) {
    return 'Tablet';
  } else if (agent.isDesktop) {
    return 'Desktop';
  } else {
    return 'Unknown';
  }
}





