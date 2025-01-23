const testhelper = require('./helper.js');
const app = testhelper.initializeSpectron();
const { expect } = require('chai');

describe('Application launch', () => {
  before(() => app.start());
  after(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  describe('start up', () => {
    let tourWindow, mainWindow, previewWindow;

    beforeEach(() =>
      app.client.windowHandles().then(handles => {
        tourWindow = handles.value[2]; // Tour
        mainWindow = handles.value[1]; // Manta
        previewWindow = handles.value[0]; // Previewer
      })
    );

    it('it should create 3 windows', () =>
      app.client
        .waitUntilWindowLoaded()
        .getWindowCount()
        .then(count => {
          expect(count).to.equal(3);
        }));

    // Tour Window
    describe('it should create tourWindow', () => {
      beforeEach(() => app.client.waitUntilWindowLoaded().window(tourWindow));

      it('with correct title', () =>
        app.client.browserWindow.getTitle().then(title => {
          expect(title).to.equal('Tour');
        }));

      it('with correct size and placed in the center of the primary screen', () => {
        let displayWidth, displayHeight;
        return app.client.electron.screen
          .getPrimaryDisplay()
          .then(res => {
            displayWidth = res.bounds.width;
            displayHeight = res.bounds.height;
          })
          .browserWindow.getBounds()
          .then(res => {
            // Check Size
            expect(res.width).to.equal(700);
            expect(res.height).to.equal(600);
            // Check Position
            const winX = (displayWidth - res.width) / 2;
            const winY = (displayHeight - res.height) / 2;
            expect(winX).to.equal(res.x);
            expect(winY).to.equal(res.y);
          });
      });

      it('with correct properties', () =>
        app.client.browserWindow
          .isMinimized()
          .then(isMinimized => {
            expect(isMinimized).to.be.false;
          })
          .browserWindow.isResizable()
          .then(isResizable => {
            expect(isResizable).to.be.false;
          })
          .browserWindow.isMovable()
          .then(isMovable => {
            expect(isMovable).to.be.false;
          })
          .browserWindow.isDevToolsOpened()
          .then(isDevToolsOpened => {
            expect(isDevToolsOpened).to.be.false;
          }));

      // TODO
      // Need to be able to retrive appConfig in order to test this
      it('with correct visibility and focus', () =>
        app.client.browserWindow
          .isVisible()
          .then(isVisible => {
            expect(isVisible).to.be.false;
          })
          .browserWindow.isFocused()
          .then(isFocused => {
            expect(isFocused).to.be.false;
          }));
    });

    // Main Window
    describe('it should create mainWindow', () => {
      beforeEach(() => app.client.waitUntilWindowLoaded().window(mainWindow));

      it('with correct title', () =>
        app.client.browserWindow.getTitle().then(title => {
          expect(title).to.equal('Manta');
        }));

      it('with correct properties', () =>
        app.client.browserWindow
          .isMinimized()
          .then(isMinimized => {
            expect(isMinimized).to.be.false;
          })
          .browserWindow.isResizable()
          .then(isResizable => {
            expect(isResizable).to.be.true;
          })
          .browserWindow.isMovable()
          .then(isMovable => {
            expect(isMovable).to.be.true;
          })
          .browserWindow.isDevToolsOpened()
          .then(isDevToolsOpened => {
            expect(isDevToolsOpened).to.be.false;
          }));

      // TODO
      // Need to be able to retrive appConfig in order to test this
      it('with correct visibility and focus', () =>
        app.client.browserWindow
          .isVisible()
          .then(isVisible => {
            expect(isVisible).to.be.true;
          })
          .browserWindow.isFocused()
          .then(isFocused => {
            expect(isFocused).to.be.true;
          }));
    });

    // Preview Window
    describe('it should create previewWindow', () => {
      beforeEach(() =>
        app.client.waitUntilWindowLoaded().window(previewWindow)
      );

      it('with correct title', () =>
        app.client.browserWindow.getTitle().then(title => {
          expect(title).to.equal('Previewer');
        }));

      it('with correct properties', () =>
        app.client.browserWindow
          .isMinimized()
          .then(isMinimized => {
            expect(isMinimized).to.be.false;
          })
          .browserWindow.isResizable()
          .then(isResizable => {
            expect(isResizable).to.be.true;
          })
          .browserWindow.isMovable()
          .then(isMovable => {
            expect(isMovable).to.be.true;
          })
          .browserWindow.isDevToolsOpened()
          .then(isDevToolsOpened => {
            expect(isDevToolsOpened).to.be.false;
          }));

      // TODO
      // Need to be able to retrive appConfig in order to test this
      it('with correct visibility and focus', () =>
        app.client.browserWindow
          .isVisible()
          .then(isVisible => {
            expect(isVisible).to.be.false;
          })
          .browserWindow.isFocused()
          .then(isFocused => {
            expect(isFocused).to.be.false;
          }));
    });
  });
});
