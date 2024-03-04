export default token => JSON.parse(atob(token.split('.')[1])).id
