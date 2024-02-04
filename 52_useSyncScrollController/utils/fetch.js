import fetch, { CancelToken } from "axios";

const getBaseUrl = () => {
  let baseurl = `${window.location.protocol}//${window.location.host}`;
  if (baseurl.match(/^\//g)) {
    baseurl = `${window.location.protocol}//${window.location.host}${baseurl}`;
  }
  return baseurl;
};

const baseUrl = `${getBaseUrl()}/`;

const handleRequestError = (requestUrl, err) => {
  try {
    if (err && err.response) {
      if (err.response.data.code === 401) {
        // console.log("跳转到登陆页面")
      } else if (err.response.data.code === 500) {
        // console.log("跳转到服务器错误页面")
      }
      throw err;
    }
  } catch (err) {
    if (err.message === "Network Error") {
      // console.log("跳转到网络错误页面")
    }
  }
};

const commonRequest = async (
  method,
  path,
  arr // : { params?: any; data?: any; cancelToken?: CancelToken }
) => {
  const options = {
    method,
    url: `${baseUrl}${path}`,
    ...arr,
  };

  try {
    const response = await fetch(options);
    // check服务器返回
    return response.data.data;
  } catch (err) {
    handleRequestError(path, err);
  }
};

export function get(url, params = {}, cancelToken) {
  return commonRequest("get", url, { params, cancelToken });
}

export function post(url, data = {}, cancelToken) {
  return commonRequest("post", url, { data: { ...data }, cancelToken });
}

export function put(url, data = {}, cancelToken) {
  return commonRequest("put", url, { data: { ...data }, cancelToken });
}

export function del(url, data = {}, cancelToken) {
  return commonRequest("delete", url, { data: { ...data }, cancelToken });
}
