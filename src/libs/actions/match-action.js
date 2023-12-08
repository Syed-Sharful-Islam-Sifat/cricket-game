import { server } from "@/config";
import axios from "axios";

const API = axios.create({baseURL:server})
export const matchCreate = (formData)=> API.post('/api/match',formData);
export const getMatchData = ({matchId})=>API.get(`/api/match/${matchId}`);
export const updateMatch = async (formData)=>API.put(`api/match/${formData.matchId}`,formData);
