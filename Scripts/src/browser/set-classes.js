/**
 * Adds CSS classes to the head of the document to signify that the browser
 * has JS enabled.
 */

export default function () {
  let $html = document.querySelector('html')
  $html.classList.remove('no-js')
  $html.classList.add('js')
}
