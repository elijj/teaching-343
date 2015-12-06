// Code goes here
// global settings
window.biuOpts = {
  height: '50px',
  lineHeight: '50px',
  top: '-55px',
  closeButton: 'x'
}


var clipboard = new Clipboard('.btn');
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
