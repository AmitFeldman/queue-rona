import axios from 'axios';

const URL = 'https://corona-server.azurewebsites.net';

async function addSoldierToArrivalQueue(soldierId) {
  return await axios.post(`${URL}/addSoliderToArrivalQueue`, {soldierId});
}

async function addSoldier(soldierId, q1, q2, q3, q4) {
  return await axios.post(`${URL}/addSoldierToSoldierTable`, {
    soldierId,
    q1,
    q2,
    q3,
    q4,
  });
}

async function getTopSoldiers() {
  return await axios.get(`${URL}/getResultGetTopSoldiers`);
}

async function sendSoldierToStage(stageId) {
  return await axios.post(`${URL}/dedicateSoldierToStage`, {stageId});
}

async function getStages() {
  return await axios.get(`${URL}/GetStageDedicatedSoldiers`);
}

async function getCPRStages() {
  return await axios.get(`${URL}/GetCPRStages`);
}

async function getCPRSoldiers() {
  return await axios.get(`${URL}/GetAllCountdowns`);
}

async function updateSoldierVaccinated(soldierId) {
  return await axios.post(`${URL}/${soldierId}/wasVaccinated`);
}

async function updateSoldierVaccinable(soldierId) {
  return await axios.put(`${URL}/${soldierId}/vaccination_ability`, {
    isAbleToVaccinate: true,
  });
}

export {
  addSoldier,
  addSoldierToArrivalQueue,
  getCPRSoldiers,
  getStages,
  getTopSoldiers,
  sendSoldierToStage,
  updateSoldierVaccinable,
  updateSoldierVaccinated,
  getCPRStages,
};
