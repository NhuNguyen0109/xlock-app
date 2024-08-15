import { getDeviceId, storeDeviceId } from "./device-id";
import requestDeviceId from "./browserCall/request.device.id";

const checkDeviceId = async () => {
  if (getDeviceId() === "") {
    const { deviceID } = await requestDeviceId();
    storeDeviceId(deviceID);
  }
};

export default checkDeviceId;
