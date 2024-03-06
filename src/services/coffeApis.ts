export const productLists = async () => {
  console.log('jkdsfjs');
  const url = `http://10.0.2.2:8000/product/coffee`;
  const response = await fetch(url, {method: 'GET'});
  const data = await response.json();

  return data;
};
