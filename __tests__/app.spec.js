const Application = require('spectron').Application;
const electronPath = require('electron');

describe('Application launch', function() {
  beforeEach(() => {
    this.app = new Application({
      path: '/Applications/Manta.app/Contents/MacOS/Manta',
    });
    return this.app.start();
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  describe('app start properly', () => {
    it('create 3 windows', async () =>
      this.app.client.getWindowCount().then(count => {
        expect(count).toEqual(3);
      }));

    it('should show only one windows, hide the other 2 windows');

    it('should display the correct title');

    it('should display the form page in mainWindow first');
  });

  describe('handle tour window properly', () => {

  });

  describe('handle transtion between mainWindow and previewWindow properly', () => {

  });

  // We're testing production app => DevTools won't show up

  // it('create mainWindow', async () =>
  //   this.app.client.getWindowCount().then(count => {
  //     expect(count).toEqual(3);
  //   }));


  // it('opens a window', function() {
  //   return app.client
  //     .waitUntilWindowLoaded()
  //     .getWindowCount()
  //     .should.eventually.equal(1);
  // });
  //
  // it('tests the title', function() {
  //   return app.client
  //     .waitUntilWindowLoaded()
  //     .getTitle()
  //     .should.eventually.equal('Hello World!');
  // });
});
