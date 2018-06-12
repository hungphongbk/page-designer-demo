export default function (url, id) {
  var x = new XMLHttpRequest();


  if (document.querySelector('#' + id)) {
    return;
  }


  var container = document.createElement('div');
  container.setAttribute('hidden', '');
  container.setAttribute('id', id);
  document.body.insertBefore(container, document.body.childNodes[0]);


  if ('withCredentials' in x) {
    x.open('GET', url, true);
  } else {
    return;
  }


  x.onload = function () {
    container.innerHTML = x.responseText;
  };

  x.send();
}
