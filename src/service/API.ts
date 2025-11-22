import axios from "axios";


const API_URL =
  "https://opendata.jatimprov.go.id/api/cleaned-bigdata/api_bps_konsumsi_pendapatan/grs_kmsknn_mnrt_kbptnkt_d_jw_tmr";

export const getDataKemiskinan = async () => {
  const response = await axios.get(API_URL);
  return response.data.data; // langsung ambil array "data"
};