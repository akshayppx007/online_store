import axios from "axios";
import socketIOClient from "socket.io-client";
import AnalyticsComponent from "./components/analyticsComponent";

const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
    const { data } = await axios.get("/api/admin/order/analytics/" + firstDateToCompare, {
    signal: abctrl.signal,
  });
  return data;
}

const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
  const { data } = await axios.get("/api/admin/order/analytics/" + secondDateToCompare, {
    signal: abctrl.signal,
  });
  return data;
};

function AdminAnalytics() {

  return (
    <AnalyticsComponent fetchOrdersForFirstDate={fetchOrdersForFirstDate} fetchOrdersForSecondDate={fetchOrdersForSecondDate} socketIOClient={socketIOClient} />
  );
}

export default AdminAnalytics;
 