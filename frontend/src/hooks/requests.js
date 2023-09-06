const API_URL = 'v1';

async function httpGetPlanets() {
  const response = await fetch(API_URL + '/planets');
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(API_URL + '/launches');
  const launches = await response.json()
  return launches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch(API_URL + '/launches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
    
    return await response.json();
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    const response = await fetch(API_URL + '/launches/' + id, {
      method: 'DELETE',
    });
    
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
