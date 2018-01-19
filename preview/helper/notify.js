function Notify(options) {
  const{ title, body }  = options;
  return new Notification(title, {
    body,
  });
}

module.exports = { Notify };

