import { GTMSPage } from './app.po';

describe('gtms App', function() {
  let page: GTMSPage;

  beforeEach(() => {
    page = new GTMSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
