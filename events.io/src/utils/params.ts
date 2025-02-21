export const encodeQuery = (
  url: string,
  params: { [name: string]: string | number }
) => {
  let query = url + '?';
  for (const d in params) {
    if (params[d]) { // value
      query +=
        encodeURIComponent(d) + '=' + encodeURIComponent(params[d]) + '&';
    }
  }
  return query.slice(0, -1);
};
