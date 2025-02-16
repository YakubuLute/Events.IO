// const updateBody = (boby) => {
//   // return new DOMParser().parseFromString(boby, 'text/html').documentElement.textContent;
//   return new DOMParser().parseFromString(boby, 'text/html').body.textContent;
// }

export const removeHtmlTags = (html: any, characters?: number) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  let textContent = tmp.textContent || tmp.innerText || '';

  if (characters !== undefined && textContent.length > characters) {
    textContent = textContent.slice(0, characters) + '...';
  }

  return textContent;
};
