export const SaveRequestData = (config) => {
  let { query, success, error, method } = config;
  let options = {
    method: method || 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer 25ef5490-b1e8-48c4-a694-1927cd0f1615`},
    body: JSON.stringify({ query }),
  }
  
  fetch(process.env.REACT_APP_AUTH0_BASE_URL, options)
  .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
  .then(resp => success(resp))
  .catch(err => error(err));
}