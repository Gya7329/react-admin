const defaultUrl = "https://charmed-mullet-68.hasura.app/api/rest/";
const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret":
    "10mjE9RPm0fJ5JD0qwG8RP90uzkQLO5Jel1TeeHTERC0LIqigqvl723C47kECAZa",
};

const customFetch = async (url, type = "GET", body) => {
  try {
    const options = {
      ...(body && { body: JSON.stringify(body) }),
      method: type,
      headers: headers,
    };
    const data = await fetch(`${defaultUrl}${url}`, options);
    const response = await data.json();
    return response;
  } catch (error){
    console.log(error);
  }
};

export default customFetch;
